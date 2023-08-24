import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';


export default function LoginButton(props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    return <Link href='/user'><div className={`md:hover:bg-slate-200 hover:text-black cursor-pointer active:text-white ${router.pathname === '/user' ? 'text-black' : ''}`}>Account</div></Link>;
  } else {
    return <button onClick={signIn}><div className={`md:hover:bg-slate-200 hover:text-black cursor-pointer active:text-white`}>Log In</div></button>;
  }
}
