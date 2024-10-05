import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import registerRouter from "./routes/registerRoute";
import userRouter from "./routes/userRoute";
import eventRouter from "./routes/eventRouter";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/events/registration", registerRouter);
app.use("/user", userRouter);
app.use("/events", eventRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "An error occurred." });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
