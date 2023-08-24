import Article from '../../components/news/article';
import MobileNewsItem from '../../components/news/mobile-news-item';

export default function NewsSection(props) {
  const articles1 = props.articles.filter( ({edition}) => edition === "1")
  const articles2 = props.articles.filter( ({edition}) => edition === "2")

  return (
    <div>
      <h1 className='text-center text-4xl my-2 mx-6 border-b border-slate-600'>Edition 1</h1>
      <div className='md:flex md:flex-wrap py-3 px-1'>
        {articles1.map((article) => {
          return (
            // 'min-w-[25rem] lg:max-w-[50%]'
            <div
              className='flex-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-w-xl m-auto md:border-x md:border-slate-600'
              key={article.id}
            >
              <MobileNewsItem article={article} mainArticle={true} />
              <div className='hidden md:block px-4 py-1'>
                <Article article={article} isMain={true} />
              </div>
            </div>
          )
        })}
      </div>
      <h1 className='text-center text-4xl my-2 mx-6 border-b border-slate-600'>Edition 2</h1>
      <div className='md:flex md:flex-wrap py-3 px-1'>
        {articles2.map((article) => {
          return (
            // 'min-w-[25rem] lg:max-w-[50%]'
            <div
              className='flex-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-w-xl m-auto md:border-x md:border-slate-600'
              key={article.id}
            >
              <MobileNewsItem article={article} mainArticle={true} />
              <div className='hidden md:block px-4 py-1'>
                <Article article={article} isMain={true} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}