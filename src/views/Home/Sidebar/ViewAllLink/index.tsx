import Link from 'next/link'
import { useContext } from 'react'

import { Icon, LanguageContext, TextIcon } from '~/components'

import { ANALYTICS_EVENTS, PATHS, TEXT } from '~/common/enums'
import { analytics, translate } from '~/common/utils'
import ICON_ARROW_RIGHT_GREEN_SMALL from '~/static/icons/arrow-right-green-small.svg?sprite'

import styles from './styles.css'

export default ({ type }: { type: 'authors' | 'tags' | 'topics' }) => {
  const { lang } = useContext(LanguageContext)
  const pathMap = {
    topics: PATHS.TOPICS,
    authors: PATHS.AUTHORS,
    tags: PATHS.TAGS
  }

  return (
    <Link {...pathMap[type]}>
      <a
        onClick={() =>
          analytics.trackEvent(ANALYTICS_EVENTS.DISPLAY_ALL, { type })
        }
      >
        <TextIcon
          icon={
            <Icon
              id={ICON_ARROW_RIGHT_GREEN_SMALL.id}
              viewBox={ICON_ARROW_RIGHT_GREEN_SMALL.viewBox}
              style={{ width: 6, height: 8 }}
            />
          }
          color="green"
          text={translate({
            zh_hant: TEXT.zh_hant.viewAll,
            zh_hans: TEXT.zh_hans.viewAll,
            lang
          })}
          textPlacement="left"
        />
        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}