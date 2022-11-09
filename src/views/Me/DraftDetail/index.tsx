import { useQuery } from '@apollo/react-hooks'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import {
  EmptyLayout,
  Head,
  Layout,
  Spinner,
  Throw404,
  useResponsive,
  useRoute,
} from '~/components'
import { QueryError, useMutation } from '~/components/GQL'
import UPLOAD_FILE from '~/components/GQL/mutations/uploadFile'

import { ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import { stripHtml } from '~/common/utils'

import BottomBar from './BottomBar'
import { DRAFT_DETAIL, SET_CONTENT } from './gql'
import PublishState from './PublishState'
import SaveStatus from './SaveStatus'
import SettingsButton from './SettingsButton'
import Sidebar from './Sidebar'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'
import { DraftDetailQuery } from './__generated__/DraftDetailQuery'
import { SetDraftContent } from './__generated__/SetDraftContent'

const Editor = dynamic(() => import('~/components/Editor/Article'), {
  ssr: false,
  loading: Spinner,
})

const DraftDetail = () => {
  const isLargeUp = useResponsive('lg-up')
  const { getQuery } = useRoute()
  const id = getQuery('draftId')

  const [setContent] = useMutation<SetDraftContent>(SET_CONTENT)
  const [singleFileUpload] = useMutation<SingleFileUpload>(UPLOAD_FILE)
  const [saveStatus, setSaveStatus] = useState<
    'saved' | 'saving' | 'saveFailed'
  >()
  const [hasValidSummary, setHasValidSummary] = useState<boolean>(true)

  const { data, loading, error } = useQuery<DraftDetailQuery>(DRAFT_DETAIL, {
    variables: { id },
    fetchPolicy: 'network-only',
  })
  const draft = (data?.node?.__typename === 'Draft' && data.node) || undefined
  const ownCircles = data?.viewer?.ownCircles || undefined
  const viewer = data?.viewer

  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  if (!draft) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  const hasContent =
    draft?.content && stripHtml(draft.content).trim().length > 0
  const hasTitle = draft?.title && draft.title.length > 0
  const isUnpublished = draft?.publishState === 'unpublished'
  const publishable =
    id && isUnpublished && hasContent && hasTitle && hasValidSummary

  const upload = async (input: { [key: string]: any }) => {
    const result = await singleFileUpload({
      variables: {
        input: {
          type: ASSET_TYPE.embed,
          entityType: ENTITY_TYPE.draft,
          entityId: draft && draft.id,
          ...input,
        },
      },
    })
    const { id: assetId, path } =
      (result && result.data && result.data.singleFileUpload) || {}

    if (assetId && path) {
      return { id: assetId, path }
    } else {
      throw new Error('upload not successful')
    }
  }

  const update = async (newDraft: {
    title?: string | null
    content?: string | null
    cover?: string | null
    summary?: string | null

    initText?: string | null
    currText?: string | null
  }) => {
    try {
      if (draft?.publishState === 'published') {
        return
      }

      setSaveStatus('saving')

      // remove unwanted props passing from editor module
      if (newDraft.initText) {
        delete newDraft.initText
      }
      if (newDraft.currText) {
        delete newDraft.currText
      }

      await setContent({ variables: { id: draft?.id, ...newDraft } })
      setSaveStatus('saved')

      if (newDraft.summary && !hasValidSummary) {
        setHasValidSummary(true)
      }
    } catch (error) {
      setSaveStatus('saveFailed')

      if (newDraft.summary && hasValidSummary) {
        setHasValidSummary(false)
      }
    }
  }

  return (
    <Layout.Main
      aside={<Sidebar draft={draft} ownCircles={ownCircles} viewer={viewer} />}
      inEditor
    >
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <>
            <SaveStatus status={saveStatus} />
            {draft && (
              <SettingsButton
                draft={draft}
                ownCircles={ownCircles}
                publishable={!!publishable}
                viewer={viewer}
              />
            )}
          </>
        }
      />

      <Head
        title={{
          zh_hant: `[草稿] ${draft.title}`,
          zh_hans: `[草稿] ${draft.title}`,
          en: `[Draft] ${draft.title}`,
        }}
      />

      <PublishState draft={draft} />

      <Layout.Spacing>
        <Editor draft={draft} update={update} upload={upload} />
      </Layout.Spacing>

      {!isLargeUp && (
        <BottomBar draft={draft} ownCircles={ownCircles} viewer={viewer} />
      )}
    </Layout.Main>
  )
}

export default DraftDetail
