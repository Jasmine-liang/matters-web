import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import {
  Head,
  IconDonateBg24,
  Layout,
  List,
  QueryError,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'

import { ReactComponent as AnalyticsNoSupporter } from '@/public/static/images/analytics-no-supporter.svg'

import EmptyAnalytics from './EmptyAnalytics'
import SelectPeriod from './SelectPeriod'
import styles from './styles.css'
import SupporterDigestFeed from './SupporterDigestFeed/index'

import { MeAnalytics } from './__generated__/MeAnalytics'

const ME_ANALYTICS = gql`
  query MeAnalytics($after: String, $filter: TopDonatorFilter) {
    viewer {
      id
      articles(input: { first: 0, after: $after }) {
        totalCount
      }
      analytics {
        topDonators(input: { first: 10, after: $after, filter: $filter }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              displayName
              avatar
              userName
            }
            donationCount
          }
        }
      }
    }
  }
`
const BaseAnalytics = () => {
  const [period, setPeriod] = useState<number>(0)

  const [now] = useState(Date.now())

  const rangeStart =
    period === 0
      ? null
      : new Date(now - period * 24 * 60 * 60 * 100).toISOString()
  const rangeEnd = rangeStart === null ? null : new Date(now).toISOString()

  const { data, loading, error } = useQuery<MeAnalytics>(ME_ANALYTICS, {
    variables: {
      filter: {
        inRangeStart: rangeStart,
        inRangeEnd: rangeEnd,
      },
    },
  })

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const edges = data?.viewer?.analytics.topDonators.edges
  const articleCount = data?.viewer?.articles.totalCount || 0

  if (articleCount === 0) {
    return <EmptyAnalytics />
  }

  return (
    <section className="container">
      <section className="title">
        <TextIcon
          icon={<IconDonateBg24 size="md" />}
          weight="md"
          color="black"
          size="md"
        >
          <Translate id="supporterRankingList" />
        </TextIcon>
        <section className="filter">
          <SelectPeriod period={period} onChange={setPeriod} />
        </section>
      </section>
      {edges?.length === 0 && (
        <>
          <p>
            <Translate id="analyticsNoSupporter" />
          </p>
          <section className="no-supporter">
            <section className="no-supporter-img">
              <AnalyticsNoSupporter />
            </section>
          </section>
        </>
      )}
      <List>
        {edges?.map(({ node, cursor, donationCount }, i) => (
          <List.Item key={cursor}>
            <SupporterDigestFeed
              user={node}
              index={i}
              donationCount={donationCount}
            />
          </List.Item>
        ))}
      </List>
      <style jsx>{styles}</style>
    </section>
  )
}

const MyAnalytics = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="myAnalytics" />}
    />
    <Head title={{ id: 'myAnalytics' }} />
    <BaseAnalytics />
  </Layout.Main>
)

export default MyAnalytics
