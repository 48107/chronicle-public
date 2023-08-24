import Article from './article';

export default function NewsItems(props) {
  return (
    <div className='hidden md:inline-block 2xl:border-4 2xl:rounded-3xl'>
      {/* Section */}
      <h1 className='m-auto text-center font-light text-4xl my-1'>
        {props.mainArticle.section.substring(0, 1).toUpperCase()}
        {props.mainArticle.section.substring(1, 30)}
      </h1>
      <div className='mx-6 my-1'>
        <hr />
      </div>
      {/* Articles Regular */}
      <div
        className={`flex ${
          props.inverse ? 'hidden' : 'flex-row'
        } justify-center divide-x divide-slate-300`}
      >
        <div className='max-h-[60%] mx-2'>
          <Article article={props.mainArticle} isMain={true} />
        </div>
        <div className='flex flex-col justify-center content-center items-center divide-y divide-slate-300 px-2 mb-6'>
          <div className='justify-center py-2'>
            <Article article={props.article} isMain={false} />
          </div>
          <div className='justify-center py-2'>
            {/* <h1 className='border border-slate-800 rounded-lg mx-1 py-[4.35rem] px-[7.5rem] my-2'>
              Article 3
            </h1> */}
            <div>
              <Article article={props.article1} isMain={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Reverse */}
      <div
        className={`flex ${
          props.inverse ? 'flex-row' : 'hidden'
        } justify-center divide-x divide-slate-300`}
      >
        <div className='flex flex-col justify-center content-center items-center divide-y divide-slate-300 px-2 mb-6'>
          <div className='justify-center py-2'>
            <Article article={props.article} isMain={false} />
          </div>
          <div className='justify-center py-2'>
            {/* <h1 className='border border-slate-800 rounded-lg mx-1 py-[4.35rem] px-[7.5rem] my-2'>
              Article 3
            </h1> */}
              <Article article={props.article1} isMain={false} />
          </div>
        </div>

        <div className='max-h-[60%] mx-2 px-2'>
          <Article article={props.mainArticle} isMain={true} />
        </div>
      </div>
    </div>
  );
}
