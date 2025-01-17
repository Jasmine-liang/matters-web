import classNames from 'classnames'
import React from 'react'

import { toPath } from '~/common/utils'
import {
  Card,
  CardProps,
  CircleAvatar,
  CircleAvatarSize,
  LinkWrapper,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import {
  DigestRichCirclePrivateFragment,
  DigestRichCirclePublicFragment,
} from '~/gql/graphql'

import Footer, { FooterControls } from './Footer'
import { fragments } from './gql'
import styles from './styles.css'

export type CircleDigestRichControls = {
  hasOwner?: boolean
  hasFooter?: boolean
  hasDescription?: boolean

  disabled?: boolean
} & FooterControls

export type CircleDigestRichProps = {
  circle: DigestRichCirclePublicFragment &
    Partial<DigestRichCirclePrivateFragment>
  avatarSize?: CircleAvatarSize
  textSize?: 'md-s' | 'xm'
} & CircleDigestRichControls &
  CardProps

const Rich = ({
  circle,

  avatarSize = 'xxl',
  textSize = 'xm',

  hasOwner = true,
  hasFooter,
  hasDescription = true,
  hasPrice,

  disabled,
  onClickPrice,

  ...cardProps
}: CircleDigestRichProps) => {
  const { displayName, description, owner } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  const containerClasses = classNames({
    container: true,
  })
  const titleClasses = classNames({
    title: true,
    [`text-size-${textSize}`]: !!textSize,
  })

  return (
    <Card
      href={disabled ? undefined : path.href}
      spacing={['base', 'base']}
      {...cardProps}
    >
      <section className={containerClasses}>
        <section className="content">
          <CircleAvatar circle={circle} size={avatarSize} />

          <header>
            <h3 className={titleClasses}>
              <LinkWrapper
                {...path}
                textActiveColor="green"
                disabled={disabled}
              >
                {displayName}
              </LinkWrapper>
            </h3>

            {hasOwner && (
              <UserDigest.Mini
                user={owner}
                avatarSize="sm"
                textSize="sm"
                nameColor="grey-darker"
                hasAvatar
                hasDisplayName
                disabled={disabled}
              />
            )}
          </header>
        </section>

        {hasDescription && description && (
          <p className="description">{description}</p>
        )}

        {hasFooter && (
          <Footer
            circle={circle}
            hasPrice={hasPrice}
            onClickPrice={onClickPrice}
          />
        )}

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

/**
 * Memoizing
 */
type MemoizedRichType = React.MemoExoticComponent<
  React.FC<CircleDigestRichProps>
> & {
  fragments: typeof fragments
}

const MemoizedRich = React.memo(Rich, ({ circle: prevCircle }, { circle }) => {
  return prevCircle.id === circle.id && prevCircle.isMember === circle.isMember
}) as MemoizedRichType

MemoizedRich.fragments = fragments

export default MemoizedRich
