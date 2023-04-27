import express from "express";
import "dotenv/config";
import rateLimit from "express-rate-limit";
import router from "./route";

const app = express();

app.use(express.json());
app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 1000,
      message: "Too many request, please try again later",
    })
);
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});