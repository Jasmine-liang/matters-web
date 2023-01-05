/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ArticleDigestFeedArticlePrivate
// ====================================================

export interface ArticleDigestFeedArticlePrivate_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
}

export interface ArticleDigestFeedArticlePrivate {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * Author of this article.
   */
  author: ArticleDigestFeedArticlePrivate_author;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
}
