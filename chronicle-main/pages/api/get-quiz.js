import connectToDatabase from "../../lib/mongodb";

export default async function GetArticles(req, res) {
    const data = req.body;

    // const editionNum = data.parse();
    // console.log(data);

    const client = await connectToDatabase();
    const db = client.db();
  
    const quizzesCollection = db.collection('quizzes');

    const quiz = await quizzesCollection.find({ edition: data }).toArray();

    client.close();

    res.status(200).json({
        quiz: quiz,
        message: 'success'
    })
}