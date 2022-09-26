import express from "express";
const app = express();
import router from "../server/router/index.js";
import cors from "cors";
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/table", router);
const start = async () => {
  try {
    app.listen(3000, "0.0.0.0", () => {
      console.log("Сервер ожидает подключения...");
    });
  } catch (e) {
    console.error(e);
  }
};
await start();
