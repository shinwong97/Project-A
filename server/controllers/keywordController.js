import pool from '../config/database.js';
import { getEmbedding } from '../services/embeddingService.js';

export async function addKeyword(req, res) {
    const { keyword } = req.body;
    try {
        // const embedding = await getEmbedding(keyword);
        // const embedding = keyword;
        const embedding = [0.1, 0.2, 0.3]
        const result = await pool.query(
            'INSERT INTO keywords (keyword, embedding) VALUES ($1, $2) RETURNING *', [keyword, embedding]
        );
        console.log(result.rows[0], 'result dwadwad')
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding keyword:', error);
        res.status(500).json({ error: 'Failed to add keyword' });
    }
}

export async function searchKeywords(req, res) {
    const { keyword } = req.query;

    try {
        console.log(keyword, 'before embed')
        const searchEmbedding = await getEmbedding(keyword);

        console.log(searchEmbedding, 'after embed')

        const result = await pool.query(
            `SELECT 
        id,
        keyword,
        category,
        created_at as "createdAt",
        1 - (embedding <=> $1) as "relevanceScore"
      FROM keywords
      WHERE 1 - (embedding <=> $1) > 0.7
      ORDER BY "relevanceScore" DESC
      LIMIT 10`, [searchEmbedding]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error searching keywords:', error);
        res.status(500).json({ error: 'Failed to search keywords' });
    }
}