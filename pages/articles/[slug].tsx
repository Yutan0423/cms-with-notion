import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { ArticleProps, Params } from '../../types/types';
import { fetchBlocksByPageId, fetchPages } from '../../utils/notion';
import { getText } from '../../utils/properties';
import ArticleMeta from '../../components/ArticleMeta';
import Layout from '../../components/Layout';
import NotionBlocks from 'notion-block-renderer';
import { fetchUserInfo } from '../../utils/userInfo';

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({});
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { results } = await fetchPages({ slug: slug });
  const userInfo = await fetchUserInfo();
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);

  return {
    props: {
      page: page,
      blocks: blocks,
      userInfo: userInfo,
    },
    revalidate: 10,
  };
};

const Article: NextPage<ArticleProps> = ({ page, blocks, userInfo }) => {
  return (
    <Layout title="" userInfo={userInfo}>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}
        <div className="my-12">
          <NotionBlocks blocks={blocks} isCodeHighlighter={true} />
        </div>
      </article>
    </Layout>
  );
};

export default Article;
