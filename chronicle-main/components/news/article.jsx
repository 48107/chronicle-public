import Image from 'next/image';
import Link from 'next/link';

export default function Article(props) {
  const article = props.article;
  const articleText = article.text;

  return (
    <div>
      <div>
        <Link href={`${article.section}/${article.id}`}>
          <h1 className={`${props.isMain ? 'text-3xl' : 'text-2xl'} font-semibold hover:text-sky-600 cursor-pointer`}>
            {article.title}
          </h1>
        </Link>
        <h3 className='text-sm font-extralight italic text-right pr-3'>
          By {article.author}
        </h3>
      </div>
      <div className={`block relative cursor-pointer max-w-[66%] md:min-w-[12rem] md:min-h-[10rem] lg:min-h-[15rem] ${props.isMain ? '' : 'hidden'}`}>
        <Link href={`${article.section}/${article.id}`}>
          <Image
            src={article.image}
            alt={article.title}
            // layout='responsive'
            // width={200}
            // height={150}
            layout='fill'
            objectFit='contain'
          />
        </Link>
      </div>
      <div>
        <p className='px-2'>
          <span className='font-semibold text-2xl'>
            {articleText.substring(0, 1)}
          </span>
          {articleText.substring(1, 240)}
          <span className='text-neutral-500'>
            {articleText.substring(240, 243)}
          </span>
          <span className='text-neutral-400'>
            {articleText.substring(243, 245)}
          </span>
          <span className='text-neutral-200'>
            {articleText.substring(245, 247)}
          </span>
          <Link href={`${article.section}/${article.id}`}>
            <a className='font-semibold'>Read More...</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
