import http from "http";
import dotenv from "dotenv";
import connectDB from "./config.js";
import { submitFormData } from "./formController.js";

dotenv.config();
connectDB();

const server = http.createServer((req, res) => {
  if (req.url === "/api/form" && req.method == "POST") {
    submitFormData(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Route Not Found",
      })
    );
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
