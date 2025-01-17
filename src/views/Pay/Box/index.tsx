import { Avatar } from '~/components/Avatar'

import styles from './styles.css'

interface Props {
  avatar?: string
  title?: React.ReactNode | string
  titleAlign?: 'left' | 'center'
}

export const Box: React.FC<React.PropsWithChildren<Props>> = ({
  avatar,
  title,
  titleAlign = 'center',
  children,
}) => {
  return (
    <section className="container">
      <header>
        <Avatar size="xxxl" src={avatar} />
        <h1 className={titleAlign}>{title}</h1>
      </header>

      {children}

      <style jsx>{styles}</style>
    </section>
  )
}
