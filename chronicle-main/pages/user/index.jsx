import { getSession, signIn, signOut } from 'next-auth/react';
import { NextSeo } from 'next-seo';
// import { getToken } from 'next-auth/jwt';
import Link from 'next/link';
// import { NextPageContext } from "next"
import Card from '../../components/ui/card';

export default function UserPage(props) {
  //   const { data: session, status } = useSession();

  if (!props.session) {
    return <h1 className='text-center text-2xl'>Please Sign In</h1>;
  }

  return (
    <>
      <NextSeo title='My Account - The Waterford Chronicle' />
      <div className='px-[8%] max-w-[80rem] m-auto'>
        <Card>
          <h1 className='text-2xl'>
            Hello, {props.session.user.name} {console.log(props.session)}
          </h1>
          <div className='py-4'>
            <h1 className='font-semibold font-md'>
              What would you like to do?
            </h1>
            <div className='w-40 flex flex-col m-auto text-gray-700'>
              <Link href='/admin/new-article'>
                <div
                  className={`${
                    props.session.isAdmin ? '' : 'hidden'
                  } hover:text-neutral-900 hover:bg-sky-200 border-y border-teal-300 cursor-pointer`}
                >
                  Add an Article
                </div>
              </Link>
              <button onClick={signOut}>
                <div className='hover:text-neutral-900 hover:bg-sky-200 border-y border-teal-300'>
                  Log Out
                </div>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
