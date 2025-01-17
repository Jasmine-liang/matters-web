import { useContext } from 'react'

import IMAGE_BANNER from '@/public/static/images/migration-banner.svg'
import { translate } from '~/common/utils'
import { LanguageContext, ShareButton, TextIcon, Translate } from '~/components'

import styles from './styles.css'

const Banner = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <div className="l-container full">
      <div className="l-row">
        <div className="l-col-full">
          <section className="banner">
            <h4>
              <Translate
                zh_hant="搬家來 Matters，討論超有梗，寫字更賺錢。"
                zh_hans="搬家来 Matters，讨论超有梗，写字更赚钱。"
                en="Migrate to Matters, more inspiring discourses, and more income from writing."
              />
            </h4>
            <p>
              <Translate
                zh_hant="把這個消息分享給更多你支持的寫作者吧！"
                zh_hans="把这个消息分享给更多你支持的写作者吧！"
                en="Share this message to writers you support!"
              />
            </p>

            <ShareButton
              bgColor="green"
              hasIcon={false}
              size={['7rem', '2.5rem']}
              spacing={[0, 0]}
              inCard={false}
              title={translate({
                zh_hant: '我正在搬家到 Matters，邀請你一起來',
                zh_hans: '我正在搬家到 Matters，邀请你一起来',
                en: 'I am migrating to Matters, and I invite you to come along',
                lang,
              })}
            >
              <TextIcon color="white" size="sm" weight="md">
                <Translate
                  zh_hant="邀請朋友搬家"
                  zh_hans="邀请朋友搬家"
                  en="invite a friend to migrate"
                />
              </TextIcon>
            </ShareButton>

            <style jsx>{styles}</style>
            <style jsx>{`
              .banner {
                background-image: url(${IMAGE_BANNER});
              }
            `}</style>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Banner
