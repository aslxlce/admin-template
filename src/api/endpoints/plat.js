import { myAPIConfig } from "../axiosConfigs";

export async function getPlat() {
    try {
        const response = await myAPIConfig.get("/plats");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch Plat", error.message);
    }
}
export async function createPlat(plat) {
    try {
        const response = await myAPIConfig.post("/plats", plat);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create Plat", error.message);
    }
}
