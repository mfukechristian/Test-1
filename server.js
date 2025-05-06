import http from "http";
import dotenv from "dotenv";
import connectDB from "./config.js";
import { submitFormData } from "./formController.js";

dotenv.config();
connectDB();

// Helper function to parse the request body
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        if (body) {
          req.body = JSON.parse(body);
        } else {
          req.body = {};
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
};

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle form submission endpoint
  if (req.url === "/api/form" && req.method === "POST") {
    try {
      // Parse the request body before passing to the controller
      await parseBody(req);

      // Now we can call the controller with the parsed body
      await submitFormData(req, res);
    } catch (error) {
      console.error("Error processing request:", error);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server error: " + error.message }));
      }
    }
  } else {
    // Handle 404 for any other routes
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
