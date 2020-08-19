import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'

import { Dialog, Form, LanguageContext, Spinner, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import PAY_TO from '~/components/GQL/mutations/payTo'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import {
  parseFormSubmitErrors,
  toAmountString,
  validatePaymentPassword,
} from '~/common/utils'

import ConfirmTable from '../ConfirmTable'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import {
  PayTo as PayToMutate,
  PayTo_payTo as PayToResult,
} from '~/components/GQL/mutations/__generated__/PayTo'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

interface FormProps {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
  submitCallback: (
    values: Omit<PayToResult, '__typename' | 'redirectUrl'>
  ) => void
  switchToAddCredit: () => void
  switchToLike: () => void
  targetId: string
}

interface FormValues {
  password: string
}

const Confirm: React.FC<FormProps> = ({
  amount,
  currency,
  recipient,
  submitCallback,
  switchToAddCredit,
  switchToLike,
  targetId,
}) => {
  const formId = 'pay-to-confirm-form'

  const { lang } = useContext(LanguageContext)
  const [payTo] = useMutation<PayToMutate>(PAY_TO)

  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'no-cache',
  })

  const {
    errors,
    handleSubmit,
    isValid,
    setFieldValue,
    setTouched,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues: {
      password: '',
    },
    validate: ({ password }) =>
      _pickBy({
        password: validatePaymentPassword(password, lang),
      }),
    onSubmit: async ({ password }, { setFieldError, setSubmitting }) => {
      try {
        const result = await payTo({
          variables: {
            amount,
            currency,
            password,
            purpose: 'donation',
            recipientId: recipient.id,
            targetId,
          },
        })

        const transaction = result?.data?.payTo.transaction
        if (!transaction) {
          throw new Error()
        }
        setSubmitting(false)
        submitCallback({ transaction })
      } catch (error) {
        setSubmitting(false)
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('password', messages[codes[0]])

        if (codes[0] === 'USER_PASSWORD_INVALID') {
          // TODO
        }
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <Form.PinInput
        length={6}
        name="password"
        error={touched.password && errors.password}
        onChange={(value) => {
          const shouldValidate = value.length === 6
          setTouched({ password: true }, shouldValidate)
          setFieldValue('password', value, shouldValidate)
        }}
      />
    </Form>
  )

  useEffect(() => {
    if (isValid && values.password) {
      handleSubmit()
    }
  }, [isValid])

  if (loading) {
    return <Spinner />
  }

  const balance = data?.viewer?.wallet.balance.HKD || 0
  const isWalletInsufficient = balance < amount

  return (
    <Dialog.Content hasGrow>
      <ConfirmTable>
        <ConfirmTable.Row total>
          <ConfirmTable.Col>
            <Translate zh_hant="支付" zh_hans="支付" />
          </ConfirmTable.Col>

          <ConfirmTable.Col>
            {currency} {toAmountString(amount)}
          </ConfirmTable.Col>
        </ConfirmTable.Row>

        <ConfirmTable.Row breaker />

        <ConfirmTable.Row insufficient={isWalletInsufficient}>
          <ConfirmTable.Col>
            <b>
              <Translate id="walletBalance" />
            </b>
          </ConfirmTable.Col>

          <ConfirmTable.Col>
            <b>
              {currency} {toAmountString(balance)}
            </b>
          </ConfirmTable.Col>
        </ConfirmTable.Row>
      </ConfirmTable>

      {!isWalletInsufficient && InnerForm}
    </Dialog.Content>
  )
}

export default Confirm
