import initMongoDB from "./db/initMongoDB.js";
import { startServer } from "./server.js";

const bootstrap = () => {
  initMongoDB();
  startServer();
};

bootstrap();
