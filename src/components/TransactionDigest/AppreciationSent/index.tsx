import gql from 'graphql-tag'

import {
  ArticleDigest,
  Card,
  DateTime,
  Icon,
  TextIcon,
  UserDigest
} from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { AppreciationSentTransaction } from './__generated__/AppreciationSentTransaction'

const fragments = {
  transaction: gql`
    fragment AppreciationSentTransaction on Transaction {
      amount
      purpose
      content
      createdAt
      recipient {
        ...UserDigestMiniUser
      }
      target {
        ...TitleDigestArticle
      }
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigest.Title.fragments.article}
  `
}

const AppreciationSent = ({ tx }: { tx: AppreciationSentTransaction }) => {
  const { amount, content, purpose, createdAt, recipient, target } = tx
  const isUseContent = purpose !== 'appreciate'
  const path = target
    ? toPath({ page: 'articleDetail', article: target })
    : null

  return (
    <Card {...path}>
      <section className="container">
        <section className="left">
          {isUseContent && content && <h4 className="content">{content}</h4>}
          {!isUseContent && target && <ArticleDigest.Title article={target} />}
          {recipient && !isUseContent && (
            <UserDigest.Mini
              user={recipient}
              avatarSize="sm"
              hasAvatar
              hasDisplayName
            />
          )}
        </section>

        <section className="right">
          <div className="appreciate-count" aria-label={`${amount} 次讚賞`}>
            <TextIcon
              icon={<Icon.Like />}
              spacing="xtight"
              weight="md"
              color="green"
              text={amount}
            />
          </div>

          <DateTime date={createdAt} type="standard" />
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

AppreciationSent.fragments = fragments

export default AppreciationSent
