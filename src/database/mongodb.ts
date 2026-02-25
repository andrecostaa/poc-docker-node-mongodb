import mongoose from "mongoose";
import { DefaultError } from "../shared/exceptions";
import { StatusHttpEnum } from "../shared/enums";
import CONSTANTS from "../shared/constants";
import { logger } from "../shared/logger";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(CONSTANTS.MONGO_URI);
    logger.info("MongoDB connection established");
  } catch (error) {
    logger.error({ err: error }, "MongoDB connection failed");
    throw new DefaultError(
      "Falha na conexão",
      StatusHttpEnum.INTERNAL_SERVER_ERROR,
    );
  }
};
