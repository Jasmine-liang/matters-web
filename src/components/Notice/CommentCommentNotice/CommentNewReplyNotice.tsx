import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { Translate } from '~/components'
import { CommentNewReplyNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const CommentNewReplyNotice = ({
  notice,
}: {
  notice: CommentNewReplyNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  const replyCommentArticle =
    notice.reply?.node.__typename === 'Article' ? notice.reply.node : null
  const replyCommentCircle =
    notice.reply?.node.__typename === 'Circle' ? notice.reply.node : null

  return (
    <section className="container" data-test-id={TEST_ID.COMMENT_NEW_REPLY}>
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="comment" />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeHeadActors actors={notice.actors} />

          {replyCommentArticle && (
            <>
              <Translate
                zh_hant="回覆了你在作品 "
                zh_hans="回复了你在作品 "
                en=" replied to your comment on "
              />
              <NoticeArticleTitle article={replyCommentArticle} />
              <Translate zh_hant=" 的評論" zh_hans=" 的评论" en="" />
            </>
          )}
          {replyCommentCircle && (
            <>
              <Translate
                zh_hant="回覆了你在圍爐 "
                zh_hans="回复了你在围炉 "
                en=" replied to your discussion on "
              />
              <NoticeCircleName circle={replyCommentCircle} />
              <Translate zh_hant=" 中的發言" zh_hans=" 中的发言" en="" />
            </>
          )}
        </NoticeHead>

        <NoticeComment
          comment={isMultiActors ? notice.comment : notice.reply}
        />

        {isMultiActors && (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} size="md" />
            ))}
          </section>
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}
CommentNewReplyNotice.fragments = {
  notice: gql`
    fragment CommentNewReplyNotice on CommentCommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      comment: target {
        ...NoticeComment
      }
      reply: comment {
        ...NoticeComment
        node {
          ... on Article {
            ...NoticeArticleTitle
          }
          ... on Circle {
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeCircleName.fragments.circle}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CommentNewReplyNotice
