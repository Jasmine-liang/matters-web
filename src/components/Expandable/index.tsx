import VisuallyHidden from '@reach/visually-hidden'
import React, { useEffect, useRef, useState } from 'react'

import { Button, IconExpand16, TextIcon, Translate } from '~/components'

import styles from './styles.css'

interface ExpandableProps {
  limit?: number
  buffer?: number
}

export const Expandable: React.FC<React.PropsWithChildren<ExpandableProps>> = ({
  children,
  limit = 3,
  buffer = 0,
}) => {
  const [expandable, setExpandable] = useState(false)
  const [expand, setExpand] = useState(true)

  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)

  useEffect(() => {
    if (node?.current) {
      const height = node.current.firstElementChild?.clientHeight || 0
      const lineHeight = window
        .getComputedStyle(node.current, null)
        .getPropertyValue('line-height')
      const lines = Math.max(Math.ceil(height / parseInt(lineHeight, 10)), 0)

      if (lines > limit + buffer) {
        setExpandable(true)
        setExpand(false)
      }
    }
  }, [])

  return (
    <section
      className="expandable"
      style={{
        WebkitLineClamp: expand ? 'unset' : limit,
      }}
    >
      <VisuallyHidden>
        <div>{children}</div>
      </VisuallyHidden>
      <div ref={node}>
        <div>{children}</div>
      </div>

      {expandable && !expand && (
        <Button
          spacing={['xxtight', 'xtight']}
          bgColor="grey-lighter"
          onClick={() => {
            setExpand(true)
          }}
        >
          <TextIcon icon={<IconExpand16 size="xs" />} color="grey">
            <Translate id="expand" />
          </TextIcon>
        </Button>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}
