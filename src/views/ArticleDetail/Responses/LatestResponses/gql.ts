import gql from 'graphql-tag'

import { ThreadComment } from '~/components'

import ResponseArticle from '../ResponseArticle'

export const LATEST_RESPONSES_PUBLIC = gql`
  query LatestResponsesPublic(
    $id: ID!
    $before: String
    $after: String
    $first: first_Int_min_0 = 8
    $includeAfter: Boolean
    $includeBefore: Boolean
    $articleOnly: Boolean
  ) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        mediaHash
        id
        responseCount
        responses(
          input: {
            after: $after
            before: $before
            first: $first
            includeAfter: $includeAfter
            includeBefore: $includeBefore
            articleOnly: $articleOnly
          }
        ) {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            node {
              ... on Article {
                ...ResponseArticleArticle
              }
              ... on Comment {
                ...ThreadCommentCommentPublic
                ...ThreadCommentCommentPrivate
              }
            }
          }
        }
      }
    }
  }
  ${ResponseArticle.fragments.article}
  ${ThreadComment.fragments.comment.public}
  ${ThreadComment.fragments.comment.private}
`

export const LATEST_RESPONSES_PRIVATE = gql`
  query LatestResponsesPrivate($ids: [ID!]!) {
    nodes(input: { ids: $ids }) {
      id
      ... on Comment {
        ...ThreadCommentCommentPrivate
      }
    }
  }
  ${ThreadComment.fragments.comment.private}
`
