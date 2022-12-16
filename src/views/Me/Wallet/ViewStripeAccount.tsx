import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Form,
  IconExternalLink16,
  IconSpinner16,
  TextIcon,
  Translate,
} from '~/components'

import { GetStripeLoginUrl } from './__generated__/GetStripeLoginUrl'

const GET_STRIPE_LOGIN_URL = gql`
  query GetStripeLoginUrl {
    viewer {
      id
      wallet {
        stripeAccount {
          id
          loginUrl
        }
      }
    }
  }
`

const ViewStripeAccount = () => {
  const { data, loading } = useQuery<GetStripeLoginUrl>(GET_STRIPE_LOGIN_URL)
  const loginUrl = data?.viewer?.wallet.stripeAccount?.loginUrl

  return (
    <Form.List.Item
      title={
        <Translate
          zh_hant="管理 Stripe 賬戶"
          zh_hans="管理 Stripe 账户"
          en="Manage Stripe account"
        />
      }
      htmlHref={loginUrl}
      htmlTarget="_blank"
      right={
        loading ? (
          <IconSpinner16 color="grey" size="sm" />
        ) : (
          <TextIcon icon={<IconExternalLink16 color="grey" size="sm" />} />
        )
      }
      role="link"
    />
  )
}

export default ViewStripeAccount
