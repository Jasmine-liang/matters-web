import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { SetCoverProps } from '../SetCover'

const DynamicSetCover = dynamic(() => import('../SetCover'), {
  loading: Spinner,
})

type SetCoverDialogProps = SetCoverProps & {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseSetCoverDialog = ({ children, ...props }: SetCoverDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <DynamicSetCover onClose={closeDialog} {...props} />
      </Dialog>
    </>
  )
}

const SetCoverDialog = (props: SetCoverDialogProps) => (
  <Dialog.Lazy mounted={<BaseSetCoverDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default SetCoverDialog
