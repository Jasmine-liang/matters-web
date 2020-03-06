import classNames from 'classnames'
import Router from 'next/router'
import { useRef } from 'react'

import { KEYCODES } from '~/common/enums'

import styles from './styles.css'

export type CardBgColor = 'grey-lighter' | 'white' | 'yellow-lighter'
export type CardBgHoverColor = 'grey-lighter' | 'green-lighter'
export type CardSpacing = 0 | 'xtight' | 'tight' | 'base'
export type CardBorderColor = 'grey-lighter'
export type CardBorderRadius = 'xtight' | 'xxtight' | 'base'

export interface CardProps {
  spacing?: [CardSpacing, CardSpacing]

  bgColor?: CardBgColor
  bgActiveColor?: CardBgHoverColor

  borderColor?: CardBorderColor
  borderRadius?: CardBorderRadius

  href?: string
  as?: string

  onClick?: () => any
}

export const Card: React.FC<CardProps> = ({
  spacing = ['base', 0],

  bgColor,
  bgActiveColor,

  borderColor,
  borderRadius,

  href,
  as,

  onClick,

  children
}) => {
  const disabled = !as && !href && !onClick
  const node = useRef<HTMLElement>(null)
  const cardClass = classNames({
    card: true,
    [`spacing-y-${spacing[0]}`]: !!spacing[0],
    [`spacing-x-${spacing[1]}`]: !!spacing[1],
    [`bg-${bgColor}`]: !!bgColor,
    [`bg-active-${bgActiveColor}`]: !!bgActiveColor,
    [`border-${borderColor}`]: !!borderColor,
    [`border-radius-${borderRadius}`]: !!borderRadius,

    hasBorder: !!borderColor || !!borderRadius,
    disabled
  })
  const openLink = ({
    newTab,
    event
  }: {
    newTab: boolean
    event: React.MouseEvent | React.KeyboardEvent
  }) => {
    const target = event.target as HTMLElement

    // skip if the inside <button> or <a> was clicked
    if (target.closest('a, button')) {
      return
    }

    // determine if it opens on a new tab
    if (as && href) {
      if (newTab) {
        window.open(as, '_blank')
      } else {
        Router.push(href, as)
      }
    }

    if (onClick) {
      onClick()
    }

    // stop bubbling if it's nested to another `<Card>`
    if (node.current && node.current.parentElement?.closest('.card')) {
      event.stopPropagation()
    }

    if (node.current) {
      node.current.blur()
    }
  }

  return (
    <section
      className={cardClass}
      tabIndex={disabled ? undefined : 0}
      ref={node}
      data-clickable
      onKeyDown={event => {
        if (event.keyCode !== KEYCODES.enter) {
          return
        }
        openLink({
          newTab: event.metaKey,
          event
        })
      }}
      onClick={event => {
        openLink({ newTab: event.metaKey, event })
      }}
    >
      {children}

      <style jsx>{styles}</style>
    </section>
  )
}
