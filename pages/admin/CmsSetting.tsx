import { LogoutIcon } from '@heroicons/react/outline';
import {
  CogIcon,
  ExclamationCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import { Alert, Button, Group, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { IconSettings } from '@tabler/icons';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Select } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import * as Yup from 'yup';
import { CmsSettingForm } from '../../types/types';
import { useQueryUser } from '../../hooks/useQueryUser';
import { GetStaticProps } from 'next';
import { setDefaultResultOrder } from 'dns';
import { User } from '@prisma/client';
import { fetchUserInfo } from '../../utils/userInfo';

// export const getStaticProps: GetStaticProps = async () => {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/user/all`,
//   );
//   console.log(data);
//   return {
//     props: {
//       users: data ? data : [],
//     },
//     revalidate: 10,
//   };
// };

const CmsSetting: FC = () => {
  const router = useRouter();
  const [userOptions, setUserOptions] = useState<any>([{}]);
  const { data: user, status } = useQueryUser();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const schema = Yup.object().shape({
    // オプションなので、決めるか
    // nickName: Yup.string().required('ニックネームが入力されていません'),
    // notionKey: Yup.string().required('Notion Keyが入力されていません'),
    // notionDatabaseId: Yup.string().required(
    //   'Notion Database IDが入力されていません',
    // ),
  });
  const [userInfo, setUserInfo] = useState({});
  const form = useForm<CmsSettingForm>({
    validate: yupResolver(schema),
    initialValues: {
      userId: 1,
    },
  });

  const getUserInfo = async () => {
    return await fetchUserInfo();
  };

  const getUsers = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/all`,
    );
    data.forEach((user: any) => {
      setUserOptions((prev: any) => [
        ...prev,
        { value: user.id.toString(), label: user.nickname },
      ]);
    });
  };

  useEffect(() => {
    getUsers();
    setUserInfo(getUserInfo);
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/cms/update`, {
        userId: form.values.userId,
      });
      router.push('/admin/home');
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <Layout title="Auth" userInfo={userInfo}>
      <UserGroupIcon className="h-16 w-16 text-blue-500" />
      {error && (
        <Alert
          my="md"
          variant="filled"
          icon={<ExclamationCircleIcon />}
          title="認証エラー"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Your favorite framework/library"
          placeholder="Pick one"
          data={userOptions}
          {...form.getInputProps('userId')}
        />
        <Group className="mt-6">
          <Button
            leftIcon={<IconSettings />}
            color="blue"
            type="submit"
            className="mr-8"
          >
            設定
          </Button>
          <Button leftIcon={<IconSettings />} color="blue">
            <Link href="/admin/home">戻る</Link>
          </Button>
        </Group>
      </form>
    </Layout>
  );
};

export default CmsSetting;
