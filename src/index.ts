import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware for JSON
app.use(express.json());

// Example route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
