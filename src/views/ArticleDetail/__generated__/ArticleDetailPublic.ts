/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLanguage, ArticleState, UserState, BadgeType, ArticleAccessType, TransactionCurrency, InvitationState, ArticleLicenseType, PublishState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ArticleDetailPublic
// ====================================================

export interface ArticleDetailPublic_article_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleDetailPublic_article_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleDetailPublic_article_author_info {
  __typename: "UserInfo";
  /**
   * User desciption.
   */
  description: string | null;
  /**
   * User badges.
   */
  badges: ArticleDetailPublic_article_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleDetailPublic_article_author_info_cryptoWallet | null;
  /**
   * Login address
   */
  ethAddress: string | null;
}

export interface ArticleDetailPublic_article_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleDetailPublic_article_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
  /**
   * Liker ID of LikeCoin
   */
  likerId: string | null;
}

export interface ArticleDetailPublic_article_author {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * Payment pointer that resolves to Open Payments endpoints
   */
  paymentPointer: string | null;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
  /**
   * User information.
   */
  info: ArticleDetailPublic_article_author_info;
  /**
   * Status of current user.
   */
  status: ArticleDetailPublic_article_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleDetailPublic_article_author_liker;
  /**
   * Whether current user is following viewer.
   */
  isFollower: boolean;
  /**
   * Whether viewer is following current user.
   */
  isFollowee: boolean;
  /**
   * Whether current user is blocked by viewer.
   */
  isBlocked: boolean;
  /**
   * Whether current user is blocking viewer.
   */
  isBlocking: boolean;
}

export interface ArticleDetailPublic_article_collection {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface ArticleDetailPublic_article_access_circle_owner_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleDetailPublic_article_access_circle_owner_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleDetailPublic_article_access_circle_owner_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleDetailPublic_article_access_circle_owner_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleDetailPublic_article_access_circle_owner_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleDetailPublic_article_access_circle_owner_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleDetailPublic_article_access_circle_owner_info_cryptoWallet | null;
}

export interface ArticleDetailPublic_article_access_circle_owner {
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
  status: ArticleDetailPublic_article_access_circle_owner_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleDetailPublic_article_access_circle_owner_liker;
  /**
   * User information.
   */
  info: ArticleDetailPublic_article_access_circle_owner_info;
}

export interface ArticleDetailPublic_article_access_circle_members {
  __typename: "MemberConnection";
  totalCount: number;
}

export interface ArticleDetailPublic_article_access_circle_works {
  __typename: "ArticleConnection";
  totalCount: number;
}

export interface ArticleDetailPublic_article_access_circle_prices {
  __typename: "Price";
  /**
   * Amount of Price.
   */
  amount: number;
  /**
   * Currency of Price.
   */
  currency: TransactionCurrency;
}

export interface ArticleDetailPublic_article_access_circle_invitedBy {
  __typename: "Invitation";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * Determine it's specific state.
   */
  state: InvitationState;
  /**
   * Free period of this invitation.
   */
  freePeriod: number;
}

export interface ArticleDetailPublic_article_access_circle {
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
  /**
   * A short description of this Circle.
   */
  description: string | null;
  /**
   * Circle owner.
   */
  owner: ArticleDetailPublic_article_access_circle_owner;
  /**
   * Circle avatar's link.
   */
  avatar: string | null;
  /**
   * List of Circle member.
   */
  members: ArticleDetailPublic_article_access_circle_members;
  /**
   * List of works belong to this Circle.
   */
  works: ArticleDetailPublic_article_access_circle_works;
  /**
   * Prices offered by this Circle.
   */
  prices: ArticleDetailPublic_article_access_circle_prices[] | null;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: ArticleDetailPublic_article_access_circle_invitedBy | null;
}

export interface ArticleDetailPublic_article_access {
  __typename: "ArticleAccess";
  type: ArticleAccessType;
  circle: ArticleDetailPublic_article_access_circle | null;
}

export interface ArticleDetailPublic_article_drafts {
  __typename: "Draft";
  /**
   * Unique ID of this draft.
   */
  id: string;
  /**
   * Media hash, composed of cid encoding, of this draft.
   */
  mediaHash: string | null;
  /**
   * State of draft during publihsing.
   */
  publishState: PublishState;
  /**
   * whether publish to ISCN
   */
  iscnPublish: boolean | null;
}

export interface ArticleDetailPublic_article_translation {
  __typename: "ArticleTranslation";
  content: string | null;
  title: string | null;
  summary: string | null;
  language: string | null;
}

export interface ArticleDetailPublic_article_tags_creator {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ArticleDetailPublic_article_tags_editors {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
}

export interface ArticleDetailPublic_article_tags {
  __typename: "Tag";
  /**
   * Unique id of this tag.
   */
  id: string;
  /**
   * Content of this tag.
   */
  content: string;
  /**
   * Counts of this tag.
   */
  numArticles: number;
  numAuthors: number;
  /**
   * Creator of this tag.
   */
  creator: ArticleDetailPublic_article_tags_creator | null;
  /**
   * Editors of this tag.
   */
  editors: ArticleDetailPublic_article_tags_editors[] | null;
}

export interface ArticleDetailPublic_article_relatedArticles_edges_node_author_status {
  __typename: "UserStatus";
  /**
   * User state.
   */
  state: UserState;
}

export interface ArticleDetailPublic_article_relatedArticles_edges_node_author_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleDetailPublic_article_relatedArticles_edges_node_author_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleDetailPublic_article_relatedArticles_edges_node_author_info_cryptoWallet {
  __typename: "CryptoWallet";
  id: string;
  address: string;
  /**
   *  does this address own any Travelogger NFTs? this value is cached at most 1day, and refreshed at next `nfts` query 
   */
  hasNFTs: boolean;
}

export interface ArticleDetailPublic_article_relatedArticles_edges_node_author_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleDetailPublic_article_relatedArticles_edges_node_author_info_badges[] | null;
  /**
   * Connected wallet.
   */
  cryptoWallet: ArticleDetailPublic_article_relatedArticles_edges_node_author_info_cryptoWallet | null;
}

export interface ArticleDetailPublic_article_relatedArticles_edges_node_author {
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
  status: ArticleDetailPublic_article_relatedArticles_edges_node_author_status | null;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleDetailPublic_article_relatedArticles_edges_node_author_liker;
  /**
   * User information.
   */
  info: ArticleDetailPublic_article_relatedArticles_edges_node_author_info;
}

export interface ArticleDetailPublic_article_relatedArticles_edges_node {
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
  author: ArticleDetailPublic_article_relatedArticles_edges_node_author;
  /**
   * State of this article.
   */
  state: ArticleState;
  /**
   * A short summary for this article.
   */
  summary: string;
}

export interface ArticleDetailPublic_article_relatedArticles_edges {
  __typename: "ArticleEdge";
  cursor: string;
  node: ArticleDetailPublic_article_relatedArticles_edges_node;
}

export interface ArticleDetailPublic_article_relatedArticles {
  __typename: "ArticleConnection";
  edges: ArticleDetailPublic_article_relatedArticles_edges[] | null;
}

export interface ArticleDetailPublic_article_received_edges_node_sender_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleDetailPublic_article_received_edges_node_sender_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleDetailPublic_article_received_edges_node_sender_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleDetailPublic_article_received_edges_node_sender_info_badges[] | null;
}

export interface ArticleDetailPublic_article_received_edges_node_sender {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleDetailPublic_article_received_edges_node_sender_liker;
  /**
   * User information.
   */
  info: ArticleDetailPublic_article_received_edges_node_sender_info;
}

export interface ArticleDetailPublic_article_received_edges_node {
  __typename: "Appreciation";
  /**
   * Sender of appreciation.
   */
  sender: ArticleDetailPublic_article_received_edges_node_sender | null;
}

export interface ArticleDetailPublic_article_received_edges {
  __typename: "AppreciationEdge";
  cursor: string;
  node: ArticleDetailPublic_article_received_edges_node;
}

export interface ArticleDetailPublic_article_received {
  __typename: "AppreciationConnection";
  totalCount: number;
  edges: ArticleDetailPublic_article_received_edges[] | null;
}

export interface ArticleDetailPublic_article_appreciationsReceived {
  __typename: "AppreciationConnection";
  totalCount: number;
}

export interface ArticleDetailPublic_article_donationsDialog {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ArticleDetailPublic_article_donationsToolbar {
  __typename: "UserConnection";
  totalCount: number;
}

export interface ArticleDetailPublic_article_donations_edges_node_liker {
  __typename: "Liker";
  /**
   * Whether liker is a civic liker
   */
  civicLiker: boolean;
}

export interface ArticleDetailPublic_article_donations_edges_node_info_badges {
  __typename: "Badge";
  type: BadgeType;
}

export interface ArticleDetailPublic_article_donations_edges_node_info {
  __typename: "UserInfo";
  /**
   * User badges.
   */
  badges: ArticleDetailPublic_article_donations_edges_node_info_badges[] | null;
}

export interface ArticleDetailPublic_article_donations_edges_node {
  __typename: "User";
  /**
   * Global id of an user.
   */
  id: string;
  /**
   * URL for user avatar.
   */
  avatar: string | null;
  /**
   * Liker info of current user
   */
  liker: ArticleDetailPublic_article_donations_edges_node_liker;
  /**
   * User information.
   */
  info: ArticleDetailPublic_article_donations_edges_node_info;
  /**
   * Global unique user name of a user.
   */
  userName: string | null;
  /**
   * Display name on user profile, can be duplicated.
   */
  displayName: string | null;
}

export interface ArticleDetailPublic_article_donations_edges {
  __typename: "UserEdge";
  cursor: string;
  node: ArticleDetailPublic_article_donations_edges_node;
}

export interface ArticleDetailPublic_article_donations {
  __typename: "UserConnection";
  totalCount: number;
  edges: ArticleDetailPublic_article_donations_edges[] | null;
}

export interface ArticleDetailPublic_article {
  __typename: "Article";
  /**
   * Unique ID of this article
   */
  id: string;
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
   * State of this article.
   */
  state: ArticleState;
  /**
   * Article cover's link.
   */
  cover: string | null;
  /**
   * A short summary for this article.
   */
  summary: string;
  /**
   * This value determines if the summary is customized or not.
   */
  summaryCustomized: boolean;
  /**
   * Time of this article was created.
   */
  createdAt: any;
  /**
   * Time of this article was revised.
   */
  revisedAt: any | null;
  /**
   * Original language of content
   */
  language: string | null;
  /**
   * Author of this article.
   */
  author: ArticleDetailPublic_article_author;
  /**
   * List of articles added into this article' collection.
   */
  collection: ArticleDetailPublic_article_collection;
  /**
   * Access related fields on circle
   */
  access: ArticleDetailPublic_article_access;
  /**
   * License Type
   */
  license: ArticleLicenseType;
  /**
   * creator message asking for support
   */
  requestForDonation: string | null;
  /**
   * creator message after support
   */
  replyToDonator: string | null;
  /**
   * Drafts linked to this article.
   */
  drafts: ArticleDetailPublic_article_drafts[] | null;
  /**
   * Translation of article title and content.
   */
  translation: ArticleDetailPublic_article_translation | null;
  /**
   * Available translation languages.
   */
  availableTranslations: UserLanguage[] | null;
  /**
   * IPFS hash of this article.
   */
  dataHash: string;
  /**
   * the iscnId if published to ISCN
   */
  iscnId: string | null;
  /**
   * Content of this article.
   */
  content: string;
  /**
   * Tags attached to this article.
   */
  tags: ArticleDetailPublic_article_tags[] | null;
  /**
   * Related articles to this article.
   */
  relatedArticles: ArticleDetailPublic_article_relatedArticles;
  /**
   * Total number of appreciations recieved of this article.
   */
  appreciationsReceivedTotal: number;
  /**
   * Appreciations history of this article.
   */
  received: ArticleDetailPublic_article_received;
  /**
   * Appreciations history of this article.
   */
  appreciationsReceived: ArticleDetailPublic_article_appreciationsReceived;
  /**
   * Transactions history of this article.
   */
  donationsDialog: ArticleDetailPublic_article_donationsDialog;
  /**
   * State of this article.
   */
  articleState: ArticleState;
  /**
   * This value determines if this article is an author selected article or not.
   */
  sticky: boolean;
  /**
   * Transactions history of this article.
   */
  donationsToolbar: ArticleDetailPublic_article_donationsToolbar;
  /**
   * Limit the nuhmber of appreciate per user.
   */
  appreciateLimit: number;
  /**
   * The counting number of this article.
   */
  responseCount: number;
  /**
   * This value determines if current Viewer has subscribed of not.
   */
  subscribed: boolean;
  /**
   * This value determines if current viewer has appreciated or not.
   */
  hasAppreciate: boolean;
  /**
   * Number represents how many times per user can appreciate this article.
   */
  appreciateLeft: number;
  /**
   * This value determines if current viewer can SuperLike or not.
   */
  canSuperLike: boolean;
  /**
   * Transactions history of this article.
   */
  donations: ArticleDetailPublic_article_donations;
}

export interface ArticleDetailPublic {
  article: ArticleDetailPublic_article | null;
}

export interface ArticleDetailPublicVariables {
  mediaHash: string;
  language: UserLanguage;
  includeTranslation?: boolean | null;
  includeCanSuperLike?: boolean | null;
}
