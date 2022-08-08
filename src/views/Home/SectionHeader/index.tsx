import { PageHeader, Translate, ViewAllButton } from '~/components'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

interface SidebarHeaderProps {
  type: 'authors' | 'tags'
  rightButton?: React.ReactNode
  viewAll?: boolean
}

const FeedHeader = ({
  type,
  rightButton,
  viewAll = true,
}: SidebarHeaderProps) => {
  const pathMap = {
    authors: PATHS.AUTHORS,
    tags: PATHS.TAGS,
  }
  const titleMap = {
    authors: <Translate zh_hant="值得關注" zh_hans="值得关注" en="Authors" />,
    tags: <Translate zh_hant="找你想看的" zh_hans="找你想看的" en="Topics" />,
  }
  const path = pathMap[type]

  return (
    <PageHeader title={titleMap[type]} is="h2" hasNoBorder>
      <section className="right">
        {rightButton}

        {path && viewAll && (
          <ViewAllButton
            href={path}
            bgColor={undefined}
            bgActiveColor="grey-lighter"
          />
        )}

        <style jsx>{styles}</style>
      </section>
    </PageHeader>
  )
}

export default FeedHeader
