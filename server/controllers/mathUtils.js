export function calculateCosineSimilarity(
    embedding1,
    embedding2
) {
    if (embedding1.length !== embedding2.length) {
        throw new Error("Embeddings must have the same dimensions");
    }

    const dotProduct = embedding1.reduce(
        (sum, value, index) => sum + value * embedding2[index],
        0
    );
    const magnitude1 = Math.sqrt(
        embedding1.reduce((sum, value) => sum + value * value, 0)
    );
    const magnitude2 = Math.sqrt(
        embedding2.reduce((sum, value) => sum + value * value, 0)
    );

    if (magnitude1 === 0 || magnitude2 === 0) {
        throw new Error("Cannot calculate similarity for zero-magnitude vectors");
    }

    return dotProduct / (magnitude1 * magnitude2);
}