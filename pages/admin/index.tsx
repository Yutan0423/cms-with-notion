import React, { FC, useEffect } from 'react';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { UserGroupIcon } from '@heroicons/react/solid';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { AuthForm } from '../../types/types';
import Layout from '../../components/Layout';
import {
  Alert,
  Anchor,
  Button,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { IconLogin } from '@tabler/icons';
import { useQueryUser } from '../../hooks/useQueryUser';
import { fetchUserInfo } from '../../utils/userInfo';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('無効なメールアドレスです')
    .required('メールアドレスが入力されていません'),
  password: Yup.string()
    .required('パスワードが入力されていません')
    .min(5, 'パスワードは5文字以上である必要があります'),
});

const Admin: FC = () => {
  const router = useRouter();
  // const { data: user, status } = useQueryUser();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });
  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: form.values.email,
          password: form.values.password,
        });
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: form.values.email,
        password: form.values.password,
      });
      form.reset();
      router.push('/admin/home');
    } catch (err: any) {
      // setError(err.response.data.message);
    }
  };
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async () => {
    return await fetchUserInfo();
  };

  useEffect(() => {
    setUserInfo(getUserInfo);
  }, []);

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
          id="email"
          label="Email*"
          placeholder="exaple@gmail.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          id="password"
          placeholder="password"
          label="Password*"
          description="5文字以上で入力してください"
          {...form.getInputProps('password')}
        />
        <Group mt="xl" position="apart">
          <Anchor
            component="button"
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister
              ? '既にアカウントをお持ちですか？ ログイン'
              : 'アカウントをお持ちでないですか？ 新規登録'}
          </Anchor>
          <Button leftIcon={<IconLogin />} color="blue" type="submit">
            {isRegister ? '新規登録' : 'ログイン'}
          </Button>
        </Group>
      </form>
    </Layout>
  );
};

export default Admin;
