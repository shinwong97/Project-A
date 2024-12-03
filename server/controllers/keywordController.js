import pool from "../config/database.js";
import { getEmbedding } from "../services/embeddingService.js";
import { pipeline, env } from "@xenova/transformers";

export const MODEL_CONFIG = {
    name: "Xenova/all-MiniLM-L6-v2",
    revision: "main",
    quantized: false,
}

export const PIPELINE_CONFIG = {
    feature_extraction: {
        pooling: "mean",
        normalize: true,
    },
}

let embedder

const init = async() => {
    try {
        const embed = await pipeline(
            "feature-extraction",
            MODEL_CONFIG.name, {
                revision: MODEL_CONFIG.revision,
                quantized: MODEL_CONFIG.quantized,
            }
        );
        embedder = embed
            // console.log(embed, "embed here");
    } catch (error) {
        console.warn(error, ':ERROR INIT')
    }
};

export async function addKeyword(req, res) {
    const { keyword } = req.body;
    console.log(keyword, 'keyword1')
    const newKeyword = keyword
    await init();
    try {
        // const embedding = await getEmbedding(keyword);
        // const embedding = keyword;
        let arrayTextEmbeded = []
        if (embedder && newKeyword) {
            const result = await embedder(
                newKeyword,
                PIPELINE_CONFIG.feature_extraction
            );
            console.log(Array.from(result.data), 'add keyword embeded text')
            arrayTextEmbeded = Array.from(result.data)
        }
        const embedding = [0.1, 0.2, 0.3];
        const result = await pool.query(
            "INSERT INTO keyword (keyword, embedding) VALUES ($1, $2) RETURNING *", [newKeyword, arrayTextEmbeded]
        );
        console.log(result?.rows[0], "result dwadwad");
        res.json(result?.rows[0]);
    } catch (error) {
        console.error("Error adding keyword:", error);
        res.status(500).json({ error: "Failed to add keyword" });
    }
}

export async function searchKeywords(req, res) {
    const { keyword } = req.query;
    let arrayFindTextEmbed = []
    await init();
    try {
        if (embedder) {
            const result = await embedder(
                keyword,
                PIPELINE_CONFIG.feature_extraction
            );
            arrayFindTextEmbed = [Array.from(result.data)]
        }
        console.log(keyword, "before embed");
        // console.log(arrayFindTextEmbed, "arrayFindTextEmbed");
        // const searchEmbedding = await getEmbedding(keyword);
        // console.log(searchEmbedding, "after embed");

        //     const result = await pool.query(
        //         `SELECT 
        //     id,
        //     keyword,
        //     category,
        //     created_at as "createdAt",
        //     1 - (embedding <=> $1) as "relevanceScore"
        //   FROM keywords
        //   WHERE 1 - (embedding <=> $1) > 0.7
        //   ORDER BY "relevanceScore" DESC
        //   LIMIT 10`, arrayFindTextEmbed
        //     );
        const similarityThreshold = 0.6;
        const limit = 2;
        // const result = await pool.query(`
        //     WITH search_embedding AS (
        //         SELECT unnest(ARRAY[${arrayFindTextEmbed}]) AS value
        //     )
        //     SELECT 
        //         id,
        //         keyword,
        //         (
        //             1.0 / (1.0 + sqrt(
        //                 ${arrayFindTextEmbed.map((_, i) => 
        //                     `power((embedding[${i+1}] - search_embedding.value), 2)`
        //                 ).join(' + ')}
        //             ))
        //         ) AS "relevanceScore"
        //     FROM keywords, search_embedding
        //     WHERE (
        //         1.0 / (1.0 + sqrt(
        //             ${arrayFindTextEmbed.map((_, i) => 
        //                 `power((embedding[${i+1}] - search_embedding.value), 2)`
        //             ).join(' + ')}
        //         )) > $1
        //     )
        //     ORDER BY "relevanceScore" DESC
        //     LIMIT $2
        // `, [similarityThreshold, limit]);
        const result = await pool.query(`
    WITH search_embedding AS (
        SELECT unnest(ARRAY[${arrayFindTextEmbed}]) AS value
    )
    SELECT 
        id,
        keyword,
        (
            1.0 / (1.0 + sqrt(
                ${arrayFindTextEmbed.map((_, i) => 
                    `power((embedding[${i+1}] - search_embedding.value), 2)`
                ).join(' + ')}
            ))
        ) AS "relevanceScore"
    FROM keywords, search_embedding
    WHERE (
        1.0 / (1.0 + sqrt(
            ${arrayFindTextEmbed.map((_, i) => 
                `power((embedding[${i+1}] - search_embedding.value), 2)`
            ).join(' + ')}
        )) > $1
    )
    ORDER BY "relevanceScore" DESC
    LIMIT $2
`, [similarityThreshold, limit]);
      
	console.log(result, 'result')


    //  result.rows;

      return res.json(result.rows);
    } catch (error) {
        console.error("Error searching keywords:", error);
        res.status(500).json({ error: "Failed to search keywords" });
    }
}