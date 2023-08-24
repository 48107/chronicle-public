// @ts-check

import connectToDatabase from '../../lib/mongodb';
import { NextSeo } from 'next-seo';
import NewsSection from '../../components/news/news-section';

export default function IssuesPage(props) {
  return <>
  <NextSeo title='Art - The Waterford Chronicle' />
  <NewsSection articles={props.articles} />
  </>
}

export async function getStaticProps() {
  const client = await connectToDatabase();
  const db = client.db();

  const articlesCollection = db.collection('articles');

  const articles = await articlesCollection
    .find({ section: 'art' })
    .toArray();

  client.close();
  return {
    props: {
      articles: articles.map((article) => ({
        id: article._id.toString(),
        title: article.title,
        image: article.image,
        author: article.author,
        text: article.text,
        section: article.section,
        edition: article.editionRef,
      })),
    },
    revalidate: 10,
  };
}