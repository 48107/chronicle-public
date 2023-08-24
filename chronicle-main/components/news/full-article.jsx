import { ArticleJsonLd } from "next-seo";
import Image from "next/image";

export default function FullArticle(props) {
    const article = props.article;

    return <div className='text-center bg-indigo-50 pb-6 pt-2'>
      <div className='flex flex-col'>
        <h2 className='text-xl font-semibold text-center pl-2 pr-1 basis-3/12'>
          {article.title}
        </h2>
        <h4 className='text-sm font-extralight text-right lg:text-center lg:pl-[45rem] italic basis-2/12 pr-10'>
          By {article.author}
        </h4>

        <div className='relative w-[20rem] min-h-[200px] max-h-[400px] m-auto'>
          <Image src={article.image} alt={article.title} layout='fill' objectFit='contain' />
        </div>
      </div>

      <p className='px-3 max-w-[50rem] m-auto md:border-x-2 border-indigo-200'>
        <span className='font-semibold text-2xl'>
          {article.text.substring(0, 1)}
        </span>
        <span
          dangerouslySetInnerHTML={{
            __html: article.text.substring(1, props.articleLength),
          }}
        ></span>
      </p>
    </div>
}