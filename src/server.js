import express from "express";
import "dotenv/config";
import viewConfig from "./config/viewConfig.js";
import connectDB from "./config/connect.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import movieRoutes from "./routes/movieRoute.js";
import cinemaRouter from "./routes/cinemaRoute.js";
import screenRouter from "./routes/screenRoute.js";
import seatRouter from "./routes/seatRoute.js";
import showRouter from "./routes/showRoute.js";
import ticketRouter from "./routes/ticketRoute.js";

const app = express();
const port = process.env.PORT || 3030;

viewConfig(app);
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/cinemas", cinemaRouter);
app.use("/api/screens", screenRouter);
app.use("/api/seats", seatRouter);
app.use("/api/shows", showRouter);
app.use("/api/tickets", ticketRouter);

app.listen(port, () => {
  console.log("Server is launching at " + port + "!");
});
