import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import keywordRoutes from "./routes/keywordRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", keywordRoutes);

app.listen(10000, () => {
    console.log(`Server running on port ${10000}`);
});