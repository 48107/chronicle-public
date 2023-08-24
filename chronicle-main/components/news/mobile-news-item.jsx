import Card from '../ui/card';
import NewsCardMobile from './news-card-mobile';

export default function MobileNewsItem(props) {
  return (
    <div className='md:hidden py-1'>
      <Card>
        {/* {console.log(props.article)} */}
        {/* {props.article.title} */}
        <NewsCardMobile
          section={props.article.section}
          text={props.article.text}
          image={props.article.image}
          title={props.article.title}
          author={props.article.author}
          id={props.article.id}
          isMain={props.mainArticle}
        />
      </Card>
    </div>
  );
}
