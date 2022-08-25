import {
  CardSpacing,
  IconHelp24,
  IconLogout24,
  IconSettings24,
  Menu,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'

import { ADD_TOAST, PATHS, STORAGE_KEY_AUTH_TOKEN } from '~/common/enums'
import { redirectToTarget, storage } from '~/common/utils'

import { UserLogout } from '~/components/GQL/mutations/__generated__/UserLogout'

interface NavMenuBottomProps {
  isInSideDrawerNav?: boolean
}

const NavMenuBottom: React.FC<NavMenuBottomProps> = ({ isInSideDrawerNav }) => {
  const [logout] = useMutation<UserLogout>(USER_LOGOUT, undefined, {
    showToast: false,
  })
  const onClickLogout = async () => {
    try {
      await logout().then(() => {
        storage.remove(STORAGE_KEY_AUTH_TOKEN)
      })

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: <Translate id="successLogout" />,
          },
        })
      )

      // await clearPersistCache()

      redirectToTarget()
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="failureLogout" />,
          },
        })
      )
    }
  }

  const menuItemSpacing = isInSideDrawerNav
    ? (['base', 'loose'] as [CardSpacing, CardSpacing])
    : undefined
  const menuItemSize = isInSideDrawerNav ? 'xm' : 'md'

  return (
    <Menu spacingY={isInSideDrawerNav ? 0 : undefined}>
      <Menu.Item spacing={menuItemSpacing} href={PATHS.HELP}>
        <TextIcon
          icon={<IconHelp24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="helpCenter" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} href={PATHS.ME_SETTINGS}>
        <TextIcon
          icon={<IconSettings24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="settings" />
        </TextIcon>
      </Menu.Item>

      <Menu.Item spacing={menuItemSpacing} onClick={onClickLogout}>
        <TextIcon
          icon={<IconLogout24 size="md" />}
          spacing="base"
          size={menuItemSize}
        >
          <Translate id="logout" />
        </TextIcon>
      </Menu.Item>
    </Menu>
  )
}

export default NavMenuBottom
