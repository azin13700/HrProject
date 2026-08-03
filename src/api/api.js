import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7124/api", 
});

export default api;