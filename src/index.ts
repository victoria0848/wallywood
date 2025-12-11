import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/userRoutes";
import postersRoutes from "./routes/posterRoutes";
import genresRoutes from "./routes/genresRoutes";
import genreRelRoutes from "./routes/genrePosterRelRoutes";
import cartlinesRoutes from "./routes/cartlinesRoutes";
import ratingsRoutes from "./routes/userRatingsRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/users", usersRoutes);
app.use("/api/posters", postersRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/poster-genres", genreRelRoutes);
app.use("/api/cartlines", cartlinesRoutes);
app.use("/api/ratings", ratingsRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});