import { useState } from 'react'

import { TEST_ID } from '~/common/enums'
import contentCommentStyles from '~/common/styles/utils/content.comment.css'
import { captureClicks } from '~/common/utils'
import { Button, IconExpand16, TextIcon, Translate } from '~/components'

import styles from './styles.css'

interface CollapsedProps {
  content?: string | null
  collapsedContent: React.ReactNode | string
  className: string
}

const Collapsed = ({
  content,
  collapsedContent,
  className,
}: CollapsedProps) => {
  const [collapsed, setCollapsed] = useState(true)

  if (!collapsed) {
    return (
      <>
        <div
          className={`${className} u-content-comment`}
          dangerouslySetInnerHTML={{
            __html: content || '',
          }}
          onClick={captureClicks}
          data-test-id={TEST_ID.COMMENT_CONETNT}
        />

        <style jsx>{styles}</style>
        <style jsx>{contentCommentStyles}</style>
      </>
    )
  }

  return (
    <p className={`${className} u-content-comment inactive`}>
      <span>{collapsedContent}</span>

      {collapsed && (
        <Button
          spacing={['xxtight', 'xtight']}
          bgActiveColor="grey-lighter"
          onClick={() => {
            setCollapsed(false)
          }}
        >
          <TextIcon
            icon={<IconExpand16 size="xs" />}
            textPlacement="left"
            weight="normal"
            color="grey"
          >
            <Translate zh_hant="打開" zh_hans="展开" en="Expand" />
          </TextIcon>
        </Button>
      )}

      <style jsx>{styles}</style>
    </p>
  )
}

export default Collapsed
