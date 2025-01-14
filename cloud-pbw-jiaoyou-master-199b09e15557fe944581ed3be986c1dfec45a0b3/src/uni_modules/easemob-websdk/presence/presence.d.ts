import { AsyncResult, UserId } from '../types/common';
import * as PresenceTypes from '../types/presenceApi';
export interface Presence {
	/**
	 * Publishes a custom presence state.
	 *
	 * ```typescript
	 * connection.publishPresence({description: 'music'})
	 * ```
	 */
	publishPresence(params: {
		/** The extension description information of the presence state. It can be set as nil. */
		description: string;
	}): Promise<AsyncResult<PresenceTypes.PublishPresenceResult>>;

	/**
	 * Subscribes to a user's presence states. If the subscription succeeds, the subscriber will receive the callback when the user's presence state changes.
	 *
	 * ```typescript
	 * connection.subscribePresence({usernames: ['user1','user2'], expiry: 10000})
	 * ```
	 */
	subscribePresence(params: {
		/** The array of IDs of users whose presence states you want to subscribe to. */
		usernames: UserId[];
		/** The time of the presence subscription. */
		expiry: number;
	}): Promise<AsyncResult<PresenceTypes.SubscribePresenceResult>>;

	/**
	 * Unsubscribes from a user's presence states.
	 *
	 * ```typescript
	 * connection.unsubscribePresence({usernames: ['user1','user2']})
	 * ```
	 */
	unsubscribePresence(params: {
		/** The array of IDs of users whose presence states you want to unsubscribe from. */
		usernames: UserId[];
	}): Promise<AsyncResult<PresenceTypes.PublishPresenceResult>>;

	/**
	 * Uses pagination to get a list of users whose presence states you have subscribed to.
	 *
	 * ```typescript
	 * connection.getSubscribedPresencelist({usernames: ['user1','user2']})
	 * ```
	 */
	getSubscribedPresencelist(params: {
		/** The current page number, starting from 1. */
		pageNum: number;
		/** The number of subscribers per page. */
		pageSize: number;
	}): Promise<AsyncResult<PresenceTypes.GetSubscribedPresenceListResult>>;

	/**
	 * Gets the current presence state of users.
	 *
	 * ```typescript
	 * connection.getPresenceStatus({usernames: ['user1','user2']})
	 * ```
	 */
	getPresenceStatus(params: {
		/** The array of IDs of users whose current presence state you want to check. */
		usernames: UserId[];
	}): Promise<AsyncResult<PresenceTypes.SubscribePresenceResult>>;
}

export {AsyncResult, UserId, PresenceTypes}
