import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'
import { Mutation } from 'react-apollo'

import { Button, Icon, LanguageContext, Translate } from '~/components'

import { toPath, translate } from '~/common/utils'
import ICON_WRITE from '~/static/icons/write.svg?sprite'

import { PutDraft } from './__generated__/PutDraft'

export const PUT_DRAFT = gql`
  mutation PutDraft($title: String!) {
    putDraft(input: { title: $title }) {
      id
      slug
    }
  }
`

const WriteButton = () => {
  const { lang } = useContext(LanguageContext)
  const placeholder = translate({ zh_hans: '未命名', zh_hant: '未命名', lang })
  return (
    <Mutation mutation={PUT_DRAFT} variables={{ title: placeholder }}>
      {putDraft => {
        return (
          <div
            onClick={() => {
              putDraft().then(result => {
                const { data } = result as { data: PutDraft }
                const { slug, id } = data.putDraft
                const path = toPath({ page: 'draftDetail', slug, id })
                Router.push(path.as)
              })
            }}
          >
            <Button
              className="u-sm-down-hide"
              size="large"
              bgColor="gold"
              icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
            >
              <Translate zh_hant="創作" zh_hans="创作" />
            </Button>
            <Button
              className="u-sm-up-hide"
              bgColor="gold"
              shape="circle"
              icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
            />
          </div>
        )
      }}
    </Mutation>
  )
}

export default WriteButton
