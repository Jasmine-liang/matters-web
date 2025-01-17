import classNames from 'classnames'

import styles from './styles.css'

type SpacingX = 0 | 'base' | 'xloose'
type SpacingY = 0 | 'base' | 'xloose'

interface DialogContentProps {
  // Note: only apply in "sm-up" if the spacing is large than "base"
  spacing?: [SpacingY, SpacingX]
  hasFixed?: boolean
  hasGrow?: boolean
}

const DialogContent: React.FC<React.PropsWithChildren<DialogContentProps>> = ({
  spacing = [0, 0],
  hasFixed,
  hasGrow,

  children,
}) => {
  const contentClasses = classNames({
    content: true,
    'has-fixed': !!hasFixed,
    'has-grow': !!hasGrow,
    [`spacing-y-${spacing[0]}`]: true,
    [`spacing-x-${spacing[1]}`]: true,
  })

  return (
    <section className={contentClasses}>
      {children}

      <style jsx>{styles}</style>
    </section>
  )
}

export default DialogContent
