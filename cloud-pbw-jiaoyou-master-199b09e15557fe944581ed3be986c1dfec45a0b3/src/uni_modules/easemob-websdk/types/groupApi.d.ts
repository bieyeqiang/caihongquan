/**
 * group types
 * @module TYPES
 */
import { UserId } from './common';
interface BaseGroupInfo {
	/** The group ID. */
	groupid: string;
	/** The group name. */
	groupname: string;
}
export declare type GroupAffiliation =
	| {
			/** The group owner. */
			owner: UserId;
			/** The Unix timestamp when the owner joined the group. */
			joined_time: number;
	  }
	| {
			/** The group member. */
			member: UserId;
			/** The Unix timestamp when the user joins the group. */
			joined_time: number;
	  };
interface CreateGroupResult {
	/** The group ID. */
	groupid: string;
}
interface BlockGroupResult {
	/** Whether the current user is enabled. */
	activated: boolean;
	/** The Unix timestamp when the user is created. */
	created: number;
	/** The Unix timestamp when the user information was last edited. */
	modified: number;
	/** User nickname for push. */
	nickname: string;
	/** The user type. */
	type: string;
	/** The user ID. */
	username: string;
	/** The user uuid. */
	uuid: string;
}
interface ChangeGroupOwnerResult {
	/** The group owner change result. */
	newowner: boolean;
}
interface GroupDetailInfo {
	/** The list of existing members. */
	affiliations: GroupAffiliation[];
	/** The number of existing members. */
	affiliations_count: number;
	/** Whether to allow group members to invite others to join the group. */
	allowinvites: boolean;
	/** The Unix timestamp when the group is created. */
	created: number;
	/** The custom information. */
	custom: string;
	/** The group description. */
	description: string;
	/** The group ID. */
	id: string;
	/** The maximum number of group members. */
	maxusers: number;
	/** Whether a user requires the approval from the group owner or admin to join the group. -`true`: Yes; -`false`: No. */
	membersonly: boolean;
	/** Whether to mute all members. -`true`: Yes; -`false`: No.*/
	mute: boolean;
	/** The group name. */
	name: string;
	/** The group owner. */
	owner: UserId;
	/** Whether it is a public group. */
	public: boolean;
	/** Whether the member is on the blocklist. -`true`: Yes; -`false`: No. */
	shieldgroup: boolean;
}
interface ModifyGroupResult {
	/** Whether the group description is modified successfully. -`true`: Yes; -`false`: No. */
	description?: boolean;
	/** Whether the maximum number of group members is changed successfully. -`true`: Yes; -`false`: No.*/
	maxusers?: boolean;
	/** Whether the group name is changed successfully. -`true`: Yes; -`false`: No.*/
	groupname?: boolean;
	/** Whether requiring approval is changed successfully. -`true`: Yes; -`false`: No. */
	membersonly?: boolean;
	/** Whether allowing a group member to invite others is modified successfully. -`true`: Yes; -`false`: No.*/
	allowinvites?: boolean;
}
declare type GroupMember =
	| {
			owner: UserId;
	  }
	| {
			member: UserId;
	  };
interface SetGroupAdminResult {
	/** The user ID of the new admin. */
	newadmin: UserId;
	/** The setting result. */
	result: 'success';
}
interface RemoveGroupAdminResult {
	/** The user ID of a removed admin. */
	oldadmin: UserId;
	/** The setting result. */
	result: 'success';
}
interface DestroyGroupResult {
	/** The group ID. */
	id: string;
	/** The operation result. */
	success: boolean;
}
interface InviteUsersToGroupResult {
	/** The action. */
	action: 'invite';
	/** The group ID. */
	id: string;
	/** The reason for failure. */
	reason?: string;
	/** The invitation result. - `true`: The invitation is delivered successfully; - `false`: The invitation fails to be delivered. */
	result: boolean;
	/** The invitee ID. */
	user: UserId;
}

interface GroupInfo {
	/** The number of existing members. */
	affiliationsCount?: number;
	/** The group name. */
	groupName: string;
	/** The group ID. */
	groupId: string;
	/** The current user role in the group. */
	role?: 'member' | 'admin' | 'owner';
	/** Whether the group disabled. */
	disabled: boolean;
	/** Whether a user requires the approval from the group owner or admin to join the group. -`true`: Yes; -`false`: No. */
	approval: boolean;
	/** Whether to allow group members to invite others to join the group. */
	allowInvites: boolean;
	/** The group description. */
	description: string;
	/** The maximum number of group members. */
	maxUsers: number;
	/** Whether it is a public group. */
	public: boolean;
}

interface RemoveGroupMemberResult {
	/** The action. */
	action: 'remove_member';
	/** The group ID. */
	groupid: string;
	/** The invitation result. - `true`: Success; - `false`: Failure.*/
	result: boolean;
	/** The user ID. */
	user: UserId;
}
interface MuteGroupMemberResult {
	/** The mute duration in milliseconds. */
	expire: number;
	/** The operation result. - `true`: Succeed; - `false`: Failed.*/
	result: boolean;
	/** The ID of the muted member. */
	user: UserId;
}
interface UnmuteGroupMemberResult {
	/** The operation result. - `true`: Succeed; - `false`: Failed.*/
	result: boolean;
	/** The ID of the unmuted member. */
	user: UserId;
}
interface GetGroupMuteListResult {
	/** The mute duration in milliseconds. */
	expire: number;
	/** The ID of the muted user. */
	user: UserId;
}
interface GroupRequestResult {
	/** The action. */
	action: string;
	/** The group ID. */
	groupid: string;
	/** The invitation result. - `true`: Succeed; - `false`: Failed. */
	result: boolean;
	/** The user ID. */
	user: UserId;
}
interface IsInGroupWhiteListResult {
	/** The user ID to query. */
	member: UserId;
	/** Whether the user is on the allowlist. -`true`: Yes; -`false`: No.*/
	white: boolean;
}
interface GetGroupMsgReadUserResult {
	/** The message ID to query. */
	ackmid: string;
	/** Whether the message is the last one.  -`true`: Yes; -`false`: No.*/
	is_last: boolean;
	/** The cursor for next pagination query. It specifies where to start to get the next page of data.*/
	next_key: string;
	/** The Unix timestamp of the current query. */
	timestamp: number;
	/** The number of members that have read the message. */
	total: number;
	/** The list of members that have read this message. */
	userlist: UserId[];
}
interface UpdateGroupAnnouncementResult {
	/** The group ID. */
	id: string;
	/** The operation result. - `true`: Success; - `false`: Failure.*/
	result: boolean;
}
interface DeleteGroupSharedFileResult {
	/** The group ID. */
	group_id: string;
	/** The file ID. */
	file_id: string;
	/** The operation result. - `true`: Success; - `false`: Failure.*/
	result: boolean;
}
interface FetchGroupSharedFileListResult {
	/** The file ID. */
	file_id: string;
	/** The file name. */
	file_name: string;
	/** The file owner. */
	file_owner: string;
	/** The file size. */
	file_size: number;
	/** The Unix timestamp when the file is uploaded.*/
	created: number;
}
interface GroupModifyInfo {
	/** The name of a group.  */
	name?: string;
	/** The description of a group.  */
	description?: string;
	/** Whether it is a public group. -`true`: Yes; -`false`: No. Public group: the group that others can query by calling `listgroups`. */
	public?: boolean;
	/** Whether a user requires the approval from the group owner or admin to join the group. -`true`: Yes; -`false`: No. */
	approval?: boolean;
	/** Whether to allow group members to invite others to join the group. */
	allowInvites?: boolean;
	/** The maximum number of group members */
	maxUsers?: number;
	/** Whether the invitee needs to accept the invitation before joining the group.
  - `true`: The invitee's consent is required. The default value is `true`.
  - `false`: The invitee will be directly added to the group without confirmation.
  */
	inviteNeedConfirm?: boolean;
	/** Group detail extensions. */
	ext?: string;
	/** Last Modified Timestamp.  */
	lastModified?: number;
}

declare type MemberAttributes = Record<string, string>;

declare type GetGroupMembersAttributesResult = Record<UserId, MemberAttributes>;

export type {
	GroupRequestResult,
	BaseGroupInfo,
	CreateGroupResult,
	BlockGroupResult,
	ChangeGroupOwnerResult,
	GroupDetailInfo,
	ModifyGroupResult,
	GroupMember,
	SetGroupAdminResult,
	RemoveGroupAdminResult,
	DestroyGroupResult,
	InviteUsersToGroupResult,
	RemoveGroupMemberResult,
	MuteGroupMemberResult,
	UnmuteGroupMemberResult,
	GetGroupMuteListResult,
	IsInGroupWhiteListResult,
	GetGroupMsgReadUserResult,
	UpdateGroupAnnouncementResult,
	DeleteGroupSharedFileResult,
	FetchGroupSharedFileListResult,
	GroupInfo,
	GroupModifyInfo,
	MemberAttributes,
	GetGroupMembersAttributesResult,
};
