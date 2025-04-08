// src/apiService.ts
const BACKEND_URL = "http://localhost:5001"; // Replace with Render URL later

export const generatePrompt = async (query: string, userId: string) => {
  const res = await fetch(`${BACKEND_URL}/api/generate-prompt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, userId, config: {} })
  });

  if (!res.ok) {
    throw new Error("Failed to get Oracle response");
  }

  const data = await res.json();
  return data.prompt;
};
