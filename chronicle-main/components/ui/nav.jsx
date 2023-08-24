import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { useSession, signIn, signOut } from 'next-auth/react';
import LoginButton from './login-btn';

export default function NavBar(props) {
  const [menuVisibility, setMenuVisibility] = useState('hidden');
  const router = useRouter();
  const { data: session, status } = useSession();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  async function closeMobileNav() {
    await delay(300);
    setMenuVisibility('hidden');
  }

  // let loginout;
  // if (status === 'authenticated') {
  //   loginout = <LoginButton signIn={signIn} />
  // }

  return (
    <div className='bg-slate-100'>
      {/* Desktop Version */}
      <div className='hidden md:block divide-y-2 mx-8 divide-slate-300'>
        <span className='pb-10' />
        <div className='m-auto w-45 h-20 relative mb-2 cursor-pointer'>
          <Link href={'/'}>
            <Image src='/header.svg' alt='Waterfor Chronicle Logo' layout='fill' />
          </Link>
        </div>
        <div>
          <nav className='text-center text-slate-700 grid grid-cols-5 divide-x-2 divide-slate-300 mx-[4%] lg:mx-[10%] py-1'>
            <Link href={'/'}>
              <div
                className={`hover:bg-slate-200 hover:text-black cursor-pointer ${
                  router.pathname == '/' ? 'text-black' : ''
                }`}
              >
                Current Edition
              </div>
            </Link>
            <Link href={'/issues'}>
              <div
                className={`hover:bg-slate-200 hover:text-black cursor-pointer ${
                  router.pathname == '/issues' ? 'text-black' : ''
                }`}
              >
                Issues
              </div>
            </Link>
            <Link href={'/art'}>
              <div
                className={`hover:bg-slate-200 hover:text-black cursor-pointer ${
                  router.pathname == '/art' ? 'text-black' : ''
                }`}
              >
                Art
              </div>
            </Link>
            <Link href={'/sport'}>
              <div
                className={`hover:bg-slate-200 hover:text-black cursor-pointer ${
                  router.pathname == '/sport' ? 'text-black' : ''
                }`}
              >
                Sport
              </div>
            </Link>
            <Link href={'/community'}>
              <div
                className={`hover:bg-slate-200 hover:text-black cursor-pointer ${
                  router.pathname == '/community' ? 'text-black' : ''
                }`}
              >
                Community
              </div>
            </Link>
            {/* <Link href={'/misc'}>
              <div
                className={`hover:bg-slate-200 hover:text-black cursor-pointer ${
                  router.pathname == '/edition' ? 'text-black' : ''
                }`}
              >
                Miscellaneous
              </div>
            </Link>
            <LoginButton /> */}
          </nav>
        </div>
      </div>
      {/* Mobile Version */}
      <div className='md:hidden'>
        <div className={`${menuVisibility} aboslute h-[100%] w-[100%]`}>
          <div
            className={`bg-neutral-900/90 text-neutral-300 z-50 h-[100%] p-10 pb-[100%] backdrop-blur-sm fixed text-2xl ${
              menuVisibility == 'static' ? 'w-[80%]' : 'w-0'
            }`}
          >
            <button
              onClick={() => setMenuVisibility('hidden')}
              className='float-right'
            >
              <XIcon className='w-8 h-8 pl-1' />
            </button>
            <ul onClick={closeMobileNav}>
              <li className='hover:text-neutral-50 active:text-neutral-50 pb-2'>
                <Link href={'/'}>Current Edition</Link>
              </li>
              <li className='hover:text-neutral-50 active:text-neutral-50 pb-2'>
                <Link href={'/issues/'}>Issues</Link>
              </li>
              <li className='hover:text-neutral-50 active:text-neutral-50 pb-2'>
                <Link href={'/art'}>Art</Link>
              </li>
              <li className='hover:text-neutral-50 active:text-neutral-50 pb-2'>
                <Link href={'/sport'}>Sport</Link>
              </li>
              <li className='hover:text-neutral-50 active:text-neutral-50 pb-2'>
                <Link href={'/community'}>Community</Link>
              </li>
              {/* <li className='hover:text-neutral-50 active:text-neutral-50 pb-2'>
                <Link href={'/misc'}>Miscellaneous</Link>
              </li>
              <li className='hover:text-neutral-50 active:text-neutral-50 pb-2'>
                <LoginButton />
              </li> */}
            </ul>
          </div>
        </div>

        <div className='flex justify-start flex-row h-20'>
          <button
            onClick={() => setMenuVisibility('static')}
            className='basis-1/4 pl-2'
          >
            <MenuIcon className='w-[60px] h-[60px]' />
          </button>

          <div className={`cursor-pointer text-center basis-1/2 z-0`}>
            <Link href={'/'}>
              <Image alt='Masthead for Waterford Chronicle' src='/chronicle-mobile.svg' width={210} height={80} />
            </Link>
          </div>
        </div>
      </div>
      {/* End */}
      {/* {props.children} */}
    </div>
  );
}
