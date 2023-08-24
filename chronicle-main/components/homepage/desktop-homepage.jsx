import NewsItems from '../news/news-items';

export default function DesktopHomepage(props) {
  const mainIssueArticle = props.currentEdition.issues[0];
  const subIssueArticle = props.currentEdition.issues[1];
  const subIssueArticle1 = props.currentEdition.issues[2];

  const mainSportArticle = props.currentEdition.sport[0];
  const subSportArticle = props.currentEdition.sport[1];
  const subSportArticle1 = props.currentEdition.sport[2];

  const mainArtArticle = props.currentEdition.art.mainArticle;
  const subArtArticle = props.currentEdition.art.subArticle;
  const subArtArticle1 = props.currentEdition.art.subArticle1;

  const mainCommunityArticle = props.currentEdition.community.mainArticle;
  const subCommunityArticle = props.currentEdition.community.subArticle;

  return (
    <div className='2xl:grid 2xl:grid-cols-2 2xl:gap-4 mb-4 mx-2'>
      {/* Issues */}
      <NewsItems
        mainArticle={mainIssueArticle}
        article={subIssueArticle}
        article1={subIssueArticle1}
      />
      <hr className='hidden md:block my-2 mx-2 border-2 border-slate-500 2xl:hidden' />
      {/* Art */}
      <NewsItems
        mainArticle={mainArtArticle}
        article={subArtArticle}
        article1={subArtArticle1}
        inverse={true}
      />
      <hr className='hidden md:block my-2 mx-2 border-2 border-slate-500 2xl:hidden' />
      {/* Sport */}
      <NewsItems
        mainArticle={mainSportArticle}
        article={subSportArticle}
        article1={subSportArticle1}
      />
      <hr className='hidden md:block my-2 mx-2 border-2 border-slate-500 2xl:hidden' />
      {/* Community */}
      <NewsItems
        mainArticle={mainCommunityArticle}
        article={subCommunityArticle}
        article1={mainCommunityArticle}
        inverse={true}
      />
    </div>
  );
}
