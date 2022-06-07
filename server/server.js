import express from "express";
import cors from "cors";
import {init} from "./app/routes/index.js";
import bodyParser from "body-parser";

const app = express();


app.use(cors());
app.use(express.json())

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

init(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
