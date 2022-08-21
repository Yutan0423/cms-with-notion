import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Params, TagProps } from '../../types/types';
import { fetchPages } from '../../utils/notion';
import { getMultiSelect } from '../../utils/properties';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import { fetchUserInfo } from '../../utils/userInfo';

export const getStaticPaths: GetStaticPaths = async () => {
  const { results }: { results: Record<string, any>[] } = await fetchPages({});

  const pathSet: Set<string> = new Set();
  for (const page of results) {
    for (const tag of getMultiSelect(page.properties.tags.multi_select)) {
      pathSet.add(tag);
    }
  }

  const paths = Array.from(pathSet).map((tag) => {
    return {
      params: {
        tag: tag,
      },
    };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { tag } = ctx.params as Params;
  const { results } = await fetchPages({ tag: tag });
  const userInfo = await fetchUserInfo();
  return {
    props: {
      pages: results ? results : [],
      tag: tag,
      userInfo: userInfo ? userInfo : {},
    },
    revalidate: 10,
  };
};

const Tag: NextPage<TagProps> = ({ pages, tag, userInfo }) => {
  return (
    <Layout title="" userInfo={userInfo}>
      <div className="pt-12">
        <h1 className="mb-8 text-5xl">{`${tag}`}</h1>
        <div className="my-12 mt-10 grid w-full md:grid-cols-2 md:gap-6">
          {/* Card */}
          {pages.map((page, key) => (
            <Card key={key} page={page} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tag;
