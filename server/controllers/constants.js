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