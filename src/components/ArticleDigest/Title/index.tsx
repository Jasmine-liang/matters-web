import classNames from 'classnames'
import gql from 'graphql-tag'

import { LinkWrapper, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

import { ArticleDigestTitleArticle } from './__generated__/ArticleDigestTitleArticle'

export type ArticleDigestTitleTextSize = 'sm' | 'md-s' | 'md' | 'xm' | 'xl'
export type ArticleDigestTitleTextWeight = 'normal' | 'md' | 'semibold'
export type ArticleDigestTitleIs = 'h2' | 'h3' | 'h4'

interface ArticleDigestTitleProps {
  article: ArticleDigestTitleArticle

  textSize?: ArticleDigestTitleTextSize
  textWeight?: ArticleDigestTitleTextWeight
  is?: ArticleDigestTitleIs
  disabled?: boolean
}

const fragments = {
  article: gql`
    fragment ArticleDigestTitleArticle on Article {
      id
      title
      articleState: state
      slug
      mediaHash
      author {
        id
        userName
      }
    }
  `
}

export const ArticleDigestTitle = ({
  article,

  textSize = 'md',
  textWeight = 'md',
  is = 'h2',
  disabled
}: ArticleDigestTitleProps) => {
  const { articleState: state } = article
  const path = toPath({
    page: 'articleDetail',
    article
  })
  const isBanned = state === 'banned'
  const title = isBanned ? (
    <Translate
      zh_hant={TEXT.zh_hant.articleBanned}
      zh_hans={TEXT.zh_hans.articleBanned}
    />
  ) : (
    article.title
  )
  const titleClasses = classNames({
    title: true,
    [`text-size-${textSize}`]: !!textSize,
    [`text-weight-${textWeight}`]: !!textWeight
  })
  const isClickable = !disabled && !isBanned

  return (
    <LinkWrapper
      {...path}
      textHoverColor={isClickable ? 'green' : undefined}
      disabled={!isClickable}
    >
      <>
        {is === 'h2' ? (
          <h2 className={titleClasses}>{title}</h2>
        ) : is === 'h3' ? (
          <h3 className={titleClasses}>{title}</h3>
        ) : (
          <h4 className={titleClasses}>{title}</h4>
        )}

        <style jsx>{styles}</style>
      </>
    </LinkWrapper>
  )
}

ArticleDigestTitle.fragments = fragments