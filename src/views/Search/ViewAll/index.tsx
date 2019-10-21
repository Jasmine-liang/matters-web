import Link from 'next/link'

import { Icon, TextIcon, Translate } from '~/components'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'
import ICON_ARROW_RIGHT_GREEN from '~/static/icons/arrow-right-green.svg?sprite'

const ViewAll = ({
  q,
  type
}: {
  q: string
  type: 'article' | 'tag' | 'user'
}) => {
  const viewAllPath = toPath({
    page: 'search',
    type,
    q
  })

  return (
    <Link {...viewAllPath}>
      <a
        onClick={() => {
          analytics.trackEvent(ANALYTICS_EVENTS.DISPLAY_ALL, {
            type: `${type}-search`
          })
        }}
      >
        <TextIcon
          icon={
            <Icon
              id={ICON_ARROW_RIGHT_GREEN.id}
              viewBox={ICON_ARROW_RIGHT_GREEN.viewBox}
              style={{ width: 12, height: 6 }}
            />
          }
          textPlacement="left"
          color="green"
        >
          <Translate
            zh_hant={TEXT.zh_hant.viewAll}
            zh_hans={TEXT.zh_hans.viewAll}
          />
        </TextIcon>
      </a>
    </Link>
  )
}

export default ViewAll