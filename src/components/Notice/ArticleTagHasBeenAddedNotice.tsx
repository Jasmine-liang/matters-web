import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'

import ICON_AVATAR_LOGO from '~/static/icons/avatar-logo.svg'

import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeDate from './NoticeDate'
import NoticeTag from './NoticeTag'
import styles from './styles.css'

import { ArticleTagHasBeenAddedNotice as NoticeType } from './__generated__/ArticleTagHasBeenAddedNotice'

const ArticleTagHasBeenAddedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actor) {
    return null
  }

  return (
    <section className="container">
      <section className="avatar-wrap">
        <Avatar src={ICON_AVATAR_LOGO} />
      </section>

      <section className="content-wrap">
        <h4>
          <Translate zh_hant="你的作品 " zh_hans="你的作品 " />
          <NoticeArticle article={notice.target} />
          <Translate zh_hant=" 已經被 " zh_hans=" 已經被 " />
          <NoticeActorName user={notice.actor} />
          <Translate zh_hant="  加入 " zh_hans=" 加入 " />
          <NoticeTag tag={notice.tag} />
          <Translate zh_hant="  的精選文集了" zh_hans=" 的精选文集了" />
        </h4>

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleTagHasBeenAddedNotice.fragments = {
  notice: gql`
    fragment ArticleTagHasBeenAddedNotice on ArticleTagHasBeenAddedNotice {
      id
      unread
      __typename
      ...NoticeDate
      actor {
        ...NoticeActorNameUser
      }
      target {
        ...NoticeArticle
      }
      tag {
        ...NoticeTag
      }
    }
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeTag.fragments.tag}
    ${NoticeDate.fragments.notice}
  `
}

export default ArticleTagHasBeenAddedNotice