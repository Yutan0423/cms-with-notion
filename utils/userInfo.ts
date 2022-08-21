import { makeConsoleLogger } from '@notionhq/client/build/src/logging';
import { CmsSetting, UserInfo } from '@prisma/client';
import axios from 'axios';

export const fetchUserInfo = async () => {
  // ブログに表示するユーザーのidを取得
  const resUser = await axios.get<Pick<CmsSetting, 'settingValue'>>(
    `${process.env.NEXT_PUBLIC_API_URL}/cms/user`,
  );
  const userId = Number(resUser.data.settingValue);
  // ブログに表示するユーザーのsnsDataを取得
  const resUserInfo = await axios.get<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/cms/info`,
    {
      data: {
        cmsUserId: userId,
      },
    },
  );
  return resUserInfo.data;
};
