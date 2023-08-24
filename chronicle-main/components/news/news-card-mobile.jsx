import Link from 'next/link';
import Image from 'next/image';

export default function NewsCardMobile(props) {
  const articleText = props.text;

  return (
    <div className={`${props.isMain ? 'max-h-[30rem] min-h-[20rem]' : 'max-h[20rem] min-h-[10rem]'}`}>
      {/* <h1 className='text-xl font-[900]'>{props.section}</h1> */}
      <div className={`flex flex-col`}>
        <Link href={`${props.section}/${props.id}`}>
          <h2 className='text-2xl font-semibold text-center pl-2 pr-1 basis-2/12 cursor-pointer hover:text-sky-700 active:text-sky-700'>
            {props.title}
          </h2>
        </Link>
        <h4 className='text-sm font-extralight italic text-right basis-1/12 pr-10'>
          By {props.author}
        </h4>
        <Link href={`${props.section}/${props.id}`}>
          <div className={`${props.isMain ? '' : 'hidden'} relative mx-3 py-1 h-[13rem] cursor-pointer`}>
            {/* loading='priority' */}
            <Image src={props.image} alt={props.title} layout='fill' objectFit='cover'  />
          </div>
        </Link>
      </div>

      <p className='px-2'>
        <span className='font-semibold text-2xl'>
          {articleText.substring(0, 1)}
        </span>
        {articleText.substring(1, 190)}
        <span className='text-neutral-500'>
          {articleText.substring(190, 193)}
        </span>
        <span className='text-neutral-400'>
          {articleText.substring(193, 195)}
        </span>
        <span className='text-neutral-200'>
          {articleText.substring(195, 197)}
        </span>
        <Link href={`${props.section}/${props.id}`}>
          <a className='font-semibold'>Read More...</a>
        </Link>
      </p>
    </div>
  );
}
