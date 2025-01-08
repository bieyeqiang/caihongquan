import {
	ChannelMsgBody,
	ChatType,
	DeliveryMsgBody,
	MessagePriority,
	MessagesType,
	ReadMsgBody,
} from '../types/message';
export interface CombineParameters {
	/** The message type. */
	/** 消息类型。 */
	type: 'combine';
	/** The message ID. */
	/** 消息 ID。*/
	id: string;
}
export interface CombineMsgBody {
	/** The message ID. */
	/** 消息 ID。*/
	id: string;
	/** The conversation type. */
	/** 会话类型。 */
	chatType: ChatType;
	/** The message type. */
	/** 消息类型。 */
	type: 'combine';
	/** The recipient. */
	/** 消息接收方。 */
	to: string;
	/** The sender, which can only be the current user and can not be changed.*/
	/** 消息发送方，只能是当前用户，无法修改。*/
	from?: string;
	/** @deprecated Whether the conversation type is chat room. */
	/** @deprecated 会话类型是否是聊天室。 */
	roomType?: boolean;
	/** @deprecated Whether the conversation type is group. */
	/** @deprecated 会话类型是否是群组。 */
	group?: string;
	/** Message extension. */
	/** 消息扩展。 */
	ext?: {
		[key: string]: any;
	};
	/** Whether read receipts are required during a group conversation. */
	/** 群组会话时是否需返回已读回执。*/
	msgConfig?: {
		allowGroupAck?: boolean;
		languages?: string[];
	};
	/** Time. */
	/** 时间。 */
	time: number;
	/** Whether the message is a threaded message. */
	/** 消息是否为子区消息 */
	isChatThread?: boolean;
	/** The message priority. */
	/** 消息优先级 */
	priority?: MessagePriority;
	/** Whether global notify message or not. */
	/** 判断是否是全局广播消息。 */
	broadcast?: boolean;
	/** Whether the message is delivered only when the recipient(s) is/are online:
	 *  - `true`: The message is delivered only when the recipient(s) is/are online. If the recipient is offline, the message is discarded.
	 *  - (Default) `false`: The message is delivered when the recipient(s) is/are online. If the recipient(s) is/are offline, the message will not be delivered to them until they get online.
	 */
	/** 消息是否只投递给在线用户：
	 * - `true`: 只有消息接收方在线时才能投递成功。若接收方离线，则消息会被丢弃。
	 * - （默认）`false`: 如果用户在线，则直接投递；如果用户离线，消息会在用户上线时投递。
	 */
	deliverOnlineOnly?: boolean;
	/** The list of message recipients. */
	/** 消息接收方列表。 */
	receiverList?: string[];
	/** The compatibility information for combining message. */
	/** 合并消息的兼容信息。 */
	compatibleText: string;
	/** The title of the combined message. */
	/** 合并消息的标题。 */
	title: string;
	/** The summary list of the combined message. */
	/** 合并消息的摘要列表。 */
	summary: string;
	/** The message list of the combined message. */
	/** 合并消息列表。 */
	messageList: MessagesType[];
	/** The callback of a file upload error. */
	/** 文件上传错误的回调。 */
	onFileUploadError?: (error: any) => void;
	/** The callback of file upload completion. */
	/** 文件上传完成的回调。 */
	onFileUploadComplete?: (data: { url: string; secret: string }) => void;
}
export interface CreateCombineMsgParameters {
	/** The conversation type. */
	/** 会话类型。 */
	chatType: ChatType;
	/** The message type. */
	/** 消息类型。 */
	type: 'combine';
	/** The recipient. */
	/** 消息接收方。 */
	to: string;
	/** The sender, which can only be the current user and can not be changed. */
	/** 消息发送方，只能是当前用户，无法修改。*/
	from?: string;
	/** The message extension. */
	/** 消息扩展。 */
	ext?: {
		[key: string]: any;
	};
	/** Whether read receipts are required during a group conversation. */
	/** 群组会话时是否需返回已读回执。*/
	msgConfig?: {
		allowGroupAck?: boolean;
		languages?: string[];
	};
	/** Whether the message is a threaded message. */
	/** 消息是否为子区消息。  */
	isChatThread?: boolean;
	/** Message priority. */
	/** 消息优先级 */
	priority?: MessagePriority;
	/** Whether the message is delivered only when the recipient(s) is/are online:
	 *  - `true`: The message is delivered only when the recipient(s) is/are online. If the recipient is offline, the message is discarded.
	 *  - (Default) `false`: The message is delivered when the recipient(s) is/are online. If the recipient(s) is/are offline, the message will not be delivered to them until they get online.
	 */
	/** 消息是否只投递给在线用户：
	 * - `true`: 只有消息接收方在线时才能投递成功。若接收方离线，则消息会被丢弃。
	 * - （默认）`false`: 如果用户在线，则直接投递；如果用户离线，消息会在用户上线时投递。
	 */
	deliverOnlineOnly?: boolean;
	/** The list of message recipients. */
	/** 消息接收方列表。 */
	receiverList?: string[];
	/** The compatible text of the combined message. */
	/** 合并消息的兼容信息。 */
	compatibleText: string;
	/** The title of the combined message. */
	/** 合并消息的标题。 */
	title: string;
	/** The summary list of the combined message. */
	/** 合并消息摘要列表。 */
	summary: string;
	/** The message list of the combined message. */
	/** 合并消息的消息列表。 */
	messageList: Exclude<
		MessagesType,
		DeliveryMsgBody | ReadMsgBody | ChannelMsgBody
	>[];
	/** The callback of a file upload error. */
	/** 文件上传错误的回调。 */
	onFileUploadError?: (error: any) => void;
	/** The callback of file upload completion. */
	/** 文件上传完成的回调。 */
	onFileUploadComplete?: (data: { url: string; secret: string }) => void;
}
export declare class Combine {
	id: string;
	type: 'combine';
	value: string;
	body?: CombineMsgBody;
	constructor(parameters: CombineParameters);
	static create(options: CreateCombineMsgParameters): CombineMsgBody;
}
