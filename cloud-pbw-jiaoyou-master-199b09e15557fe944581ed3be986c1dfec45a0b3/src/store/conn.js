import { defineStore } from "pinia";
//@ts-ignore
import websdk from "easemob-websdk/uniApp/Easemob-chat";

websdk.logger.onLog = (log) => {
  console.log(log.time, ...log.logs);
};

// 关闭控制台日志
websdk.logger.setConsoleLogVisibility(false);

export const useConnStore = defineStore("conn", () => {
  /** IM连接实例 */
  let conn = null;

  let sdk = websdk;

  /** 初始化webIM */
  const initChatSDK = (config) => {
    setChatConn(new sdk.connection(config));
    return conn;
  };

  /** 设置conn实例 */
  const setChatConn = (connection) => {
    conn = connection;
    //@ts-ignore
    uni.conn = connection;
  };

  /** 获取conn实例 */
  const getChatConn = () => {
    if (conn) {
      return conn;
    }
    throw "conn is not initialized";
  };

  /** 获取 websdk */
  const getChatSDK = () => {
    if (sdk) {
      return sdk;
    }
    throw "SDK is not found";
  };

  return {
    conn,
    getChatConn,
    initChatSDK,
    getChatSDK
  };
});