import gql from 'graphql-tag'

import { DonatorsDialog } from '~/components'
import { Avatar } from '~/components/Avatar'

export const fragments = {
  article: gql`
    fragment DonatorsArticle on Article {
      id
      donations: transactionsReceivedBy(
        input: { first: 9, purpose: donation }
      ) {
        totalCount
        edges {
          cursor
          node {
            ... on User {
              id
              ...AvatarUser
              displayName
              userName
            }
          }
        }
      }
      ...DonatorDialogArticle
    }
    ${Avatar.fragments.user}
    ${DonatorsDialog.fragments.article}
  `,
}
