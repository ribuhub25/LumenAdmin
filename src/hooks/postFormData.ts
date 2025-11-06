import { toast } from "sonner";

export const postFormData = async (url: string, data: FormData ) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: data,
    });

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("authToken");
      window.location.href = "/signin";
    }
    const result = await response.json();

    if (!response.ok) {
        toast.warning(`${ result.message ?? result.error}`);
        throw new Error(`${ result.message ?? result.error}`);
      }
    return result;
  } catch (error) {
    console.log(error);
  }
};
