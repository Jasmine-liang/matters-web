import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { Translate } from '~/components'
import { CircleNewArticleNoticeFragment } from '~/gql/graphql'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const CircleNewArticle = ({
  notice,
}: {
  notice: CircleNewArticleNoticeFragment
}) => {
  const circle = notice.article.access.circle

  if (!circle) {
    return null
  }

  return (
    <section className="container" data-test-id={TEST_ID.CIRCLE_NEW_ARTICLE}>
      <section className="avatar-wrap">
        <NoticeTypeIcon type="circle" />
      </section>

      <section className="content-wrap">
        <NoticeHead
          subtitle={
            <Translate
              zh_hant="新作品已經加入圍爐，馬上前往閱讀吧！"
              zh_hans="新作品已经加入围炉，马上前往阅读吧！"
              en="A new article has been added to the circle, read it now!"
            />
          }
        >
          <NoticeCircleName circle={circle} />
          <Translate zh_hant=" 又成長了" zh_hans=" 又成长了" en=" is growing" />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CircleNewArticle.fragments = {
  notice: gql`
    fragment CircleNewArticleNotice on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleCard
        access {
          circle {
            id
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
    ${NoticeCircleName.fragments.circle}
  `,
}

export default CircleNewArticle
