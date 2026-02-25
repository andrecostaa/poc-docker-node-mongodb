import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import usersRouter from "./routes/users";
import { errorHandler } from "./middlewares/error-handler";
import { connectToMongoDB } from "./database/mongodb";
import CONSTANTS from "./shared/constants";
import { logger } from "./shared/logger";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
  const success = req.query.success === "true";
  res.render("index", { title: "Website com Pug", success });
});

app.use(errorHandler);

app.listen(CONSTANTS.PORT, async () => {
  await connectToMongoDB();
  logger.info({ port: CONSTANTS.PORT }, "Server running");
});
