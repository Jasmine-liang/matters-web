import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import {
  Dialog,
  Spinner,
  useDialogSwitch,
  // usePublicLazyQuery,
  usePublicQuery,
} from '~/components'
import { AuthorRssFeedFragment, AuthorRssFeedPublicQuery } from '~/gql/graphql'

interface RssFeedDialogProps {
  user: AuthorRssFeedFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const fragments = {
  user: gql`
    fragment AuthorRssFeed on User {
      id
      userName
      displayName
      info {
        description
        profileCover
        ethAddress
        ipnsKey
      }
      articles(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}

const AuthorRssFeedGQL = gql`
  query AuthorRssFeedPublic($userName: String!) {
    user(input: { userName: $userName }) {
      id
      ...AuthorRssFeed
    }
  }
  ${fragments.user}
`

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

export type SearchSelectFormProps = {
  title: string | React.ReactNode
  headerLeftButton?: React.ReactNode
  closeDialog: () => void
}

const BaseRssFeedDialog = ({ user, children }: RssFeedDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const { refetch } = usePublicQuery<AuthorRssFeedPublicQuery>(
    AuthorRssFeedGQL,
    {
      variables: { userName: user.userName },
      skip: true, // skip first call
    }
  )

  useEffect(() => {
    if (show) {
      refetch()
    }
  }, [show])

  return (
    <>
      {children({ openDialog })}

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        smBgColor="grey-lighter"
        smUpBgColor="grey-lighter"
      >
        <Dialog.Header
          title="contentFeedEntrance"
          closeDialog={closeDialog}
          closeTextId="close"
        />

        <DynamicContent user={user} refetch={refetch} />
      </Dialog>
    </>
  )
}

export const RssFeedDialog = (props: RssFeedDialogProps) => (
  <Dialog.Lazy mounted={<BaseRssFeedDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

RssFeedDialog.fragments = fragments
