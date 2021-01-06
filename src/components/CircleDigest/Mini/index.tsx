import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

import { Card, CardProps, CircleAvatar } from '~/components'

import { toPath } from '~/common/utils'

import Counts from '../Counts'
import styles from './styles.css'

// import { CircleDigestMiniCirclePublic } from './__generated__/CircleDigestMiniCirclePublic'

export type CircleDigestMiniProps = {
  // circle: CircleDigestMiniCirclePublic
  circle: any
} & CardProps

const CircleDigestMini = ({
  circle,

  ...cardProps
}: CircleDigestMiniProps) => {
  const { displayName, description } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  const containerClasses = classNames({
    container: true,
  })

  return (
    <Card {...path} spacing={[0, 0]} {...cardProps}>
      <section className={containerClasses}>
        <Link {...path}>
          <a className="avatar">
            <CircleAvatar circle={circle} size="xl" />
          </a>
        </Link>

        <section className="content">
          <header>
            <Link {...path}>
              <a className="name">{displayName}</a>
            </Link>

            <section className="info">
              <Counts circle={circle} />
            </section>
          </header>

          {description && <p className="description">{description}</p>}
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

// TODO: Memoizing

export default CircleDigestMini

// CircleDigestMini.fragments = fragments