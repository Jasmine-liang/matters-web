import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect } from 'react'

import { Dialog, Spinner, Translate } from '~/components'
import { ViewerLikerIdQuery } from '~/gql/graphql'

interface Props {
  prevStep: () => void
  nextStep: () => void
  windowRef?: Window
}

const VIEWER_LIKER_ID = gql`
  query ViewerLikerId {
    viewer {
      id
      liker {
        likerId
      }
    }
  }
`

const Binding: React.FC<Props> = ({ prevStep, nextStep, windowRef }) => {
  const { data, error, startPolling, stopPolling } =
    useQuery<ViewerLikerIdQuery>(VIEWER_LIKER_ID, {
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined',
    })
  const likerId = data?.viewer?.liker.likerId

  useEffect(() => {
    startPolling(1000)

    return () => {
      stopPolling()
    }
  }, [])

  useEffect(() => {
    if (likerId) {
      nextStep()

      if (windowRef) {
        windowRef.close()
      }

      return
    }

    if (error) {
      stopPolling()
    }
  })

  return (
    <>
      <Dialog.Message type={error ? 'error' : undefined} spacing="md">
        {error ? (
          <h3>
            <Translate
              zh_hant="哎呀，設置失敗了。"
              zh_hans="哎呀，设置失败了。"
              en="Oops! Setup failed."
            />
          </h3>
        ) : (
          <>
            <Spinner />

            <p>
              <Translate
                zh_hant="請在新頁面完成綁定，不要關閉本窗口"
                zh_hans="请在新页面完成绑定，不要关闭本窗口"
                en="Processing... Don't leave the page."
              />
            </p>
          </>
        )}
      </Dialog.Message>

      <Dialog.Footer>
        <Dialog.Footer.Button disabled={!error} onClick={prevStep}>
          <Translate id="retry" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Binding
