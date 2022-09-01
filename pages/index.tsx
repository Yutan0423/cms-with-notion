import type { GetStaticProps, NextPage } from 'next';
import { siteConfig } from '../site.config';
import { IndexProps } from '../types/types';
import { fetchPages } from '../utils/notion';
import Card from '../components/Card';
import Layout from '../components/Layout';
import { fetchUserInfo } from '../utils/userInfo';

export const getStaticProps: GetStaticProps = async () => {
  const { results }: any = await fetchPages({});
  const userInfo = await fetchUserInfo();
  return {
    props: {
      pages: results ? results : [],
      userInfo: userInfo ? userInfo : {},
    },
    revalidate: 10,
  };
};

const Home: NextPage<IndexProps> = ({ pages, userInfo }) => {
  return (
    <Layout title="" userInfo={userInfo}>
      <div className="pt-12">
        <h1 className="mb-8 text-5xl">{siteConfig.title}</h1>
        <div className="my-12 mt-10 grid w-full md:grid-cols-3 md:gap-6">
          {/* Card */}
          {pages.map((page, key) => (
            <Card key={key} page={page} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
