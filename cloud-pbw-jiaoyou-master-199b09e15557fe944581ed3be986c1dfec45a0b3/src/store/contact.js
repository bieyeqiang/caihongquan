import { defineStore } from "pinia";
import { useConnStore } from "./conn";
import { useAppUserStore } from "./appUser";
import { ref } from "vue";
//@ts-ignore
import websdk from "easemob-websdk/uniApp/Easemob-chat";

export const useContactStore = defineStore("contact", () => {
  const appUserStore = useAppUserStore();
  const contacts = ref([]);

  const contactsNoticeInfo = ref({
    list: [],
    unReadCount: 0
  });

  const viewedUserInfo = ref({});

  const connStore = useConnStore();
  const { getChatConn } = connStore;
  const conn = getChatConn();
  const { getUsersInfo } = appUserStore;

  // 递归获取联系人信息
  const deepGetUserInfo = (userIdList, pageNum = 1) => {
    const pageSize = 100; // 最多支持请求100个用户信息
    const userIds = userIdList;
    const start = (pageNum - 1) * pageSize;
    const end = pageNum * pageSize;
    getUsersInfo({
      userIdList: userIds.slice(start, end)
    }).then(() => {
      if (userIds.length > end) {
        deepGetUserInfo(userIds, pageNum + 1);
      }
    });
  };

  /** 获取全部联系人 */
  const getContacts = () => {
    conn.getAllContacts().then((res) => {
      if (res.data) {
        deepGetUserInfo(res?.data?.map((item) => item.userId) || []);
        contacts.value = res.data;
      }
    });
  };

  /** 添加好友 */
  const addContact = (userId) => {
    return conn.addContact(userId, "apply join contact").then((res) => {
      return res;
    });
  };

  /** 删除好友 */
  const deleteContact = (userId) => {
    return conn.deleteContact(userId).then((res) => {
      deleteStoreContact(userId);
      return res;
    });
  };

  /** 拒绝好友申请 */
  const declineContactInvite = (userId) => {
    return conn.declineContactInvite(userId).then((res) => {
      return res;
    });
  };

  /** 接受好友申请 */
  const acceptContactInvite = (userId) => {
    return conn.acceptContactInvite(userId).then((res) => {
      return res;
    });
  };

  /** push 好友通知 */
  const addContactNotice = (msg) => {
    contactsNoticeInfo.value.list.unshift(msg);
    contactsNoticeInfo.value.unReadCount++;
  };

  /** 删除store中的联系人 */
  const deleteStoreContact = (userId) => {
    const index = contacts.value.findIndex((item) => item.userId === userId);
    if (index !== -1) {
      contacts.value.splice(index, 1);
    }
  };

  /** 添加store的联系人 */
  const addStoreContact = (user) => {
    if (!contacts.value.find((item) => item.userId === user.userId)) {
      contacts.value.unshift(user);
    }
  };

  const setViewedUserInfo = (user) => {
    viewedUserInfo.value = user;
  };

  /** 设置联系人备注 */
  const setContactRemark = (userId, remark) => {
    return conn
      .setContactRemark({
        userId,
        remark
      })
      .then((res) => {
        const index = contacts.value.findIndex(
          (item) => item.userId === userId
        );
        if (index !== -1) {
          contacts.value[index].remark = remark;
        }
        return res;
      });
  };

  /** 清空联系人通知未读数 */
  const clearContactNoticeUnReadCount = () => {
    contactsNoticeInfo.value.unReadCount = 0;
  };

  /** 清空联系人Store */
  const clear = () => {
    contacts.value = [];
    contactsNoticeInfo.value = {
      list: [],
      unReadCount: 0
    };
    viewedUserInfo.value = {};
  };

  return {
    contacts,
    contactsNoticeInfo,
    viewedUserInfo,
    getContacts,
    addContact,
    deleteContact,
    addContactNotice,
    declineContactInvite,
    acceptContactInvite,
    addStoreContact,
    deleteStoreContact,
    setViewedUserInfo,
    setContactRemark,
    deepGetUserInfo,
    clearContactNoticeUnReadCount,
    clear
  };
});