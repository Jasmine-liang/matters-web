import gql from 'graphql-tag'

import {
  Button,
  IconArrowRight16,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import { RetryPublishMutation } from '~/gql/graphql'

const RETRY_PUBLISH = gql`
  mutation RetryPublish($id: ID!) {
    retryPublish: publishArticle(input: { id: $id }) {
      id
      publishState
    }
  }
`

const RetryButton = ({ id }: { id: string }) => {
  const [retry] = useMutation<RetryPublishMutation>(RETRY_PUBLISH, {
    variables: { id },
    optimisticResponse: {
      retryPublish: {
        id,
        publishState: 'pending' as any,
        __typename: 'Draft',
      },
    },
  })

  return (
    <Button
      size={[null, '1.25rem']}
      spacing={[0, 'xtight']}
      bgActiveColor="red"
      onClick={() => retry()}
    >
      <TextIcon
        color="white"
        icon={<IconArrowRight16 size="xs" />}
        textPlacement="left"
      >
        <Translate id="retry" />
      </TextIcon>
    </Button>
  )
}

export default RetryButton
