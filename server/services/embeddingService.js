import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: "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"
});

// export async function getEmbedding(text) {
//     try {
//         const response = await openai.embeddings.create({
//             model: "text-embedding-ada-002",
//             input: text,
//         });
//         return response.data[0].embedding;
//     } catch (error) {
//         console.error('Error generating embedding:', error);
//         throw error;
//     }
// }

// export async function getEmbedding(text) {
//     const maxRetries = 5; // Maximum number of retry attempts
//     let attempts = 0; // Current attempt count

//     while (attempts < maxRetries) {
//         try {
//             const response = await openai.embeddings.create({
//                 model: "text-embedding-ada-002",
//                 input: text,
//             });
//             console.log(response, 'ai response')
//             return response.data[0].embedding; // Return the embedding on success
//         } catch (error) {
//             if (error.response && error.response.status === 429) {
//                 attempts++;
//                 const waitTime = Math.pow(2, attempts) * 1000; // Exponential backoff
//                 console.error(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
//                 await new Promise(resolve => setTimeout(resolve, waitTime));
//             } else {
//                 console.error('Error generating embedding:', error);
//                 throw error; // Re-throw if it's not a rate limit error
//             }
//         }
//     }
//     throw new Error("Exceeded maximum retries for generating embedding."); // Final error after retries
// }


const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2'; // Example model
const HUGGING_FACE_API_KEY = "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"; // Use your Hugging Face API key from .env

export async function getEmbedding(text) {
    const maxRetries = 5; // Maximum number of retry attempts
    let attempts = 0; // Current attempt count

    // while (attempts < maxRetries) {
    try {
        const response = await axios.post(HUGGING_FACE_API_URL, {
            inputs: text,
        }, {
            headers: {
                Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            },
        });

        console.log(response.data, 'Hugging Face response');
        return response.data[0].embedding; // Return the embedding on success
    } catch (error) {
        if (error.response && error.response.status === 429) {
            attempts++;
            const waitTime = Math.pow(2, attempts) * 1000; // Exponential backoff
            console.error(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
            console.error('Error generating embedding:', error);
            throw error; // Re-throw if it's not a rate limit error
        }
    }
    // }
    throw new Error("Exceeded maximum retries for generating embedding."); // Final error after retries
}