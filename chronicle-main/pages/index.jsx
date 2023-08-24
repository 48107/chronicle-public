import Link from 'next/link';
import { MongoClient } from 'mongodb';
import Image from 'next/image';
import MobileNewsItem from '../components/news/mobile-news-item';
import NewsItems from '../components/news/news-items';
import { useSession, signIn, signOut } from 'next-auth/react';
import DesktopHomepage from '../components/homepage/desktop-homepage';
import { issueArticles, sportArticles } from '../lib/grabArticles';
import { NextSeo } from 'next-seo';

export default function HomePage(props) {
  const mainIssueArticle = props.currentEdition.issues[0];
  const subIssueArticle = props.currentEdition.issues[1];
  const subIssueArticle1 = props.currentEdition.issues[2];

  const mainSportArticle = props.currentEdition.sport[0];
  const subSportArticle = props.currentEdition.sport[1];
  const subSportArticle1 = props.currentEdition.sport[2];

  const mainArtArticle = props.currentEdition.art.mainArticle;
  const subArtArticle = props.currentEdition.art.subArticle;
  const subArtArticle1 = props.currentEdition.art.subArticle1;

  const mainCommunityArticle = props.currentEdition.community.mainArticle;
  const subCommunityArticle = props.currentEdition.community.subArticle;

  return (
    <>
      <NextSeo
        title='The Waterford Chronicle'
        description='Your favourite student newspaper, now avaible online!'
        canonical='https://waterfordchronicle.com'
      />
      <div>
        <h1 className='text-3xl text-center pt-4'>
          Edition #{props.currentEdition.number}
        </h1>
        <MobileNewsItem article={mainIssueArticle} mainArticle={true} />
        <MobileNewsItem article={subIssueArticle} mainArticle={false} />
        <MobileNewsItem article={subIssueArticle1} mainArticle={false} />

        <MobileNewsItem article={mainArtArticle} mainArticle={true} />
        <MobileNewsItem article={subArtArticle} mainArticle={false} />
        <MobileNewsItem article={subArtArticle1} mainArticle={false} />

        <MobileNewsItem article={mainSportArticle} mainArticle={true} />
        <MobileNewsItem article={subSportArticle} mainArticle={false} />
        <MobileNewsItem article={subSportArticle1} mainArticle={false} />

        <MobileNewsItem article={mainCommunityArticle} mainArticle={true} />
        <MobileNewsItem article={subCommunityArticle} mainArticle={false} />

        {/* Desktop Sections */}
        <DesktopHomepage currentEdition={props.currentEdition} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://tnoonan:mqSizDooyRS6rZwv@cluster0.h7mon.mongodb.net/chronicle?retryWrites=true&w=majority'
  );
  const db = client.db();
  const chronicleCollection = db.collection('chronicle');
  const articlesCollection = db.collection('articles');

  const editions = await chronicleCollection.find().toArray();
  const currentEdition = editions.find((edition) => edition.isCurrent);

  const issueArticlesArray = await issueArticles();

  const sportArticlesArray = await sportArticles();

  const artArticle = await articlesCollection.findOne({
    _id: currentEdition.art.mainArticle._id,
  });
  const subArtArticle = await articlesCollection.findOne({
    _id: currentEdition.art.article,
  });
  const subArtArticle1 = await articlesCollection.findOne({
    _id: currentEdition.art.article1,
  });

  const communityArticle = await articlesCollection.findOne({
    _id: currentEdition.community.mainArticle._id,
  });
  const subCommunityArticle = await articlesCollection.findOne({
    _id: currentEdition.community.article,
  });

  client.close();

  // const issueArticle = currentEdition.issues.mainArticle;

  return {
    props: {
      editions: editions.map((edition) => ({
        number: edition.editionNumber,
        isCurrent: edition.isCurrent,
        id: edition._id.toString(),
      })),
      currentEdition: {
        number: currentEdition.editionNumber,
        isCurrent: currentEdition.isCurrent,
        id: currentEdition._id.toString(),
        issues: issueArticlesArray.map((article) => ({
          title: article.title,
          image: article.image,
          text: article.text.substring(0, 260),
          author: article.author,
          id: article._id.toString(),
          section: article.section,
        })),
        sport: sportArticlesArray.map((article) => ({
          title: article.title,
          image: article.image,
          text: article.text.substring(0, 260),
          author: article.author,
          id: article._id.toString(),
          section: article.section,
        })),
        art: {
          mainArticle: {
            title: artArticle.title,
            image: artArticle.image,
            text: artArticle.text.substring(0, 260),
            author: artArticle.author,
            id: artArticle._id.toString(),
            section: artArticle.section,
          },
          subArticle: {
            title: subArtArticle.title,
            image: subArtArticle.image,
            text: subArtArticle.text.substring(0, 260),
            author: subArtArticle.author,
            id: subArtArticle._id.toString(),
            section: subArtArticle.section,
          },
          subArticle1: {
            title: subArtArticle1.title,
            image: subArtArticle1.image,
            text: subArtArticle1.text.substring(0, 260),
            author: subArtArticle1.author,
            id: subArtArticle1._id.toString(),
            section: subArtArticle1.section,
          },
        },
        community: {
          mainArticle: {
            title: communityArticle.title,
            image: communityArticle.image,
            text: communityArticle.text.substring(0, 260),
            author: communityArticle.author,
            id: communityArticle._id.toString(),
            section: communityArticle.section,
          },
          subArticle: {
            title: subCommunityArticle.title,
            image: subCommunityArticle.image,
            text: subCommunityArticle.text.substring(0, 260),
            author: subCommunityArticle.author,
            id: subCommunityArticle._id.toString(),
            section: subCommunityArticle.section,
          },
        },
      },
    },
    revalidate: 10,
  };
}
