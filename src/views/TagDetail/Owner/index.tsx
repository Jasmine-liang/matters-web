import { useContext } from 'react'

import { ADD_TOAST } from '~/common/enums'
import {
  Button,
  IconAvatarEmpty24,
  TagAdoptionDialog,
  TextIcon,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'
import { TagFragmentFragment } from '~/gql/graphql'

import styles from './styles.css'

const Owner = ({ tag }: { tag: TagFragmentFragment }) => {
  const viewer = useContext(ViewerContext)

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id="FORBIDDEN_BY_STATE" />,
        },
      })
    )
  }

  if (!tag) {
    return null
  }

  if (!tag.owner) {
    return (
      <section className="container">
        <section className="left">
          <TextIcon
            icon={<IconAvatarEmpty24 size="md" />}
            color="grey-dark"
            size="md-s"
            spacing="xtight"
          >
            <Translate
              zh_hant="此標籤目前無人主理"
              zh_hans="此标签目前無人主理"
              en="This tag has no manager currently"
            />
          </TextIcon>
        </section>
        <section className="right">
          <TagAdoptionDialog id={tag.id}>
            {({ openDialog }) => (
              <Button
                spacing={['xtight', 'tight']}
                textColor="green"
                textActiveColor="white"
                bgActiveColor="green"
                borderColor="green"
                onClick={viewer.isFrozen ? forbid : openDialog}
                aria-haspopup="dialog"
              >
                <TextIcon weight="md" size="xs">
                  <Translate zh_hant="認領" zh_hans="认领" en="Maintain" />
                </TextIcon>
              </Button>
            )}
          </TagAdoptionDialog>
        </section>
        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="container">
      <section className="left">
        <UserDigest.Mini
          user={tag.owner}
          avatarSize="md"
          hasAvatar
          hasDisplayName
        />

        <TextIcon size="sm" color="grey-dark">
          <Translate zh_hant="主理" zh_hans="主理" en="maintainer" />
        </TextIcon>
      </section>
      <section className="right">{/* editos */}</section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Owner
