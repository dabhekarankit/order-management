require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const errorHandlerMiddleware = require("./middlewares/error-handler.middleware");
const app = express();

app.use(express.json());

app.use(routes);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.APP_URL}`);
});
