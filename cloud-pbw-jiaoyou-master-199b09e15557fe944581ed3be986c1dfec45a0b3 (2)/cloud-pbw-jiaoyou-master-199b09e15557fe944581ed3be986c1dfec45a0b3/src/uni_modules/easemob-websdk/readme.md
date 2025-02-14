# 环信 IM SDK 介绍

sdk 提供完整的即时消息功能开发功能，屏蔽/封装并阻止其内部复杂的细节，并提供相对简单和简洁的 API 接口，以方便第三方应用程序快速集成 PC/mobile Web 应用程序的即时消息功能

## 可以通过以下方式引用 WebSDK:

1. 安装

```bash
npm install easemob-websdk --save
```

2. 引入 SDK。

```
import EC from 'easemob-websdk'
```

3、初始化 SDK

```javascript
const conn = new EC.connection({
	appKey: '<your app key>',
});
```

4、登录环信服务

```javascript
const options = {
	user: 'username',
	pwd: 'password',
};
conn.open(options);
```

5、发送消息

```javascript
let option = {
	chatType: 'singleChat', // 会话类型，设置为单聊。
	type: 'txt', // 消息类型。
	to: 'userID', // 消息接收方（用户 ID)。
	msg: 'message content', // 消息内容。
};
let msg = EC.message.create(option);
conn.send(msg)
	.then(() => {
		console.log('send private text Success');
	})
	.catch((e) => {
		console.log('Send private text error');
	});
```

## 参考文档

-   [Easemob Chat SDK 产品概述](https://docs-im.easemob.com/ccim/intro)
-   [Easemob Chat SDK API 参考](https://docs-im.easemob.com/ccim/web/apireference)
