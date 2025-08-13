// src/services/api.ts
export const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

export async function fetchHello() {
  const res = await fetch(`${API_BASE_URL}/`);
  if (!res.ok) throw new Error("Failed to fetch from backend");
  return res.json();
}
