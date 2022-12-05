import contentHash from '@ensdomains/content-hash'
import { namehash } from 'ethers/lib/utils'
import { useContext, useEffect } from 'react'
import { useAccount, useContract, useEnsName, useSigner } from 'wagmi'

// @ts-ignore

import {
  Avatar,
  Button,
  Cover,
  Error,
  Expandable,
  FollowUserButton,
  IconRss32,
  Layout,
  RssFeedDialog,
  Spinner,
  Throw404,
  Tooltip,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import ShareButton from '~/components/Layout/Header/ShareButton'

import { ADD_TOAST } from '~/common/enums'

import { numAbbr, PublicResolverABI } from '~/common/utils'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'

import {
  ArchitectBadge,
  CivicLikerBadge,
  GoldenMotorBadge,
  SeedBadge,
  TraveloggersBadge,
} from './Badges'
import CircleWidget from './CircleWidget'
import DropdownActions from './DropdownActions'
import { FollowersDialog } from './FollowersDialog'
import { FollowingDialog } from './FollowingDialog'
import { USER_PROFILE_PRIVATE, USER_PROFILE_PUBLIC } from './gql'
import { LogbookDialog } from './LogbookDialog'
import styles from './styles.css'
import WalletAddress from './WalletAddress'

import { AuthorRssFeed } from '~/components/Dialogs/RssFeedDialog/__generated__/AuthorRssFeed'
import { UserProfileUserPublic } from './__generated__/UserProfileUserPublic'

interface FingerprintButtonProps {
  user: AuthorRssFeed
}

const RssFeedButton = ({ user }: FingerprintButtonProps) => {
  return (
    <RssFeedDialog user={user}>
      {({ openDialog }) => (
        <Button onClick={openDialog} spacing={['xxtight', 'xtight']}>
          <IconRss32 color="green" size="lg" />
        </Button>
      )}
    </RssFeedDialog>
  )
}

export const UserProfile = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const { address } = useAccount()
  const { data: ensName } = useEnsName({
    address,
  })

  const { data: signer } = useSigner()

  // ENS related hooks
  const eip1577 = useContract({
    // address: '0xD3ddcCDD3b25A8a7423B5bEe360a42146eb4Baf3', // mainnet  https://etherscan.io/address/0xd3ddccdd3b25a8a7423b5bee360a42146eb4baf3#code
    address: '0xE264d5bb84bA3b8061ADC38D3D76e6674aB91852', // goerli https://goerli.etherscan.io/address/0xE264d5bb84bA3b8061ADC38D3D76e6674aB91852#code
    abi: PublicResolverABI,
    signerOrProvider: signer,
  })

  // public user data
  const userName = getQuery('name')
  const isMe = !userName || viewer.userName === userName
  const { data, loading, client } = usePublicQuery<UserProfileUserPublic>(
    USER_PROFILE_PUBLIC,
    {
      variables: { userName },
    }
  )
  const user = data?.user
  // fetch private data
  useEffect(() => {
    if (!viewer.isAuthed || !user) {
      return
    }

    client.query({
      query: USER_PROFILE_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { userName },
    })
  }, [user?.id, viewer.id])

  const bindEnsIpns = async () => {
    if (!eip1577 || !ensName) {
      return
    }
    const ipnsHash = user?.info.ipnsKey
    const ensNameHash = namehash(ensName as string)
    const encoded = '0x' + contentHash.encode('ipns-ns', ipnsHash)
    try {
      const tx = await eip1577?.setContenthash(ensNameHash, encoded)
      await tx.wait()
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate zh_hans="设置失败" zh_hant="設置失敗" />,
          },
        })
      )
    }
  }
  /**
   * Render
   */
  const LayoutHeader = () => (
    <Layout.Header
      left={<Layout.Header.BackButton mode="black-solid" />}
      right={
        <>
          <span />
          {user && (
            <section className="buttons">
              <ShareButton
                tags={
                  [user.displayName, user.userName].filter(Boolean) as string[]
                }
              />
              <DropdownActions user={user} isMe={isMe} />
              <style jsx>{styles}</style>
            </section>
          )}
        </>
      }
      mode="transparent-absolute"
    />
  )

  if (loading) {
    return (
      <>
        <LayoutHeader />
        <Spinner />
      </>
    )
  }

  if (!user) {
    return (
      <>
        <LayoutHeader />
        <Throw404 />
      </>
    )
  }

  if (user?.status?.state === 'archived') {
    return (
      <>
        <LayoutHeader />
        <Error
          statusCode={404}
          message={
            <Translate
              zh_hant="此帳戶因為違反社區約章而被註銷"
              zh_hans="此帐户因为违反社区约章而被注销"
              en="This account is archived due to violation of community guidelines"
            />
          }
        />
      </>
    )
  }

  const badges = user.info.badges || []
  const circles = user.ownCircles || []
  const hasSeedBadge = badges.some((b) => b.type === 'seed')
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const hasGoldenMotorBadge = badges.some((b) => b.type === 'golden_motor')
  const hasTraveloggersBadge = !!user.info.cryptoWallet?.hasNFTs

  const profileCover = user.info.profileCover || ''
  const userState = user.status?.state as string
  const isCivicLiker = user.liker.civicLiker
  const isUserArchived = userState === 'archived'
  const isUserBanned = userState === 'banned'
  const isUserInactive = isUserArchived || isUserBanned

  /**
   * Inactive User
   */
  if (isUserInactive) {
    return (
      <>
        <LayoutHeader />
        <section className="user-profile">
          <Cover fallbackCover={IMAGE_COVER.src} />

          <header>
            <section className="avatar">
              <Avatar size="xxxl" />
            </section>
          </header>

          <section className="info">
            <section className="display-name">
              <h1 className="name">
                {isUserArchived && <Translate id="accountArchived" />}
                {isUserBanned && <Translate id="accountBanned" />}
              </h1>
            </section>
          </section>

          <style jsx>{styles}</style>
        </section>
      </>
    )
  }

  const isOwner =
    user.info.cryptoWallet?.address === viewer.info.cryptoWallet?.address

  /**
   * Active or Onboarding User
   */
  return (
    <>
      <LayoutHeader />

      <section className="user-profile">
        <Cover cover={profileCover} fallbackCover={IMAGE_COVER.src} />

        <header>
          <section className="avatar">
            {hasTraveloggersBadge ? (
              <Tooltip
                content={
                  <Translate
                    zh_hant={`查看 ${user.displayName} 的航行日誌`}
                    zh_hans={`查看 ${user.displayName} 的航行日志`}
                    en={`View Logbooks owned by ${user.displayName}`}
                  />
                }
              >
                <LogbookDialog
                  title={
                    <Translate
                      en={
                        isOwner ? 'My Logbook' : `${user.displayName}'s Logbook`
                      }
                      zh_hant={
                        isOwner
                          ? '我的 Logbook'
                          : `${user.displayName} 的航行日誌`
                      }
                      zh_hans={
                        isOwner
                          ? '我的 Logbook'
                          : `${user.displayName} 的航行日志`
                      }
                    />
                  }
                  address={user.info.cryptoWallet?.address as string}
                >
                  {({ openDialog }) => (
                    <button type="button" onClick={openDialog}>
                      <Avatar size="xxxl" user={user} inProfile />
                    </button>
                  )}
                </LogbookDialog>
              </Tooltip>
            ) : (
              <Avatar size="xxxl" user={user} inProfile />
            )}
          </section>

          <section className="right">
            {!isMe && <FollowUserButton user={user} size="lg" />}

            {user?.articles.totalCount > 0 && user?.info.ipnsKey && (
              <RssFeedButton user={user} />
            )}
            <Button
              size={[null, '1.25rem']}
              spacing={[0, 'xtight']}
              borderColor={'green'}
              onClick={bindEnsIpns}
            >
              ENS: {ensName}, 点击綁定 IPNS 吧！
            </Button>
          </section>
        </header>

        <section className="info">
          <section className="display-name">
            <h1 className="name">{user.displayName}</h1>
            {hasTraveloggersBadge && <TraveloggersBadge />}
            {hasSeedBadge && <SeedBadge />}
            {hasGoldenMotorBadge && <GoldenMotorBadge />}
            {hasArchitectBadge && <ArchitectBadge />}
            {isCivicLiker && <CivicLikerBadge />}
          </section>

          <section className="username">
            <span className="name">@{user.userName}</span>
            {!isMe && <FollowUserButton.State user={user} />}
          </section>

          {user.info.ethAddress && (
            <WalletAddress address={user.info.ethAddress} />
          )}

          <Expandable
            content={user.info.description}
            color="grey-darker"
            spacingTop="base"
            size="md"
          >
            <p className="description">{user.info.description}</p>
          </Expandable>
        </section>

        <footer>
          <FollowersDialog user={user}>
            {({ openDialog: openFollowersDialog }) => (
              <button type="button" onClick={openFollowersDialog}>
                <span className="count">
                  {numAbbr(user.followers.totalCount)}
                </span>
                <Translate id="follower" />
              </button>
            )}
          </FollowersDialog>

          <FollowingDialog user={user}>
            {({ openDialog: openFollowingDialog }) => (
              <button type="button" onClick={openFollowingDialog}>
                <span className="count">
                  {numAbbr(user.following.users.totalCount)}
                </span>
                <Translate id="following" />
              </button>
            )}
          </FollowingDialog>
        </footer>

        <CircleWidget circles={circles} isMe={isMe} />

        <style jsx>{styles}</style>
      </section>
    </>
  )
}

export default UserProfile
