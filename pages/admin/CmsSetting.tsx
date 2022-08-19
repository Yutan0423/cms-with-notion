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
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import * as Yup from 'yup';
import { SettingForm } from '../../types/types';
import { useQueryUser } from '../../hooks/useQueryUser';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/`);
  console.log(data);
  return {
    props: {
      users: data ? data : [],
    },
    revalidate: 10,
  };
};

const CmsSetting: FC = () => {
  const router = useRouter();
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
  const form = useForm<SettingForm>({
    validate: yupResolver(schema),
    initialValues: {
      nickName: user.userInfo ? user.userInfo.nickName : '',
      notionKey: user.userInfo ? user.userInfo.notionKey : '',
      notionDatabaseId: user.userInfo ? user.userInfo.notionDatabaseId : '',
    },
  });

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
          nickName: form.values.nickName,
          notionKey: form.values.notionKey,
          notionDatabaseId: form.values.notionDatabaseId,
        });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
          nickName: form.values.nickName,
          notionKey: form.values.notionKey,
          notionDatabaseId: form.values.notionDatabaseId,
        });
      }
      router.push('/admin/home');
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <Layout title="Auth">
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
        <TextInput
          mt="md"
          id="nickName"
          label="ニックネーム"
          placeholder="山田 太郎"
          {...form.getInputProps('nickName')}
        />
        <TextInput
          mt="md"
          id="notionKey"
          label="Notion Key"
          placeholder="Notion Key"
          {...form.getInputProps('notionKey')}
        />
        <TextInput
          mt="md"
          id="notionDatabaseId"
          label="Notion Database ID"
          placeholder="Notion Database ID"
          {...form.getInputProps('notionDatabaseId')}
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
