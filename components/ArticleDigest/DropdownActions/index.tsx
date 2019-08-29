import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { Dropdown, Icon, Menu, PopperInstance } from '~/components'
import { ViewerContext } from '~/components/Viewer'

import ICON_MORE_SMALL from '~/static/icons/more-small.svg?sprite'

import { DropdownActionsArticle } from './__generated__/DropdownActionsArticle'
import ArchiveButton from './ArchiveButton'
import StickyButton from './StickyButton'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment DropdownActionsArticle on Article {
      id
      state
      ...StickyButtonArticle
    }
    ${StickyButton.fragments.article}
  `
}

const DropdownContent: React.FC<{
  article: DropdownActionsArticle
  hideDropdown: () => void
  refetch?: () => void
}> = ({ article, hideDropdown, refetch }) => {
  return (
    <Menu>
      <Menu.Item>
        <StickyButton
          article={article}
          hideDropdown={hideDropdown}
          refetch={refetch}
        />
      </Menu.Item>
      <Menu.Item>
        <ArchiveButton
          articleId={article.id}
          hideDropdown={hideDropdown}
          refetch={refetch}
        />
      </Menu.Item>
    </Menu>
  )
}

const DropdownActions = ({
  article,
  refetch
}: {
  article: DropdownActionsArticle
  refetch?: () => void
}) => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  const viewer = useContext(ViewerContext)
  const isArticleAuthor = viewer.id === article.author.id
  const isActive = article.state === 'active'

  if (!isArticleAuthor || !isActive || viewer.isInactive) {
    return null
  }

  return (
    <>
      <Dropdown
        content={
          <DropdownContent
            article={article}
            hideDropdown={hideDropdown}
            refetch={refetch}
          />
        }
        trigger="click"
        onCreate={setInstance}
        placement="bottom-end"
        zIndex={301}
      >
        <button type="button" aria-label="更多操作">
          <Icon
            size="small"
            id={ICON_MORE_SMALL.id}
            viewBox={ICON_MORE_SMALL.viewBox}
          />
        </button>
      </Dropdown>
      <style jsx>{styles}</style>
    </>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions