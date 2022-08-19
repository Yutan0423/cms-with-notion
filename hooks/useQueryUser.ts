import React from 'react';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';

export const useQueryUser = () => {
  const router = useRouter();
  const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'password'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
    );
    return data;
  };
  // return useQuery<Omit<User, 'password'>, Error>({
  return useQuery<any, Error>({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (err: any) => {
      if (err.response.status === 401 || err.status === 403) {
        router.push('/');
      }
    },
  });
};
