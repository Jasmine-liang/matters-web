import { toPath } from '~/common/utils'
import { Tabs, Translate, useRoute } from '~/components'

type UserTabsProps = {
  hasSubscriptions?: boolean
}

const UserTabs: React.FC<UserTabsProps> = ({ hasSubscriptions }) => {
  const { isInPath, getQuery } = useRoute()
  const userName = getQuery('name')

  const userSubscriptonsPath = toPath({
    page: 'userSubscriptons',
    userName,
  })
  const userArticlesPath = toPath({
    page: 'userProfile',
    userName,
  })
  const userCommentsPath = toPath({
    page: 'userComments',
    userName,
  })
  const userTagsPath = toPath({
    page: 'userTags',
    userName,
  })

  return (
    <Tabs sticky>
      {hasSubscriptions && (
        <Tabs.Tab
          {...userSubscriptonsPath}
          selected={isInPath('USER_SUBSCRIPTIONS')}
        >
          <Translate id="subscriptions" />
        </Tabs.Tab>
      )}

      <Tabs.Tab {...userArticlesPath} selected={isInPath('USER_ARTICLES')}>
        <Translate id="articles" />
      </Tabs.Tab>

      <Tabs.Tab {...userCommentsPath} selected={isInPath('USER_COMMENTS')}>
        <Translate id="responses" />
      </Tabs.Tab>

      <Tabs.Tab {...userTagsPath} selected={isInPath('USER_TAGS')}>
        <Translate id="tags" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default UserTabs
