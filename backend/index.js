import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import routers from './src/routers/index.js';
import db from './src/configs/db.config.js';

const app = express();
const { APP_PORT } = process.env;

app.use(cors());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use("/uploads", express.static("uploads"));   // ⬅️ important for images
app.use(express.static("public"));

app.use(routers);

// PostgreSQL connection only
db.connect().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`Server running on port ${APP_PORT}`);
  });
});

export default app;
