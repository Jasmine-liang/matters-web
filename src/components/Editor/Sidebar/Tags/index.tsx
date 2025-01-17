import { analytics } from '~/common/utils'
import {
  IconHashTag24,
  SearchSelectDialog,
  // SearchSelectNode,
  Tag,
} from '~/components'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import { DigestTagFragment } from '~/gql/graphql'

import TagCustomStagingArea from '../../TagCustomStagingArea'
import Box from '../Box'
import styles from './styles.css'

export interface SidebarTagsProps {
  tags: DigestTagFragment[]
  editTags: (tag: DigestTagFragment[]) => any
  saving?: boolean
  disabled?: boolean
}

const SidebarTags = ({
  tags,
  editTags,
  saving,
  disabled,
}: SidebarTagsProps) => {
  return (
    <SearchSelectDialog
      size="sm"
      title="addTag"
      hint="hintAddTag"
      searchType="Tag"
      onSave={(nodes: SearchSelectNode[]) =>
        editTags(nodes as DigestTagFragment[])
      }
      nodes={tags}
      saving={saving}
      createTag
      CustomStagingArea={TagCustomStagingArea}
    >
      {({ openDialog }) => (
        <Box
          icon={<IconHashTag24 size="md" />}
          title="addTag"
          subtitle="hintAddTagShort"
          onClick={openDialog}
          disabled={disabled}
        >
          {tags.length > 0 && (
            <ul>
              {tags.map((tag) => (
                <li key={tag.id}>
                  <Tag
                    tag={tag}
                    type="inline"
                    disabled
                    hasClose
                    removeTag={() => {
                      editTags(tags.filter((t) => t.content !== tag.content))
                      analytics.trackEvent('click_button', {
                        type: 'remove_tag',
                        pageType: 'edit_draft',
                      })
                    }}
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

export default SidebarTags
