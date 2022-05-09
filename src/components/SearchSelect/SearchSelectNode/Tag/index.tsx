import classNames from 'classnames'

import { Card, Tag } from '~/components'

import styles from '../styles.css'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { DigestTagSearchResult } from '~/components/Tag/__generated__/DigestTagSearchResult'

interface SearchSelectTagProps {
  tag: DigestTag | DigestTagSearchResult
  selected?: boolean
  onClick: (tag: DigestTag | DigestTagSearchResult) => void
  inStagingArea?: boolean
}

const SearchSelectTag: React.FC<SearchSelectTagProps> = ({
  tag,
  selected,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    node: true,
    inline: inStagingArea,
    selectable: inStagingArea,
  })

  return (
    <>
      {inStagingArea ? (
        <>
          {selected && (
            <section className={nodeClass} onClick={() => onClick(tag)}>
              <Tag tag={tag} type="inline" hasClear disabled />
            </section>
          )}
        </>
      ) : (
        <Card spacing={['base', 'base']} onClick={() => onClick(tag)}>
          <section className={nodeClass}>
            <Tag tag={tag} type="list" hasCount disabled />

            {/* <span className="icon-select">
              {selected && (
                <IconChecked color="green" size="md-s" />
              )}
              {!selected && (
                <IconUnChecked color="grey-light" size="md-s" />
              )}
            </span> */}

            <style jsx>{styles}</style>
          </section>
        </Card>
      )}
    </>
  )
}

export default SearchSelectTag
