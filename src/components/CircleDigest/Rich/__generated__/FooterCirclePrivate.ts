/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InvitationState } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FooterCirclePrivate
// ====================================================

export interface FooterCirclePrivate_invitedBy {
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

export interface FooterCirclePrivate {
  __typename: "Circle";
  /**
   * Unique ID.
   */
  id: string;
  /**
   * This value determines if current viewer is Member or not.
   */
  isMember: boolean;
  /**
   * Invitation used by current viewer.
   */
  invitedBy: FooterCirclePrivate_invitedBy | null;
}
