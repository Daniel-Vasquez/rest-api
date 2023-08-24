import express, { json } from "express";
import { moviesRouter } from "./routes/moviesRoutes.js";
import cors from 'cors';
const app = express();
const PORT = process.env.PORT ?? 3000;

app.disable("x-powered-by");
app.use(json());
app.use(cors())

app.use('/movies', moviesRouter)

app.use((req, res) => {
  res.send("404");
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
