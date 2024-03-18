'use client';
import { useEffect, useState } from 'react';
import { authService } from '@services/index';
import { IAuth } from '@interfaces/auth.interface';
import { useAuthContext } from '@/contexts/user.context';

export default function useInitial() {
  const [loading, setLoading] = useState(true);
  const { setAuth } = useAuthContext();

  const getMe = async () => {
    setLoading(true);
    try {
      const response: IAuth = await authService.getMe();

      setAuth?.(response);
    } catch (error: any) {
      console.log('Error getting');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMe();
  }, []);

  return { loading };
}
