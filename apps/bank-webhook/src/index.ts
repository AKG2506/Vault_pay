import express from "express";
import hdfcWebhookRouter from "./routes/hdfcWebhook"; // or correct path

const app = express();
app.use(express.json());

// Mount the webhook route
app.use("/hdfcWebhook", hdfcWebhookRouter);

app.listen(3003, () => {
  console.log("Server running on port 3003");
});
