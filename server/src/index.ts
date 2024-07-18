// src/index.js
import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import router from "./routes/authRoute";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(router)

app.get('/', (req, res) => {
  res.send('Bomboclat Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});