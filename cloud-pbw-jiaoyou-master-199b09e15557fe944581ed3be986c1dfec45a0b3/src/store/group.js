import { defineStore } from "pinia";
import { useConnStore } from "./conn";
import { useAppUserStore } from "./appUser";
import { ref } from "vue";
import { DEFAULT_GROUP_MEMBER_COUNT, GET_GROUP_MEMBERS_PAGESIZE } from "@/const/index";

export const useGroupStore = defineStore("group", () => {
  const joinedGroupList = ref([]);
  /** 群组详情Map */
  const groupDetailMap = ref(new Map());

  const groupNoticeInfo = ref({
    list: [],
    unReadCount: 0
  });

  const appUserStore = useAppUserStore();

  const { getUsersInfo } = appUserStore;

  const viewedGroupInfo = ref({});

  const { getChatConn } = useConnStore();
  const conn = getChatConn();

  // 是否已获取完全部已加入群组
  const isJoinedGroupListLast = ref(true);
  const getJoinedGroupListParams = ref({
    pageSize: 20, // 最大支持20
    pageNum: 0,
    needAffiliations: true,
    needRole: true
  });

  /** 获取已加入的群组 */
  const getJoinedGroupList = () => {
    conn.getJoinedGroups(getJoinedGroupListParams.value).then((res) => {
      if (res.entities) {
        setJoinedGroupList(res.entities);
        if (res.entities.length < getJoinedGroupListParams.value.pageSize) {
          isJoinedGroupListLast.value = true;
        } else {
          getJoinedGroupListParams.value.pageNum++;
          getJoinedGroupList();
        }
      }
    });
  };

  /** 设置已加入的群列表 */
  const setJoinedGroupList = (groups) => {
    let currentGroupIds = joinedGroupList.value.map((item) => item.groupId);
    let filterJoinedGroups = groups.filter(
      ({ groupId }) => !currentGroupIds.find((id) => id === groupId)
    );

    filterJoinedGroups.forEach((groupItem) => {
      joinedGroupList.value.push(groupItem);
    });
  };

  /** 申请加入群组 */
  const applyJoinGroup = (groupId) => {
    return conn
      .joinGroup({
        groupId: groupId,
        message: "apply join group"
      })
      .then((res) => {
        return res;
      });
  };

  /** 创建群组 */
  const createGroup = (params) => {
    return conn
      .createGroup({
        ...params
      })
      .then((res) => {
        joinedGroupList.value.unshift({
          groupId: res?.data?.groupid || "",
          groupName: params.data.groupname,
          role: "owner",
          disabled: false,
          public: params.data.public
        });
        return res;
      });
  };

  /** 删除Store中的群组 */
  const removeStoreGroup = (groupId) => {
    let index = joinedGroupList.value.findIndex(
      (group) => group.groupId === groupId
    );
    if (index !== -1) {
      joinedGroupList.value.splice(index, 1);
    }
  };

  /** 删除Store中的群组成员 */
  const removeStoreGroupUser = (groupId, userIds) => {
    let group = groupDetailMap.value.get(groupId);
    if (group) {
      group.affiliations = group.affiliations.filter((affiliation) => {
        return !userIds.includes(affiliation.member || affiliation.owner);
      });
      group.affiliations_count = group.affiliations_count - userIds.length;
      groupDetailMap.value.set(groupId, group);
    }
  };

  /** 解散群组 */
  const destroyGroup = (groupId) => {
    return conn
      .destroyGroup({
        groupId
      })
      .then((res) => {
        removeStoreGroup(groupId);
        return res;
      });
  };

  /** 获取群组详情 */
  const getGroupInfo = (groupId) => {
    return conn
      .getGroupInfo({
        groupId
      })
      .then((res) => {
        res.data?.forEach((info) => {
          groupDetailMap.value.set(info.id, info);
          // 获取默认展示的群组成员属性
          const userIdList = info.affiliations
            .map((affiliation) => {
              return affiliation.member || affiliation.owner;
            })
            .slice(0, DEFAULT_GROUP_MEMBER_COUNT);
          // 获取群组成员的用户属性
          getUsersInfo({
            userIdList
          });
        });
        return res;
      });
  };

  /** 添加群组通知 */
  const addGroupNotice = (event) => {
    groupNoticeInfo.value.list.unshift(event);
    groupNoticeInfo.value.unReadCount++;
  };

  const setViewedGroupInfo = (group) => {
    viewedGroupInfo.value = group;
  };

  /** 邀请加入群组 */
  const inviteJoinGroup = (groupId, members) => {
    return conn.inviteUsersToGroup({
      groupId,
      users: members
    });
  };

  /** 移除群组成员 */
  const removeUserFromGroup = (groupId, members) => {
    return conn
      .removeGroupMembers({
        groupId,
        users: members
      })
      .then((res) => {
        removeStoreGroupUser(groupId, members);
        return res;
      });
  };

  /** 分页获取群组成员 */
  const getGroupMembers = (groupId, pageNum) => {
    return conn
      .listGroupMembers({
        groupId,
        pageNum,
        pageSize: GET_GROUP_MEMBERS_PAGESIZE
      })
      .then((res) => {
        // 获取群组成员的用户属性
        getUsersInfo({
          userIdList: res.data.map((item) => item.member || item.owner) || []
        });
        return res;
      });
  };

  /** 退出群组 */
  const leaveGroup = (groupId) => {
    return conn
      .leaveGroup({
        groupId
      })
      .then((res) => {
        // 获取群组成员的用户属性
        removeStoreGroup(groupId);
        return res;
      });
  };

  /** 从Store获取群组信息 */
  const getGroupInfoFromStore = (groupId) => {
    return joinedGroupList.value.find((group) => group.groupId === groupId);
  };

  /** 清空群组通知未读数 */
  const clearGroupNoticeUnReadCount = () => {
    groupNoticeInfo.value.unReadCount = 0;
  };

  /** 接收群组邀请 */
  const acceptGroupInvite = (groupId) => {
    return conn
      .acceptGroupInvite({
        invitee: conn.user,
        groupId
      })
      .then(async () => {
        let res = await getGroupInfo(groupId);
        const info = res.data?.[0];
        if (info) {
          setJoinedGroupList([
            {
              groupId: info.id,
              groupName: info.name,
              public: info.public,
              description: info.description,
              disabled: true,
              allowInvites: info.allowinvites,
              maxUsers: info.maxusers,
              approval: info.membersonly
            }
          ]);
        }
      });
  };

  /** 拒绝群组邀请 */
  const rejectGroupInvite = (groupId) => {
    return conn.rejectGroupInvite({
      invitee: conn.user,
      groupId
    });
  };

  const clear = () => {
    joinedGroupList.value = [];
    groupNoticeInfo.value = {
      list: [],
      unReadCount: 0
    };
    groupDetailMap.value.clear();
    viewedGroupInfo.value = {};
  };

  return {
    joinedGroupList,
    getJoinedGroupListParams,
    viewedGroupInfo,
    groupNoticeInfo,
    groupDetailMap,
    destroyGroup,
    setViewedGroupInfo,
    getJoinedGroupList,
    applyJoinGroup,
    createGroup,
    getGroupInfo,
    setJoinedGroupList,
    addGroupNotice,
    removeStoreGroup,
    inviteJoinGroup,
    removeUserFromGroup,
    getGroupMembers,
    clearGroupNoticeUnReadCount,
    getGroupInfoFromStore,
    leaveGroup,
    acceptGroupInvite,
    rejectGroupInvite,
    clear
  };
});