import connectToDatabase from './mongodb';

export async function issueArticles() {
  const client = await connectToDatabase();
  const db = client.db();
  const chronicleCollection = db.collection('chronicle');
  const articlesCollection = db.collection('articles');

  const editions = await chronicleCollection.find().toArray();
  const currentEdition = editions.find((edition) => edition.isCurrent);

  const issueArticle = await articlesCollection.findOne({
    _id: currentEdition.issues.mainArticle._id,
  });
  const subIssueArticle = await articlesCollection.findOne({
    _id: currentEdition.issues.article,
  });
  const subIssueArticle1 = await articlesCollection.findOne({
    _id: currentEdition.issues.article1,
  });

  const articles = [issueArticle, subIssueArticle, subIssueArticle1];
  client.close();

  return articles;
}

export async function sportArticles() {
  const client = await connectToDatabase();
  const db = client.db();
  const chronicleCollection = db.collection('chronicle');
  const articlesCollection = db.collection('articles');

  const editions = await chronicleCollection.find().toArray();
  const currentEdition = editions.find((edition) => edition.isCurrent);

  const article = await articlesCollection.findOne({
    _id: currentEdition.sport.mainArticle,
  });
  const subArticle = await articlesCollection.findOne({
    _id: currentEdition.sport.article,
  });
  const subArticle1 = await articlesCollection.findOne({
    _id: currentEdition.sport.article1,
  });

  const articles = [article, subArticle, subArticle1];
  client.close();

  return articles;
}
