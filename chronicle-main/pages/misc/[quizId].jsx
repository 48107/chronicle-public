import EditionNumsBtn from '../../components/misc/edition-nums';
import Card from '../../components/ui/card';
import connectToDatabase from '../../lib/mongodb';

export default function MiscPage(props) {
  return (
    <div>
      <Card isAmber={true}>
        <>
          <h1 className='text-xl'>Complete the quiz!</h1>
          <h3 className='pt-2 pb-1'>
            {"Which Edition's quiz would you like to complete?"}
          </h3>
          <div className='flex flex-row m-auto justify-center'>
            <EditionNumsBtn editions={props.editions} />
          </div>
          {/* <div>{props.quiz.questions.questions[0].question}</div> */}
          <div>
            {props.quiz.questions.map((question) => {
              return (
                <div key={question.answer}>
                <h1 className='text-left px-4 py-1 font-medium'>
                  {question.question}
                </h1>
                </div>
              );
            })}
          </div>
        </>
      </Card>
    </div>
  );
}

export async function getStaticProps(context) {
  const quizId = Number(context.params.quizId);
  const client = await connectToDatabase();
  const db = client.db();
  const chronicleCollection = db.collection('chronicle');
  const quizzesCollection = db.collection('quizzes');

  const editions = await chronicleCollection.find().toArray();
  // const quizArray = await quizzesCollection.find().toArray();
  const quiz = await quizzesCollection.findOne({ edition: quizId });

  client.close();

  return {
    props: {
      editions: editions.map((edition) => ({
        editionNumber: edition.editionNumber,
      })),
      // quiz: quiz.map(quiz => ({
      //   number: quiz.edition
      // }))
      quiz: quiz.questions,
    },
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase();
  const db = client.db();

  const quizzesCollection = db.collection('quizzes');

  const quizzes = await quizzesCollection.find().toArray();

  client.close();

  return {
    paths: quizzes.map((quiz) => ({
      params: {
        quizId: quiz.edition.toString(),
      },
    })),
    fallback: 'blocking',
  };
}
