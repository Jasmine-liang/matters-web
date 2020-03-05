import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import { Head, Layout, Spinner, Throw404 } from '~/components'
import { fragments as EditorFragments } from '~/components/Editor/fragments'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { QueryError } from '~/components/GQL'

import { getQuery } from '~/common/utils'

import DraftContent from './Content'
import PublishState from './PublishState'
import Sidebar from './Sidebar'

import { DraftDetailQuery } from './__generated__/DraftDetailQuery'

const DRAFT_DETAIL = gql`
  query DraftDetailQuery($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        ...EditorDraft
        ...DraftSidebarDraft
        ...PublishStateDraft
      }
    }
  }
  ${EditorFragments.draft}
  ${Sidebar.fragments.draft}
  ${PublishState.fragments.draft}
`

const DraftDetail = () => {
  const router = useRouter()
  const id = getQuery({ router, key: 'id' })
  const { updateHeaderState } = useContext(HeaderContext)

  useEffect(() => {
    updateHeaderState({ type: 'draft', state: '', draftId: id })
    return () => updateHeaderState({ type: 'default' })
  }, [])

  const { data, loading, error } = useQuery<DraftDetailQuery>(DRAFT_DETAIL, {
    variables: { id },
    fetchPolicy: 'network-only'
  })

  if (error) {
    return <QueryError error={error} />
  }

  if (!loading && (!data || !data.node || data.node.__typename !== 'Draft')) {
    return <Throw404 />
  }

  const draft = data?.node?.__typename === 'Draft' && data.node

  return (
    <Layout
      rightSide={
        <>
          {loading && <Spinner />}
          {draft && <Sidebar draft={draft} />}
        </>
      }
    >
      <Head title={{ zh_hant: '編輯草稿', zh_hans: '编辑草稿' }} />

      {loading && <Spinner />}

      {!loading && draft && (
        <>
          <PublishState draft={draft} />
          <DraftContent draft={draft} />
        </>
      )}
    </Layout>
  )
}

export default DraftDetail
