import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { Translate } from '~/components'
import { CryptoWalletConnectedNoticeFragment } from '~/gql/graphql'

import NoticeDate from '../NoticeDate'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const CryptoWalletConnectedNotice = ({
  notice,
}: {
  notice: CryptoWalletConnectedNoticeFragment
}) => {
  return (
    <section
      className="container"
      data-test-id={TEST_ID.CRYPTO_WALLET_CONNECTED}
    >
      <section className="avatar-wrap">
        <NoticeTypeIcon type="volume" />
      </section>

      <section className="content-wrap">
        <p>
          <Translate
            zh_hant="你已完成以太坊錢包設定。你設定的地址："
            zh_hans="你已完成以太坊钱包设定。你设定的地址："
            en="You have successfully completed Ethereum wallet settings. Please confirm wallet address:"
          />
          <p className="highlight">{notice.target.address}</p>
        </p>
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CryptoWalletConnectedNotice.fragments = {
  notice: gql`
    fragment CryptoWalletConnectedNotice on CryptoNotice {
      __typename
      id
      unread
      type
      target {
        address
      }
      ...NoticeDate
    }
  `,
}

export default CryptoWalletConnectedNotice
