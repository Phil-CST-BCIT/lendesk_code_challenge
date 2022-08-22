import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./router.js";

const NODE_ENV = process.env.NODE_ENV || "development";
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (NODE_ENV === "development") {
  app.use(morgan("dev")); // configure morgan
}

app.use("/api", router);

app.listen(PORT, HOST, () => {
  console.log(`Running ${NODE_ENV} server on http://${HOST}:${PORT}`);
  console.debug("this is a dev server");
});
