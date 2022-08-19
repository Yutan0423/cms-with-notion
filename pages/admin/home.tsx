import { LogoutIcon } from '@heroicons/react/outline';
import { CogIcon } from '@heroicons/react/solid';
import { Button, Group } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import Layout from '../../components/Layout';
import { UserInfo } from '../../components/UserInfo';

const Home: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = async () => {
    queryClient.removeQueries(['user']);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push('/');
  };
  return (
    <Layout title="管理画面">
      <h3 className="mt-8">ユーザー情報</h3>
      <div className="my-6">
        <UserInfo />
      </div>
      <Group mt="xl" position="left" className="mb-8">
        <Button
          leftIcon={<CogIcon className="h-6 w-6 cursor-pointer text-white" />}
          color="blue"
          className="mr-8"
        >
          <Link href="/admin/setting">Notion APIの設定はこちら</Link>
        </Button>
        <Button
          leftIcon={
            <LogoutIcon className="h-6 w-6 cursor-pointer text-white" />
          }
          color="blue"
        >
          <Link href="/admin/setting">CMSに表示するユーザーを選択</Link>
        </Button>
      </Group>
      <Button
        leftIcon={<LogoutIcon className="h-6 w-6 cursor-pointer text-white" />}
        onClick={logout}
        color="purple"
      >
        ログアウト
      </Button>
    </Layout>
  );
};

export default Home;
