import { PATHS } from '~/common/enums'
import { Dialog, Translate, useDialogSwitch } from '~/components'

interface AskProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const Ask = ({ children }: AskProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(false)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header
          title="changeUserName"
          closeDialog={closeDialog}
          mode="inner"
        />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="您的 Matters ID 僅能永久修改一次，確定要繼續嗎？"
              zh_hans="您的 Matters ID 仅能永久修改一次，确定要继续吗？"
              en="Your Matters ID can only be changed once. Proceed?"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button href={PATHS.ME_SETTINGS_CHANGE_USERNAME}>
            <Translate id="confirm" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export default Ask
