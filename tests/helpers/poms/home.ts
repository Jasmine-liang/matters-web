import { Locator, Page } from '@playwright/test'

import { TEST_ID } from '~/common/enums'

import { waitForAPIResponse } from '../api'

export class HomePage {
  readonly page: Page

  readonly tabTrending: Locator
  readonly tabLatest: Locator

  feedArticles: Locator
  sidebarTags: Locator
  sidebarUsers: Locator

  constructor(page: Page) {
    this.page = page

    this.tabTrending = page.getByRole('tab').filter({ hasText: 'Trending' })
    this.tabLatest = page.getByRole('tab').filter({ hasText: 'Latest' })

    this.feedArticles = page.getByTestId(TEST_ID.DIGEST_ARTICLE_FEED)
    this.sidebarTags = page.getByTestId(TEST_ID.DIGEST_TAG_SIDEBAR)
    this.sidebarUsers = page.getByTestId(TEST_ID.DIGEST_USER_RICH)
  }

  async goto() {
    await this.page.goto('/')
  }

  async shuffleSidebarTags() {
    await this.page.getByRole('button', { name: 'Shuffle' }).first().click()

    await waitForAPIResponse({
      page: this.page,
      path: 'data.viewer.recommendation.tags',
    })
  }

  async shuffleSidebarUsers() {
    await this.page.getByRole('button', { name: 'Shuffle' }).last().click()

    await waitForAPIResponse({
      page: this.page,
      path: 'data.viewer.recommendation.authors',
    })
  }
}
