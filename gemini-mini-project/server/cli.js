import axios from "axios";
import readline from "readline";

const API_KEY = "AIzaSyA58DzIGLJ7SE4NUHzyLFNa776Ind8aELM"; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askGemini(prompt) {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" + API_KEY,
      {
        model: "models/gemini-2.5-pro", // ✅ correct model
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("\n🤖 Gemini reply:\n" + reply + "\n");
  } catch (error) {
    console.error("❌ Error:", JSON.stringify(error.response?.data || error.message, null, 2));
  }
}

function promptUser() {
  rl.question("🧠 Enter your prompt (or type 'exit' to quit): ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("👋 Goodbye!");
      rl.close();
      return;
    }

    await askGemini(input);
    promptUser();
  });
}

console.log("🚀 Gemini CLI started. Ask anything below!\n");
promptUser();
