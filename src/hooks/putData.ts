import { toast } from "sonner";
import { ProductResponse } from "../models/ProductResponse";

export const putData = async (url: string, data: ProductResponse) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("authToken");
      window.location.href = "/signin";
    }
    const result = await response.json();

    if (!response.ok) {
      toast.warning(`${result.message ?? result.error}`);
      throw new Error(`${result.message ?? result.error}`);
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};
