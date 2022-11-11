import { ArticleDigestDropdown, IconCollection24 } from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import { SetCollectionProps } from '~/components/Editor'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'

import Box from '../Box'
import styles from './styles.css'

import { SearchExclude } from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

export type SidebarCollectionProps = {
  disabled?: boolean
} & SetCollectionProps

const SidebarCollection = ({
  collection,
  editCollection,
  collectionSaving,
  disabled,
}: SidebarCollectionProps) => {
  return (
    <SearchSelectDialog
      title="collectArticle"
      hint="hintEditCollection"
      searchType="Article"
      searchExclude={SearchExclude.blocked}
      onSave={(nodes: SearchSelectNode[]) =>
        editCollection(nodes as ArticleDigestDropdownArticle[])
      }
      nodes={collection}
      saving={collectionSaving}
    >
      {({ openDialog }) => (
        <Box
          icon={<IconCollection24 size="md" />}
          title="collectArticle"
          onClick={openDialog}
          disabled={disabled}
        >
          {collection.length > 0 && (
            <ul>
              {collection.map((article) => (
                <li key={article.id}>
                  <ArticleDigestDropdown
                    article={article}
                    titleTextSize="sm"
                    spacing={['base', 'base']}
                    bgColor="none"
                    bgActiveColor="grey-lighter"
                  />
                </li>
              ))}

              <style jsx>{styles}</style>
            </ul>
          )}
        </Box>
      )}
    </SearchSelectDialog>
  )
}

export default SidebarCollection
