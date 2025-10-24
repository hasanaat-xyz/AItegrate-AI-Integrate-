import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = "AIzaSyA58DzIGLJ7SE4NUHzyLFNa776Ind8aELM"; 
app.post("/ask", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) return res.status(500).json({ error: "No reply from Gemini API" });
    res.json({ reply });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
