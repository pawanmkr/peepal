import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTopSearches(): Promise<string[]> {
  try {
    const res = await axios.get(`${API_URL}/recent-searches`);
    return res.data.keywords;
  } catch (error) {
    console.error(error);
    return [];
  }
}
