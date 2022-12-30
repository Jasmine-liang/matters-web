import gql from 'graphql-tag'

import {
  IconPin24,
  IconUnPin24,
  Menu,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import updateUserArticles from '~/components/GQL/updates/userArticles'
import {
  StickyButtonArticleFragment,
  ToggleStickyMutation,
} from '~/gql/graphql'

const TOGGLE_STICKY = gql`
  mutation ToggleSticky($id: ID!, $sticky: Boolean!) {
    editArticle(input: { id: $id, sticky: $sticky }) {
      id
      sticky
    }
  }
`

const fragments = {
  article: gql`
    fragment StickyButtonArticle on Article {
      id
      sticky
      author {
        id
        userName
      }
    }
  `,
}

const StickyButton = ({
  article,
}: {
  article: StickyButtonArticleFragment
}) => {
  const [toggleSticky] = useMutation<ToggleStickyMutation>(TOGGLE_STICKY, {
    variables: { id: article.id, sticky: !article.sticky },
    optimisticResponse: {
      editArticle: {
        id: article.id,
        sticky: !article.sticky,
        __typename: 'Article',
      },
    },
    update: (cache) => {
      updateUserArticles({
        cache,
        articleId: article.id,
        userName: article.author.userName,
        type: article.sticky ? 'unsticky' : 'sticky',
      })
    },
  })

  return (
    <Menu.Item onClick={toggleSticky}>
      {article.sticky ? (
        <TextIcon icon={<IconUnPin24 size="md" />} size="md" spacing="base">
          <Translate id="unstickyArticle" />
        </TextIcon>
      ) : (
        <TextIcon icon={<IconPin24 size="md" />} size="md" spacing="base">
          <Translate id="stickyArticle" />
        </TextIcon>
      )}
    </Menu.Item>
  )
}

StickyButton.fragments = fragments

export default StickyButton
