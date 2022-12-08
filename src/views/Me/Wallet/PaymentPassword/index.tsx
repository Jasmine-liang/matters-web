import {
  DropdownDialog,
  Form,
  IconUnlock24,
  Menu,
  ResetPaymentPasswordDialog,
  TextIcon,
  Translate,
} from '~/components'

interface PaymentPasswordProps {
  openResetPaymentPasswordDialog: () => void
}

const BasePaymentPassword: React.FC<PaymentPasswordProps> = ({
  openResetPaymentPasswordDialog,
}) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openResetPaymentPasswordDialog} ariaHasPopup="dialog">
        <TextIcon icon={<IconUnlock24 size="md" />} size="md" spacing="base">
          <Translate id="resetPaymentPassword" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ openDialog, type, ref }) => (
        <Form.List.Item
          title={
            <Translate
              zh_hant="管理交易密碼"
              zh_hans="管理交易密码"
              en="Payment Password"
            />
          }
          onClick={openDialog}
          ariaRole="button"
          ariaHasPopup={type}
          ref={ref}
        />
      )}
    </DropdownDialog>
  )
}

const PaymentPassword = () => (
  <ResetPaymentPasswordDialog>
    {({ openDialog: openResetPaymentPasswordDialog }) => (
      <BasePaymentPassword
        openResetPaymentPasswordDialog={openResetPaymentPasswordDialog}
      />
    )}
  </ResetPaymentPasswordDialog>
)

export default PaymentPassword
