# Changes to easemob chat

# 4.3.0 (Nov 13, 2023)

-   Adds contact API
    - setContactRemark
    - getAllContacts
    - getContactsWithCursor
-   Adds chatRoom broadcast
-   Adds token expiration callback

# 4.2.1 (SEP 26, 2023)

-   Adds LocalCache API
    - getLocalConversations
	- setLocalConversationCustomField
	- getLocalConversation
	- removeLocalConversation
	- clearConversationUnreadCount
-   onGroupEvent `joinPublicGroupDeclined` callback add the applicant userID
# 4.2.0 (Jul 27, 2023)

-   Adds editing message after sent function
-   Adds message merging and forwarding function
-   Fix sending unnecessary delivery messages

# 4.1.7 (Jun 8, 2023)

-   Adds the `pinConversation` method to pin or unpin a conversation.
-   Adds the `getServerPinnedConversations` method to gets the list of pinned conversations from the server with pagination.
-   Adds the `getServerConversations` method to get the sorted list of conversations from the server with pagination.
-   Adds the feature of sending targeted messages in a group or chat room conversation by adding the `receiverList` parameter to the `create` method.
-   Adds the `isLast` parameter to the `getHistoryMessages` method to indicate whether the returned data is that of the last page.
-   Adds the `thumbnailWidth` and `thumbnailHeight` parameters to the `create` method to allow you to set the width and height of the thumbnail when sending an image.
-   Adds the following errors to error codes 2 (WEBIM_CONNCTION_AUTH_ERROR) and 50 (MAX_LIMIT) and to explain the reasons for SDK login failures on the console:
    -   Error code 50: The number of daily active users (DAU) has exceeded the upper limit; the number of online users has exceeds the upper limit; the number of monthly active users (MAU) has exceeded the upper limit.
    -   Error code 2: The token is invalid.
-   Adds success and failure callbacks (Promise) for the execution of the following methods:
    -   addContact: Adds a contact.
    -   deleteContact: Deletes a contact.
    -   acceptContactInvite: Accepts a friend request.
    -   declineContactInvite: Rejects a friend request.
    -   addUsersToBlocklist: Adds a friend to the block list.
    -   removeUserFromBlocklist: Removes a friend from the block list.

## 4.1.5 (April 13, 2023)

-   Adds four parameters, `from`, `msgTypes`, `startTime`, and `endTime` in `searchOptions` in the ` getHistoryMessages` method to allow you to retrieve historical messages from the server by message sender, message type, or period.

Adds The error code 511, MESSAGE_SIZE_LIMIT, to notify you when the size of the message body exceeds the upper limit.

## 4.1.4 (Mar 16, 2023)

-   Add Group Member Attributes feature
-   Fix `getHistoryMessages` catch error failed
-   Optimize the implementation of chat room join and leave to improve performance
-   Add `deliverOnlineOnly` field in the message creation parameters

## 4.1.3 (Feb 20, 2023)

-   `getConversationlist` Getting the conversation list supports paging
-   Group notification event added `op: create`
-   `useOwnUploadFun` Self-uploaded images support the `size` field
-   ios miniapp multi-device login kick failed
-   Alipay mini program reconnection failed
-   Fixes HIM-8557- Important -- getConversationlist api returns missing fields
-   Added interface to check if you are on the chat room mute list
-   Login failures caused by authentication are not retried

## 4.1.2 (Nov 7, 2022)

-   Chat room message priority
-   Added unidirectional delete roaming function
-   Create a group, Modify group information, Support 'ext' fields
-   Optimize the timing of trigger message send failures
-   'muteGroupMembers' api supports blocking multiple users at the same time
-   Fix Attachment message file_length field is invalid

## 4.1.1 (Sep 26, 2022)

-   Fix chat room KV
-   Fix miniCore uploadFile method
-   miniCore support 'isHttpDns' = false

## 4.1.0 (Sep 16, 2022)

-   SDK modular split
-   Chat room KV
-   Add log callback
-   Add in-line comments
-   Fix file upload failure without callback error
-   `getJoinedGroups` supports getting your own roles
-   Fix the compatibility with Internet Explorer
-   Fixed bug where UniApp could not find 'addEventListener' when running on the phone
-   Optimize reconnection logic

## 4.0.9 (July 29, 2022)

-   Add disaster preparedness strategies
-   Optimize protocols to reduce data volume
-   Fixed message delay in some cases
-   Add a resourceId to the group and chat room APIs
-   The getJoinedGroups API allows you to return the number of group members and their roles

## 4.0.8 (Jun 17, 2022)

-   'GetGroupInfo' supports bulk query
-   Add group event:onGroupEvent
-   Add chatroom event:onChatroomEvent
-   Add the limit when sending group messages
-   Invite to join the group callback returns the group name

## 4.0.7 (May 25, 2022)

-   Add chatThread feature
-   Add the API to the session list to parse the last message
-   Modify the implementation of obtaining roaming messages
-   Add the mark of offline message in the message

## 4.0.5 (May 15, 2022)

-   Add reporting API for content auditing
-   Add push setting API to support different push configuration
-   Add the data reporting function
-   The API for getting groups that you have joined supports paging
-   When creating a group, the SDK supports setting the number of group members
-   Add thumbnail address parameter to receive picture message
-   Fixed group chat message cache issues

## 4.0.4 (April 19, 2022)

-   Add presence feature
-   Add translation feature
-   Optimizing miniProgram does not require the isHttpDNS parameter
-   Fixed failure to modify desc when creating a group
-   Fixed SSR compatibility
-   Fixed uni_SDK not running in browser

## 4.0.3 (January 19, 2022)

-   Fixed 'renewtoken' failed to replace the token
-   Add 'downloadGroupSharedFile' api
-   'fetchGroupSharedFileList' supports paging

## 4.0.2 (January 14, 2022)

-   Add delete session api
-   Add field 'buildingName' to the location message
-   Add restrictions on messages sent by non-friends
-   Add the error event of sending failure due to global mute
-   Support DD mini program
-   Fixed alipay mini program login problem
-   Fixed missing onChannelMessage callback
-   Fixed some known bugs

## 4.0.1 (December 10, 2021)

-   4.0.1 version init
