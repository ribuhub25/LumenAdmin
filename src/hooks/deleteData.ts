import { toast } from "sonner";

export const deleteData = async (url: string) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("authToken");
      window.location.href = "/signin";
    }
    const result = await response.json();

    if (!response.ok) {     
      toast.warning(`${result.message ?? result.error}`);
      throw new Error(`${result.message}`);
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};
