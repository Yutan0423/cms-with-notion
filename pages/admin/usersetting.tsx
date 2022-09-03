import { LogoutIcon } from '@heroicons/react/outline';
import { ExclamationCircleIcon, UserGroupIcon } from '@heroicons/react/solid';
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
import { UserSettingForm } from '../../types/types';
import { useQueryUser } from '../../hooks/useQueryUser';
import { fetchUserInfo } from '../../utils/userInfo';

const UserSetting: FC = () => {
  const router = useRouter();
  const { data: user, status } = useQueryUser();
  const [error, setError] = useState('');
  const schema = Yup.object().shape({
    nickname: Yup.string().required('ニックネームが入力されていません'),
    notionKey: Yup.string().required('Notion Keyが入力されていません'),
    notionDatabaseId: Yup.string().required(
      'Notion Database IDが入力されていません',
    ),
  });
  const form = useForm<UserSettingForm>({
    validate: yupResolver(schema),
    initialValues: {
      nickname: user ? user.nickname : '',
      notionKey: user?.userInfo ? user.userInfo.notionKey : '',
      notionDatabaseId: user?.userInfo ? user.userInfo.notionDatabaseId : '',
      twitterUrl: user?.userInfo ? user.userInfo.twitterUrl : '',
      instagramUrl: user?.userInfo ? user.userInfo.instagramUrl : '',
      githubUrl: user?.userInfo ? user.userInfo.githubUrl : '',
      linkedinUrl: user?.userInfo ? user.userInfo.linkedinUrl : '',
    },
  });
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async () => {
    return await fetchUserInfo();
  };

  useEffect(() => {
    setUserInfo(getUserInfo);
  }, []);

  const handleSubmit = async () => {
    try {
      if (user.nickname) {
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
          nickname: form.values.nickname,
          notionKey: form.values.notionKey,
          notionDatabaseId: form.values.notionDatabaseId,
          twitterUrl: form.values.twitterUrl,
          instagramUrl: form.values.instagramUrl,
          githubUrl: form.values.githubUrl,
          linkedinUrl: form.values.linkedinUrl,
        });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
          nickname: form.values.nickname,
          notionKey: form.values.notionKey,
          notionDatabaseId: form.values.notionDatabaseId,
          twitterUrl: form.values.twitterUrl,
          instagramUrl: form.values.instagramUrl,
          githubUrl: form.values.githubUrl,
          linkedinUrl: form.values.linkedinUrl,
        });
      }
      router.push('/admin/home');
    } catch (err: any) {
      // setError(err.response.data.message);
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
        <TextInput
          mt="md"
          id="nickname"
          label="ニックネーム"
          placeholder="山田 太郎"
          {...form.getInputProps('nickname')}
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
        <TextInput
          mt="md"
          id="twitterUrl"
          label="Twitter URL"
          placeholder="URLをここにペースト"
          {...form.getInputProps('twitterUrl')}
        />
        <TextInput
          mt="md"
          id="instagramUrl"
          label="instagramUrl URL"
          placeholder="URLをここにペースト"
          {...form.getInputProps('instagramUrl')}
        />
        <TextInput
          mt="md"
          id="githubUrl"
          label="Github URL"
          placeholder="URLをここにペースト"
          {...form.getInputProps('githubUrl')}
        />
        <TextInput
          mt="md"
          id="linkedinUrl"
          label="LinkedinUrl URL"
          placeholder="URLをここにペースト"
          {...form.getInputProps('linkedinUrl')}
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

export default UserSetting;
