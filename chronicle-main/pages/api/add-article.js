import { MongoClient, ObjectId } from 'mongodb';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const token = await getToken({ req, secret });

  if (token.isAdmin) {
    const data = req.body;
    // const object = data.parse();
    
    // const section = object.section;

    const client = await MongoClient.connect(
      'mongodb+srv://tnoonan:mqSizDooyRS6rZwv@cluster0.h7mon.mongodb.net/chronicle?retryWrites=true&w=majority'
    );
    const db = client.db();

    const articlesCollection = db.collection('articles');
    // const chronicleCollection = db.collection('chronicle');

    const result = await articlesCollection.insertOne(data);
    // const currentEdition = await chronicleCollection.findOne({ isCurrent: true });
    

    console.log(result);

    client.close();

    res.status(201).json({
      message: `Article added! ${token} haha no ${token.userRole}`,
      success: true,
    });
  } else {
    res.status('403');
  }
}
