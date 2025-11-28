import express from "express";
import { serverConfig } from "./config";
import v1Router from "./routers/v1/index.router";
import v2Router from "./routers/v2/index.router";
import {
  appErrorHandler,
  genericErrorHandler,
} from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import sequelize from "./models/sequelize";
import initUserModel from "./models/user";
const app = express();

app.use(express.json());

/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);

// Initialize models and connect to DB before starting server
initUserModel(sequelize);
(async () => {
  try {
    await sequelize.authenticate();
    // Use sync({ alter: true }) only in development if needed
    await sequelize.sync();
    app.listen(serverConfig.PORT, () => {
      logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
      logger.info(`Press Ctrl+C to stop the server.`);
    });
  } catch (err) {
    logger.error("Unable to connect to the database", err as Error);
    process.exit(1);
  }
})();
