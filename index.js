import express from "express";
import cors from "cors";

import sequelize from "./db.js";
import calculatorRouter from "./routes/calculator.js";
import historyRouter from "./routes/history.js";

// import History from "./models/history.js";

const app = express(); //call  Express like a function and name it "app"
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json()); //“Hey, whenever someone sends data in JSON format,
app.use("/", calculatorRouter);
app.use("/", historyRouter);

app.get("/", (req, res) => {
  //For Get requests to the home URL /, do the following
  //req: info from client (URL, headers, body, etc)
  // res: response sent back (text, HTML, JSON, staus code)
  res.send("Hello World!");
});

// please read and understand it automatically.”
// .use is the middleware first this request will be executed then the follwoing code will be executed
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL");
    await sequelize.sync();
    console.log("Database synced");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
}

startServer();
