import { Loader } from '@mantine/core';
import { useQueryUser } from '../hooks/useQueryUser';

export const UserSetting = () => {
  const { data: user, status } = useQueryUser();
  if (status === 'loading') return <Loader />;
  return (
    <div className="rounded bg-gray-100 px-6 py-4 text-sm text-gray-500">
      <div className="grid grid-cols-3 gap-4">
        {/* published */}
        <div className="col-span-1">ニックネーム</div>
        <div className="col-span-2">{user?.nickName}</div>

        {/* author */}
        <div className="col-span-1">メールアドレス</div>
        <div className="col-span-2">{user?.email}</div>

        {/* tags */}
        <div className="col-span-1">Notion Key</div>
        <div className="col-span-2">表示する</div>

        {/* tags */}
        <div className="col-span-1">Notion Database ID</div>
        <div className="col-span-2">表示する</div>
      </div>
    </div>
  );
};