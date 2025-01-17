import { DataProxy } from 'apollo-cache'

import { UserArticlesPublicQuery } from '~/gql/graphql'

type UserArticlesPublicUserArticlesEdges = NonNullable<
  NonNullable<UserArticlesPublicQuery['user']>['articles']['edges']
>

const sortEdgesByCreatedAtDesc = (
  edges: UserArticlesPublicUserArticlesEdges
) => {
  return edges.sort(
    ({ node: n1 }, { node: n2 }) =>
      Date.parse(n2.createdAt) - Date.parse(n1.createdAt)
  )
}

const update = ({
  cache,
  articleId,
  userName,
  type,
}: {
  cache: DataProxy
  articleId: string
  userName?: string | null
  type: 'sticky' | 'unsticky' | 'archive'
}) => {
  // FIXME: circular dependencies
  const { USER_ARTICLES_PUBLIC } = require('~/views/User/Articles/gql')

  if (!userName) {
    return
  }

  try {
    const data = cache.readQuery<UserArticlesPublicQuery>({
      query: USER_ARTICLES_PUBLIC,
      variables: { userName },
    })

    if (!data?.user?.status || !data.user.articles.edges) {
      return
    }

    let edges = data.user.articles.edges
    let { articleCount, totalWordCount } = data.user.status
    const targetEdge = edges.filter(({ node }) => node.id === articleId)[0]

    switch (type) {
      case 'sticky':
        // unsticky rest articles
        const restEdges = edges.filter(({ node }) => {
          if (node.id !== articleId) {
            node.sticky = false
            return true
          }
        })
        edges = [targetEdge, ...sortEdgesByCreatedAtDesc(restEdges)]
        break
      case 'unsticky':
        // unsticky all articles
        edges = edges.map((edge) => {
          edge.node.sticky = false
          return edge
        })
        edges = sortEdgesByCreatedAtDesc(edges)
        break
      case 'archive':
        articleCount = articleCount - 1
        totalWordCount = totalWordCount - (targetEdge.node.wordCount || 0)
        break
    }

    cache.writeQuery({
      query: USER_ARTICLES_PUBLIC,
      variables: { userName },
      data: {
        user: {
          ...data.user,
          articles: {
            ...data.user.articles,
            edges,
          },
          status: {
            ...data.user.status,
            articleCount,
            totalWordCount,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export default update
