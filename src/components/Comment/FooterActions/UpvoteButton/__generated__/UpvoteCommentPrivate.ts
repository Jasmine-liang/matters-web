/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Vote } from "./../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: UpvoteCommentPrivate
// ====================================================

export interface UpvoteCommentPrivate {
  __typename: "Comment";
  /**
   * Unique ID of this comment.
   */
  id: string;
  /**
   * The value determines current user's vote.
   */
  myVote: Vote | null;
}
