import gql from 'graphql-tag'

import { ArticleNotice as NoticeType } from './__generated__/ArticleNotice'
import ArticleMentionedYouNotice from './ArticleMentionedYouNotice'
import ArticleNewAppreciationNotice from './ArticleNewAppreciationNotice'
import ArticleNewSubscriberNotice from './ArticleNewSubscriberNotice'
import ArticlePublishedNotice from './ArticlePublishedNotice'
import CircleNewArticle from './CircleNewArticle'
import RevisedArticleNotPublishedNotice from './RevisedArticleNotPublishedNotice'
import RevisedArticlePublishedNotice from './RevisedArticlePublishedNotice'

const ArticleNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.articleNoticeType) {
    case 'ArticlePublished':
      return <ArticlePublishedNotice notice={notice} />
    case 'ArticleMentionedYou':
      return <ArticleMentionedYouNotice notice={notice} />
    case 'ArticleNewSubscriber':
      return <ArticleNewSubscriberNotice notice={notice} />
    case 'ArticleNewAppreciation':
      return <ArticleNewAppreciationNotice notice={notice} />
    case 'RevisedArticlePublished':
      return <RevisedArticlePublishedNotice notice={notice} />
    case 'RevisedArticleNotPublished':
      return <RevisedArticleNotPublishedNotice notice={notice} />
    case 'CircleNewArticle':
      return <CircleNewArticle notice={notice} />
    default:
      return null
  }
}

ArticleNotice.fragments = {
  notice: gql`
    fragment ArticleNotice on ArticleNotice {
      id
      unread
      __typename
      articleNoticeType: type
      ...ArticleMentionedYouNotice
      ...ArticleNewAppreciationNotice
      ...ArticleNewSubscriberNotice
      ...ArticlePublishedNotice
      ...RevisedArticleNotPublishedNotice
      ...RevisedArticlePublishedNotice
      ...CircleNewArticleNotice
    }
    ${ArticleMentionedYouNotice.fragments.notice}
    ${ArticleNewAppreciationNotice.fragments.notice}
    ${ArticleNewSubscriberNotice.fragments.notice}
    ${ArticlePublishedNotice.fragments.notice}
    ${RevisedArticleNotPublishedNotice.fragments.notice}
    ${RevisedArticlePublishedNotice.fragments.notice}
    ${CircleNewArticle.fragments.notice}
  `,
}

export default ArticleNotice
