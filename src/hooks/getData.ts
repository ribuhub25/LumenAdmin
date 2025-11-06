import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

function getData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (!response.ok) {
        toast.warning(`${ result.message ?? result.error}`);
        throw new Error(`${ result.message ?? result.error}`);
      }
      setTotal(result.total);
      setData(result);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, total };
}

export default getData;
