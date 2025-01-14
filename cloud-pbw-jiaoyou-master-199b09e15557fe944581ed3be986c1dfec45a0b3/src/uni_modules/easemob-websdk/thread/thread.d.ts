import * as ThreadTypes from '../types/threadApi';
import { AsyncResult } from '../types/common';
export interface Thread {
	/**
	 * Creates a message thread.
	 *
	 * ```typescript
	 * connection.createChatThread({parentId: 'parentId',name: 'threadName',messageId: 'messageId'})
	 * ```
	 */
	createChatThread(params: {
		/** The group ID to which the message thread belongs. */
		parentId: string;
		/** The name of the new message thread. */
		name: string;
		/** The ID of the parent message. */
		messageId: string;
	}): Promise<AsyncResult<ThreadTypes.CreateChatThreadResult>>;

	/**
	 * Joins a message thread.
	 *
	 * ```typescript
	 * connection.joinChatThread({chatThreadId: 'chatThreadId'})
	 * ```
	 */
	joinChatThread(params: {
		/** The message thread ID. */
		chatThreadId: string;
	}): Promise<AsyncResult<ThreadTypes.JoinChatThreadResult>>;

	/**
	 * Leaves the message thread.
	 *
	 * ```typescript
	 * connection.leaveChatThread({chatThreadId: 'chatThreadId'})
	 * ```
	 */
	leaveChatThread(params: {
		/** The ID of the message thread that the current user wants to leave. */
		chatThreadId: string;
	}): Promise<void>;

	/**
	 * Destroy the message thread.
	 *
	 * Only the owner and admins of the group to which the message thread belongs can call this method.
	 *
	 * ```typescript
	 * connection.destroyChatThread({chatThreadId: 'chatThreadId'})
	 * ```
	 */
	destroyChatThread(params: {
		/** The ID of the message thread to delete. */
		chatThreadId: string;
	}): Promise<void>;

	/**
	 * Changes the message thread name.
	 *
	 * ```typescript
	 * connection.changeChatThreadName({chatThreadId: 'chatThreadId',name: 'name'})
	 * ```
	 */
	changeChatThreadName(params: {
		/** The message thread ID. */
		chatThreadId: string;
		/** The message thread name. */
		name: string;
	}): Promise<AsyncResult<ThreadTypes.ChangeChatThreadName>>;

	/**
	 * Gets members in the message thread with pagination.
	 *
	 * ```typescript
	 * connection.getChatThreadMembers({chatThreadId: 'chatThreadId',pageSize:20,cursor:'cursor'})
	 * ```
	 */
	getChatThreadMembers(params: {
		/** The message thread ID. */
		chatThreadId: string;
		/** The number of members that you expect to get on each page. The value range is [1,50] and the default value is `20`. */
		pageSize?: number;
		/** The position from which to start getting data. At the first method call, if you set `cursor` to an empty string, the SDK will get data in the chronological order of when members join the message thread.*/
		cursor?: string;
	}): Promise<AsyncResult<ThreadTypes.ChatThreadMembers>>;

	/**
	 * Removes a member from the message thread.
	 *
	 * ```typescript
	 * connection.removeChatThreadMember({chatThreadId: 'chatThreadId',username:'username'})
	 * ```
	 */
	removeChatThreadMember(params: {
		/** The message thread ID. */
		chatThreadId: string;
		/** The user ID of the member to remove. */
		username: string;
	}): Promise<AsyncResult<ThreadTypes.RemoveMemberResult>>;

	/**
	 * Uses the pagination to get the message threads that the current user has joined.
	 *
	 * ```typescript
	 * connection.getJoinedChatThreads({parentId: 'parentId',cursor: 'cursor',pageSize: 50})
	 * ```
	 */
	getJoinedChatThreads(params: {
		/** The group ID to which the message thread belongs. If this parameter is set, the SDK returns the message threads that the current user has joined in a specified group.*/
		parentId?: string;
		/** The number of message threads that you expect to get on each page. The value range is [1,50] and the default value is `20`. */
		pageSize?: number;
		/** The position from which to start getting data. At the first method call, if you set `cursor` to an empty string, the SDK will get data in the reverse chronological order of when the user joins the message threads.*/
		cursor?: string;
	}): Promise<AsyncResult<ThreadTypes.ChatThreadDetail[]>>;

	/**
	 * Use the pagination to get the list of message threads that the current user has joined in the specified group.
	 *
	 * ```typescript
	 * connection.getChatThreads({parentId: 'parentId, cursor:'cursor' ,pageSize: 50})
	 * ```
	 */
	getChatThreads(params: {
		/** The group ID to which the message thread belongs. */
		parentId: string;
		/** The number of message threads that you expect to get on each page. The value range is [1,50] and the default value is `20`. */
		pageSize?: number;
		/** The position from which to start getting data. At the first method call, if you set `cursor` to an empty string, the SDK will get data in the reverse chronological order of when the user joins the message threads.*/
		cursor?: string;
	}): Promise<AsyncResult<ThreadTypes.ChatThreadDetail[]>>;

	/**
	 * Gets the last threaded reply in the specified message threads.
	 *
	 * ```typescript
	 * connection.getChatThreadLastMessage({chatThreadIds: ['chatThreadId1','chatThreadId2']})
	 * ```
	 */
	getChatThreadLastMessage(params: {
		/** The array of message thread IDs to query. You can pass a maximum of 20 message thread IDs each time.*/
		chatThreadIds: string[];
	}): Promise<AsyncResult<ThreadTypes.ChatThreadLastMessage>>;

	/**
	 * Gets the details of the message thread.
	 *
	 * ```typescript
	 * connection.getChatThreadDetail({chatThreadId: 'chatThreadId'})
	 * ```
	 */
	getChatThreadDetail(params: {
		/** The message thread ID. */
		chatThreadId: string;
	}): Promise<AsyncResult<ThreadTypes.ChatThreadDetail>>;
}

export { ThreadTypes, AsyncResult };
