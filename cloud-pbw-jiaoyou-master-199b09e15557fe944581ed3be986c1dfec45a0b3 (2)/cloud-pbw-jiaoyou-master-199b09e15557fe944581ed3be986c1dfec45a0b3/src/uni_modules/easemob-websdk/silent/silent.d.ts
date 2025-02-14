import { AsyncResult } from '../types/common';
import * as SilentModeType from '../types/silentModeApi';
export interface Silent {
	/**
	 * Set the DND Settings for the current login user.
	 *
	 * ```typescript
	 * connection.setSilentModeForAll({options: {paramType: 0, remindType: 'ALL'}})
	 * ```
	 */
	setSilentModeForAll(params: {
		/** Options object include paramType,remindType,duration,startTime,endTime. */
		options: SilentModeType.SilentModeParamType;
	}): Promise<AsyncResult<SilentModeType.SilentModeConversationType>>;

	/**
	 * Get the DND Settings of the current user.
	 *
	 * ```typescript
	 * connection.getSilentModeForAll()
	 * ```
	 */
	getSilentModeForAll(): Promise<
		AsyncResult<SilentModeType.SilentModeConversationType>
	>;

	/**
	 * Set the DND of the session.
	 *
	 * ```typescript
	 * connection.setSilentModeForConversation({conversationId: '100', type: 'singleChat', params: {paramType: 0, remindType: 'ALL'}})
	 * ```
	 */
	setSilentModeForConversation(params: {
		/** The Conversation id.
		 * For one-to-one chat, conversation ID is to chat user's name.
		 * For group chat, conversation ID is group ID, different with group name.
		 * For chat room, conversation ID is chat room ID, different with chat room name.
		 * For help desk, it is same with one-to-one chat, conversation ID is also chat user's name.
		 */
		conversationId: string;
		/** Conversation type. */
		type: SilentModeType.CONVERSATIONTYPE;
		/** Options object include paramType,remindType,duration,startTime,endTime. */
		options: SilentModeType.SilentModeParamType;
	}): Promise<AsyncResult<SilentModeType.SilentModeConversationType>>;

	/**
	 * Clear the setting of offline push notification type for the session.
	 *
	 * ```typescript
	 * connection.clearRemindTypeForConversation({conversationId: '123', type: 'singleChat'})
	 * ```
	 */
	clearRemindTypeForConversation(params: {
		/** Conversation id. */
		conversationId: string;
		/** Conversation type. */
		type: SilentModeType.CONVERSATIONTYPE;
	}): Promise<AsyncResult<SilentModeType.SilentModeConversationType>>;

	/**
	 * Gets the DND setting of the session.
	 *
	 * ```typescript
	 * connection.getSilentModeForConversation({conversationId: '3333', type: 'singleChat'})
	 * ```
	 */
	getSilentModeForConversation(params: {
		/** Conversation id. */
		conversationId: string;
		/** Conversation type. */
		type: SilentModeType.CONVERSATIONTYPE;
	}): Promise<AsyncResult<SilentModeType.SilentModeConversationType>>;

	/**
	 * Obtain the DND Settings of specified sessions in batches.
	 *
	 * ```typescript
	 * connection.getSilentModeForConversations({conversationList:[{id: 'test', type: 'singleChat'}, {id: '12345', type: 'groupChat'}]})
	 * ```
	 */
	getSilentModeForConversations(params: {
		/** Conversation list. */
		conversationList: SilentModeType.ConversationListType[];
	}): Promise<AsyncResult<SilentModeType.ConversationSilentModeType>>;

	/**
	 * Set user push translation language.
	 *
	 * ```typescript
	 * connection.setPushPerformLanguage({language: 'EU'})
	 * ```
	 */
	setPushPerformLanguage(params: {
		/** translation language */
		language: string;
	}): Promise<AsyncResult<SilentModeType.TranslationLanguageType>>;

	/**
	 * Gets the push translation language set by the user.
	 *
	 * ```typescript
	 * connection.getPushPerformLanguage()
	 * ```
	 */
	getPushPerformLanguage(): Promise<
		AsyncResult<SilentModeType.TranslationLanguageType>
	>;
}

export {AsyncResult, SilentModeType}
