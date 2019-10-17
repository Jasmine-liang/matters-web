import { DataProxy } from 'apollo-cache'

import { UnreadFolloweeArticles } from '~/components/GQL/queries/__generated__/UnreadFolloweeArticles'
import UNREAD_FOLLOWEE_ARTICLES from '~/components/GQL/queries/unreadFolloweeArticles'

const update = (cache: DataProxy) => {
  try {
    const data = cache.readQuery<UnreadFolloweeArticles>({
      query: UNREAD_FOLLOWEE_ARTICLES
    })

    if (
      !data ||
      !data.viewer ||
      !data.viewer.status ||
      !data.viewer.status.unreadFolloweeArticles
    ) {
      return
    }

    cache.writeQuery({
      query: UNREAD_FOLLOWEE_ARTICLES,
      data: {
        viewer: {
          ...data.viewer,
          status: {
            ...data.viewer.status,
            unreadFolloweeArticles: false
          }
        }
      }
    })
  } catch (e) {
    console.error(e)
  }
}

export default update
