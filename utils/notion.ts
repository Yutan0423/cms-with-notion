import { Client } from '@notionhq/client';
import { CmsSetting, UserInfo } from '@prisma/client';
import axios from 'axios';

export const fetchPages = async ({
  slug,
  tag,
}: {
  slug?: string;
  tag?: string;
}) => {
  // ブログに表示するユーザーのidを取得
  const resUser = await axios.get<Pick<CmsSetting, 'settingValue'>>(
    `${process.env.NEXT_PUBLIC_API_URL}/cms/user`,
  );
  const userId = Number(resUser.data.settingValue);
  // ブログに表示するユーザーのnoitonDataを取得
  const resInfo = await axios.get<
    Pick<UserInfo, 'notionKey' | 'notionDatabaseId'>
  >(`${process.env.NEXT_PUBLIC_API_URL}/cms/info`, {
    data: {
      cmsUserId: userId,
    },
  });
  const notionKey = resInfo.data.notionKey as string;
  const notionDatabaseId = resInfo.data.notionDatabaseId as string;
  const notion = new Client({ auth: notionKey });
  console.log(notion);
  const and: any = [
    {
      property: 'isPublic',
      checkbox: {
        equals: true,
      },
    },
    {
      property: 'slug',
      rich_text: {
        is_not_empty: true,
      },
    },
  ];
  if (slug) {
    and.push({
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    });
  }
  if (tag) {
    and.push({
      property: 'tags',
      multi_select: {
        contains: tag,
      },
    });
  }

  return await notion.databases.query({
    database_id: notionDatabaseId,
    filter: {
      and: and,
    },
    sorts: [
      {
        property: 'published',
        direction: 'descending',
      },
    ],
  });
};

export const fetchBlocksByPageId = async (pageId: string) => {
  // ブログに表示するユーザーのidを取得
  const resUser = await axios.get<Pick<CmsSetting, 'settingValue'>>(
    `${process.env.NEXT_PUBLIC_API_URL}/cms/user`,
  );
  const userId = Number(resUser.data.settingValue);
  // ブログに表示するユーザーのnoitonDataを取得
  const { data } = await axios.get<UserInfo>(
    `${process.env.NEXT_PUBLIC_API_URL}/cms/info`,
    {
      data: {
        cmsUserId: userId,
      },
    },
  );
  const notionKey = data.notionKey as string;
  const notion = new Client({ auth: notionKey });

  return await notion.blocks.children.list({ block_id: pageId });
};
