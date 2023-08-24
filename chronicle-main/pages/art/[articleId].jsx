import { ObjectId } from 'mongodb';
import { NextSeo } from 'next-seo';
import FullArticle from '../../components/news/full-article';
import connectToDatabase from '../../lib/mongodb';

export default function ArticleDetail(props) {
  const article = props.art;
  const articleLength = article.text.length;

  return (
    <>
      <NextSeo title={`${article.title} - The Waterford Chronicle`} />
      <FullArticle article={article} articleLength={articleLength} />
    </>
  );
}

export async function getStaticPaths() {
  const client = await connectToDatabase();
  const db = client.db();

  const articlesCollection = db.collection('articles');

  const articles = await articlesCollection.find({ section: 'art' }).toArray();

  client.close();

  return {
    paths: articles.map((article) => ({
      params: {
        articleId: article._id.toString(),
      },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const articleId = context.params.articleId;

  const client = await connectToDatabase();
  const db = client.db();
  const articlesCollection = db.collection('articles');

  const art = await articlesCollection.findOne({
    _id: ObjectId(articleId),
  });

  client.close();

  return {
    props: {
      art: {
        title: art.title,
        image: art.image,
        author: art.author,
        text: art.text,
      },
    },
  };
}
