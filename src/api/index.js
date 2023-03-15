import axios from "axios";

const restApi = axios.create({ baseURL: "http://144.24.92.60:8080" });

export default restApi;
