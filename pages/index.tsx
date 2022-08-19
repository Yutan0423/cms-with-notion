import type { GetStaticProps, NextPage } from 'next';
import { siteConfig } from '../site.config';
import { IndexProps } from '../types/types';
import { fetchPages } from '../utils/notion';
import Card from '../components/Card';
import Layout from '../components/Layout';

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchPages({});
  return {
    props: {
      pages: results ? results : [],
    },
    revalidate: 10,
  };
};

const Home: NextPage<IndexProps> = ({ pages }) => {
  return (
    <Layout title="">
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
