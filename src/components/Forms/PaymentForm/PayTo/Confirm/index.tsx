import { useQuery } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import _pickBy from 'lodash/pickBy'
import { useContext, useEffect } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Spinner,
  Translate,
  useMutation,
} from '~/components'
import PAY_TO from '~/components/GQL/mutations/payTo'
import WALLET_BALANCE from '~/components/GQL/queries/walletBalance'

import { PAYMENT_CURRENCY as CURRENCY } from '~/common/enums'
import {
  formatAmount,
  parseFormSubmitErrors,
  validatePaymentPassword,
} from '~/common/utils'

import ConfirmTable from '../../ConfirmTable'
import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { PayTo as PayToMutate } from '~/components/GQL/mutations/__generated__/PayTo'
import { WalletBalance } from '~/components/GQL/queries/__generated__/WalletBalance'

interface FormProps {
  amount: number
  currency: CURRENCY
  recipient: UserDonationRecipient
  targetId: string
  submitCallback: () => void
  switchToResetPassword: () => void
}

interface FormValues {
  password: string
}

const Confirm: React.FC<FormProps> = ({
  amount,
  currency,
  recipient,
  targetId,
  submitCallback,
  switchToResetPassword,
}) => {
  const formId = 'pay-to-confirm-form'

  const { lang } = useContext(LanguageContext)
  const [payTo] = useMutation<PayToMutate>(PAY_TO, undefined, {
    showToast: false,
  })

  const { data, loading } = useQuery<WalletBalance>(WALLET_BALANCE, {
    fetchPolicy: 'network-only',
  })

  const {
    errors,
    handleSubmit,
    isValid,
    isSubmitting,
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
        submitCallback()
      } catch (error) {
        setSubmitting(false)
        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('password', messages[codes[0]])
        setFieldValue('password', '', false)
      }
    },
  })

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit} noBackground>
      <Form.PinInput
        length={6}
        name="password"
        value={values.password}
        error={touched.password && errors.password}
        hint={<Translate id="hintPaymentPassword" />}
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

  const balance = data?.viewer?.wallet.balance.HKD || 0
  const isWalletInsufficient = balance < amount

  if (isSubmitting || loading) {
    return (
      <Dialog.Content hasGrow>
        <Spinner />
      </Dialog.Content>
    )
  }

  return (
    <>
      <Dialog.Content hasGrow>
        <section>
          <section className="info">
            <h4 className="to">
              <Translate zh_hant="給" zh_hans="给" en="to" />{' '}
              {recipient.displayName}
            </h4>

            <p className="amount">
              <b>
                {currency} {amount}
              </b>
            </p>
          </section>

          <ConfirmTable>
            <ConfirmTable.Row type="breaker" />

            <ConfirmTable.Row
              type={isWalletInsufficient ? 'insufficient' : 'balance'}
            >
              <ConfirmTable.Col>
                <Translate id="walletBalance" />
              </ConfirmTable.Col>

              <ConfirmTable.Col>
                {currency} {formatAmount(balance)}
              </ConfirmTable.Col>
            </ConfirmTable.Row>
          </ConfirmTable>

          {!isWalletInsufficient && InnerForm}

          <style jsx>{styles}</style>
        </section>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          bgColor="white"
          textColor="grey"
          onClick={switchToResetPassword}
        >
          <Translate id="forgetPassword" />？
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Confirm
