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
              <EditionNumsBtn editions={props.editions}/>
          </div>
        </>
      </Card>
    </div>
  );
}

export async function getStaticProps() {
  const client = await connectToDatabase();
  const db = client.db();
  const chronicleCollection = db.collection('chronicle');
  const editions = await chronicleCollection.find().toArray();

  client.close()

  return {
    props: {
      editions: editions.map((edition) => ({
        editionNumber: edition.editionNumber,
      })),
    },
  };
}
