/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleState, UserState, BadgeType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CircleNewArticleNotice
// ====================================================

export interface CircleNewArticleNotice_article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface CircleNewArticleNotice_article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface CircleNewArticleNotice_article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface CircleNewArticleNotice_article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface CircleNewArticleNotice_article_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: CircleNewArticleNotice_article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: CircleNewArticleNotice_article_author_info_cryptoWallet | null;
}

export interface CircleNewArticleNotice_article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * Status of current user.
   */
  status: CircleNewArticleNotice_article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: CircleNewArticleNotice_article_author_liker;
  /**
   * User information.
   */
  info: CircleNewArticleNotice_article_author_info;
}

export interface CircleNewArticleNotice_article_access_circle {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Slugified name of this Circle.
   */
  name: string;
  /**
   * Human readable name of this Circle.
   */
  displayName: string;
}

export interface CircleNewArticleNotice_article_access {
  __typename: "ArticleAccess";
  circle: CircleNewArticleNotice_article_access_circle | null;
}

export interface CircleNewArticleNotice_article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * Article title.
   */
  title: string;
  /**
   * Slugified article title.
   */
  slug: string;
  /**
   * Media hash, composed of cid encoding, of this article.
   */
  mediaHash: string;
  /**
   * Article cover's link.
   */
  cover: string | null;
  /**
   * Author of this article.
   */
  author: CircleNewArticleNotice_article_author;
  /**
   * Access related fields on circle
   */
  access: CircleNewArticleNotice_article_access;
}

export interface CircleNewArticleNotice {
  __typename: "ArticleNotice";
  /**
   * Unique ID of this notice.
   */
  id: string;
  /**
   * Time of this notice was created.
   */
  createdAt: any;
  article: CircleNewArticleNotice_article;
}
