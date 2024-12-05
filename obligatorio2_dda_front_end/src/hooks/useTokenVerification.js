// src/hooks/useTokenVerification.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {jwtDecode} from 'jwt-decode';  // Importar jwt-decode correctamente

const useTokenVerification = () => {
    const router = useRouter();

    useEffect(() => {
      const verifyToken = async () => {
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        if (!token || !storedRole) {
          router.push('/');
          return;
        }
  
        try {
          const decoded = jwtDecode(token);
          const role = decoded.role;
          const currentTime = Date.now() / 1000;
  
          if (decoded.exp < currentTime || role != storedRole) {  
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            router.push('/');
          }
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          router.push('/');
        }
      };
  
      verifyToken();
      const interval = setInterval(verifyToken, 5000); // Verificar cada 5 segundos
  
      return () => clearInterval(interval);
    }, [router]);
  };
  
  export default useTokenVerification;