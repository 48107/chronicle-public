import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import Card from '../../components/ui/card';

export default function NewArticle() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const titleRef = useRef();
  const imageRef = useRef();
  const authorRef = useRef();
  const textRef = useRef();
  const sectionRef = useRef();
  const editionRef = useRef();

  if (status === 'loading') {
    return <h1 className='text-center text-xl'>Loading...</h1>;
  }

  if (status === 'unauthenticated') {
    return <h1 className='text-center'>Error 401: Access Denied</h1>;
  }

  // const id = new ObjectId();

  async function onAddMeetup(event) {
    event.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredImage = imageRef.current.value;
    const enteredAuthor = authorRef.current.value;
    const enteredText = textRef.current.value;
    const enteredSection = sectionRef.current.value;
    const enteredEdition = editionRef.current.value;

    const articleData = {
      title: enteredTitle,
      image: enteredImage,
      author: enteredAuthor,
      text: enteredText,
      section: enteredSection,
      editionRef: enteredEdition,
    };

    console.log('request issued');
    const response = await fetch('/api/add-article', {
      method: 'POST',
      body: JSON.stringify(articleData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const returnMessage = await response.json();
    console.log(returnMessage);

    if (returnMessage.success) {
      router.push('/');
    }
  }

  return (
    <div>
      <p className='sm:hidden text-center text-4xl py-10'>
        Please come back later with a computer
      </p>
      <div className='max-w-xl md:max-w-2xl lg:max-w-5xl m-auto text-slate-800 hidden sm:block'>
        <h1 className='text-2xl text-center py-2'>New Article</h1>
        <Card strongColour={true}>
          <form className='text-center justify-center' onSubmit={onAddMeetup}>
            <div className='pb-4 pt-2'>
              <label htmlFor='title' className='text-xl pb-2'>
                Article Title*
              </label>
              <input
                type='text'
                id='title'
                required
                ref={titleRef}
                className='block rounded border-2 border-solid border-indigo-300 m-auto bg-indigo-100 focus:bg-indigo-50 focus:border-indigo-500 outline-none text-center'
              />
            </div>
            <div className='pb-4'>
              <label htmlFor='author' className='text-xl pb-2'>
                Article Author*
              </label>
              <input
                type='text'
                id='author'
                required
                ref={authorRef}
                className='block rounded border-2 border-solid border-indigo-300 m-auto bg-indigo-100 focus:bg-indigo-50 focus:border-indigo-500 outline-none text-center'
              />
            </div>
            <div className='pb-4'>
              <label htmlFor='image' className='text-xl pb-2'>
                Article Image*
              </label>
              <input
                type='text'
                required
                id='image'
                ref={imageRef}
                className='block rounded border-2 border-solid border-indigo-300 m-auto bg-indigo-100 focus:bg-indigo-50 focus:border-indigo-500 outline-none text-center'
              />
            </div>
            <div className='pb-4'>
              <label htmlFor='section' className='text-xl pb-2'>
                Article Section*
              </label>
              <select
                id='section'
                name='section'
                required
                ref={sectionRef}
                className='block rounded border-2 border-solid border-indigo-300 m-auto bg-indigo-100 focus:bg-indigo-50 focus:border-indigo-500 outline-none text-center w-[168px] h-[28px]'
              >
                <option value='issues'>Issues</option>
                <option value='art'>Art</option>
                <option value='sport'>Sport</option>
                <option value='community'>Community</option>
              </select>
            </div>
            <div className='pb-4'>
              <label htmlFor='text' className='text-xl pb-2'>
                Article Text*
              </label>
              <textarea
                type='text'
                id='text'
                required
                ref={textRef}
                className='block rounded border-2 border-solid border-indigo-300 m-auto bg-indigo-100 focus:bg-indigo-50 focus:border-indigo-500 outline-none text-center w-[85%] h-60'
              />
            </div>
            <div className='pb-4'>
              <label htmlFor='edition' className='text-xl pb-2'>
                Edition*
              </label>
              <select
                id='edition'
                name='edition'
                required
                ref={editionRef}
                className='block rounded border-2 border-solid border-indigo-300 m-auto bg-indigo-100 focus:bg-indigo-50 focus:border-indigo-500 outline-none text-center w-[168px] h-[28px]'
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
              </select>
            </div>
            <div className=''>
              <button
                type='submit'
                className='border-2 border-indigo-600 rounded-lg py-1 px-3 mt-1 mb-2 text-indigo-700 hover:bg-indigo-600 hover:text-indigo-200 font-medium'
              >
                Add Article
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
