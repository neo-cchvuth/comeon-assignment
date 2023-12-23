'use client';

import { setUsername } from '@/redux/features/auth';
import { useAppDispatch } from '@/redux/hooks';
import { getCookie } from '@/redux/utils/cookie';
import { useEffect } from 'react';

export default function Init() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = getCookie('username');
    if (username) {
      dispatch(setUsername(username));
    }
  }, [dispatch]);

  return null;
}
