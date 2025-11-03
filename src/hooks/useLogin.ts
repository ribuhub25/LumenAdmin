import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface IFormInput {
  email: string;
  password: string;
}

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  // agrega más campos según tu token
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<DecodedToken | null>(null);

  const login = async (url: string, data: IFormInput) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      const token = result.access_token;

      if (token) {
        localStorage.setItem('authToken', token);

        const decoded: DecodedToken = jwtDecode(token);
        localStorage.setItem('userData', JSON.stringify(decoded));
        setUserData(decoded);

        return { token, userData: decoded };
      }

      return null;
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, userData };
}