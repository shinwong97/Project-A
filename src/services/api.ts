import axios from "axios";

const api = axios.create({
	// baseURL: "/api",
	baseURL: "https://project-a-cyop.onrender.com",
});

export async function searchKeywords(keyword: string) {
	const response = await api.get("/search", {
		params: { keyword },
	});
	return response.data;
}

export async function addKeyword(keyword: string) {
	const response = await api.post("/keywords", { keyword });
	return response.data;
}
