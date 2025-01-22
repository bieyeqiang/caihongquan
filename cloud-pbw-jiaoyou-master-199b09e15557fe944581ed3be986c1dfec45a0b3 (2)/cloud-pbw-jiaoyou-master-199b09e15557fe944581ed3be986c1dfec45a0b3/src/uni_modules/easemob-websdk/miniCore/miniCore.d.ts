import { GroupApi } from '../group/group';
import { ChatroomApi } from '../chatroom/chatroom';
import { Presence } from '../presence/presence';
import { Silent } from '../silent/silent';
import { Thread } from '../thread/thread';
import { Translation } from '../translation/translation';
import { LocalCache } from '../localCache/localCache';
import { Message } from '../message/index';
import { Contact } from '../contact/contact';
import { AsyncResult } from '../types/common';
import { MessagesType } from '../types/message';
import { EventHandlerType } from '../types/eventHandler';
import { MessageBody } from '../types/message';
import { SendMsgResult } from '../types/indexApi';
interface MiniCoreOptions {
	appKey: string;
	isHttpDNS?: boolean;
	url?: string;
	apiUrl?: string;
	delivery?: boolean;
	deviceId?: string;
}

export interface OpenParams {
	/** The user ID. */
	username: string;
	/** The user ID. */
	password?: string;
	/** Token required to connect to the message service. */
	accessToken?: string;
	/** @deprecated Use 'accessToken' instead. */
	agoraToken?: string;
}
export interface NewTokenResult {
	/** Whether success. */
	status: boolean;
	/** The new Agora token. */
	token?: string;
	/** The expire time. */
	expire?: number;
}

export interface DownloadCombineMessagesParams {
	/** The file url. */
	url: string;
	/** The file secret. */
	secret: string;
}

interface BaseUserInfo {
	/** Whether the current user is enabled. - `true`: Yes; - `false`: No.*/
	activated: boolean;
	/** The timestamp when the current user is created. */
	created: number;
	/** The time when the user information is last edited. */
	modified: number;
	/** The display name in the message push notification. */
	nickname: string;
	/** The user type. */
	type: string;
	/** The user ID. */
	username: string;
	/** The user uuid on the chat server. */
	uuid: string;
}
declare class MiniCore {
	/** The name. */
	name: string;
	/** The URL of the specified message server. This command is used when DNS is not enabled. Usually this API is used for specific customers and need to contact account manager to get it. */
	url: string;
	/** The URL of the specified REST server. This command is used when DNS is not enabled. Usually this API is used for specific customers and need to contact account manager to get it. */
	apiUrl: string;
	/** @hidden */
	orgName: string;
	/** @hidden */
	appName: string;
	/** Whether to enable DNS. - (Default)`true`: Enable; - `false`: Do not enable. */
	isHttpDNS: boolean;
	/** Whether to use HTTPS only. By default, the browser determines whether to use HTTPS only according to the domain name. */
	https: boolean;
	/** Your app key. */
	appKey: string;
	/** Login user token. */
	token: string;
	/** The user id. */
	user: string;
	/** @hidden */
	logOut: boolean;
	/** The heartbeat interval (in seconds). The default value is 30,000s. */
	heartBeatWait: number;
	/** Whether to enable the delivery receipt function. - `true`: Enable; - (Default)`false`: Do not enable. */
	delivery?: boolean;
	/** The unique web device ID. By default, it is a random number. */
	deviceId?: string;
	/** The SDK version. */
	version: string;
	context: {
		jid: {
			appKey: string;
			clientResource: string;
			domain: string;
			name: string;
		};
		userId: string;
		appKey: string;
		restTokenData: string;
		status: number;
		appName: string;
		orgName: string;
		root: any;
		accessToken: string;
	};
	Message: typeof Message;
	private _queues;
	private _load_msg_cache;
	private dnsArr;
	private restIndex;
	private hostIndex;
	private restHosts;
	private socketHost;
	private max_cache_length;
	private unSendMsgArr;
	private sock;
	private isReport;
	private mSync;
	// eslint-disable-next-line no-undef
	[key: string]: any;
	constructor(options: MiniCoreOptions);
	usePlugin(this: MiniCore, plugin: any, name?: string): any;
	isOpened(): boolean;
	open(params: OpenParams): Promise<void>;
	send(params: MessageBody): Promise<SendMsgResult>;
	/** Closes the connection. */
	close(): void;
	registerUser(params: {
		username: string;
		password: string;
		nickname: string;
	}): Promise<AsyncResult<BaseUserInfo>>;
	/** Updates token. */
	renewToken(token: string): Promise<NewTokenResult>;

	/** Download combined message. */
	downloadAndParseCombineMessage(
		options: DownloadCombineMessagesParams
	): Promise<MessagesType[]>;
	/**
	 * Adds listening events.
	 *
	 * ```typescript
	 * connection.addEventHandler('customId', {
	 * 	onTextMessage: (message) => {
	 * 		console.log(message)
	 * 	}
	 * })
	 * ```
	 */
	addEventHandler(id: string, handler: EventHandlerType): void;

	private clearTokenTimeout;
	private tokenExpireTimeCountDown;
	private stopHeartBeat;
	private setContext;
	private getDNS;
	private setRestUrl;
	private setSocketUrl;
	private online;
	private offline;
	private reconnect;
	private clear;
	contact: Contact;
	group: GroupApi;
	chatroom: ChatroomApi;
	presence: Presence;
	silent: Silent;
	thread: Thread;
	translation: Translation;
	localCache: LocalCache;
}
declare const miniCore: typeof MiniCore;
export type { MiniCore };
export default miniCore;
