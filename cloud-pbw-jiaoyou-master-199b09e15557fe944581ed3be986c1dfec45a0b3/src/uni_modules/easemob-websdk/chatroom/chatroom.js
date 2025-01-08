!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.websdk=r():e.websdk=r()}(this,(function(){return(this.webpackChunkwebsdk=this.webpackChunkwebsdk||[]).push([[758],{9667:function(e,r,t){t.r(r),t.d(r,{addUsersToChatRoom:function(){return E},addUsersToChatRoomAllowlist:function(){return J},addUsersToChatRoomWhitelist:function(){return W},blockChatRoomMember:function(){return w},blockChatRoomMembers:function(){return B},chatRoomBlockMulti:function(){return Z},chatRoomBlockSingle:function(){return P},createChatRoom:function(){return h},deleteChatRoomSharedFile:function(){return ce},destroyChatRoom:function(){return p},disableSendChatRoomMsg:function(){return F},enableSendChatRoomMsg:function(){return G},fetchChatRoomAnnouncement:function(){return oe},fetchChatRoomSharedFileList:function(){return se},getChatRoomAdmin:function(){return _},getChatRoomAllowlist:function(){return $},getChatRoomAttributes:function(){return ue},getChatRoomBlacklist:function(){return X},getChatRoomBlacklistNew:function(){return L},getChatRoomBlocklist:function(){return K},getChatRoomDetails:function(){return l},getChatRoomMuteList:function(){return O},getChatRoomMuted:function(){return N},getChatRoomMutelist:function(){return U},getChatRoomSharedFilelist:function(){return ie},getChatRoomWhitelist:function(){return Q},getChatRooms:function(){return m},isChatRoomWhiteUser:function(){return ee},isInChatRoomAllowlist:function(){return re},isInChatRoomMutelist:function(){return te},joinChatRoom:function(){return I},leaveChatRoom:function(){return A},listChatRoomMember:function(){return S},listChatRoomMembers:function(){return C},modifyChatRoom:function(){return d},muteChatRoomMember:function(){return j},quitChatRoom:function(){return g},removeChatRoomAdmin:function(){return v},removeChatRoomAllowlistMember:function(){return q},removeChatRoomAttribute:function(){return le},removeChatRoomAttributes:function(){return pe},removeChatRoomBlockMulti:function(){return z},removeChatRoomBlockSingle:function(){return x},removeChatRoomMember:function(){return f},removeChatRoomMembers:function(){return y},removeChatRoomWhitelistMember:function(){return Y},removeMultiChatRoomMember:function(){return T},removeMuteChatRoomMember:function(){return M},removeSingleChatRoomMember:function(){return R},rmUsersFromChatRoomWhitelist:function(){return V},setChatRoomAdmin:function(){return k},setChatRoomAttribute:function(){return he},setChatRoomAttributes:function(){return me},unblockChatRoomMember:function(){return D},unblockChatRoomMembers:function(){return H},unmuteChatRoomMember:function(){return b},updateChatRoomAnnouncement:function(){return ae},uploadChatRoomSharedFile:function(){return ne}}),t(1539),t(8674),t(8309),t(2526),t(1817),t(2222),t(9753),t(9600),t(2165),t(6992),t(8783),t(3948);var o=t(5531),a=t(7252),n=t(4370),c=t(3246),s=t(7360),i=t(1595);function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function m(e){var r=this;if("number"!=typeof e.pagenum||"number"!=typeof e.pagesize)throw Error("Invalid parameter");if(!c.XZ.call(this)){var t=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(t)}var u={pagenum:e.pagenum||1,pagesize:e.pagesize||20},m=this.context,h=m.orgName,p=m.appName,l=m.accessToken,d={url:this.apiUrl+"/"+h+"/"+p+"/chatrooms",dataType:"json",type:"GET",headers:{Authorization:"Bearer "+l},data:u,success:function(r){"function"==typeof e.success&&e.success(r)},error:function(t){t.error&&t.error_description&&r.onError&&r.onError({type:o.E.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,message:t.error_description,data:t}),"function"==typeof e.error&&e.error(t)}};return s.kg.debug("Call getChatRooms",e),n.hj.call(this,d,i.fI.GET_CHATROOM_LIST)}function h(e){if("string"!=typeof e.name)throw Error("Invalid parameter");if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t={name:e.name,description:e.description,maxusers:e.maxusers,owner:this.user,members:e.members},u=this.context,m=u.orgName,h=u.appName,p=(u.accessToken,u.jid),l={url:"".concat(this.apiUrl,"/").concat(m,"/").concat(h,"/chatrooms?resource=").concat(p.clientResource),dataType:"json",type:"POST",data:JSON.stringify(t),headers:{Authorization:"Bearer "+e.token||0,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call createChatRoom",e),n.hj.call(this,l,i.fI.CREATE_CHATROOM)}function p(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error("Invalid parameter");if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=(t.accessToken,t.jid),p={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(e.chatRoomId,"?resource=").concat(h.clientResource),dataType:"json",type:"DELETE",headers:{Authorization:"Bearer "+e.token||0},success:e.success,error:e.error};return s.kg.debug("Call destroyChatRoom",e),n.hj.call(this,p,i.fI.DESTROY_CHATROOM)}function l(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error("Invalid parameter");if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p={url:this.apiUrl+"/"+u+"/"+m+"/chatrooms/"+e.chatRoomId,dataType:"json",type:"GET",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call getChatRoomDetails",e),n.hj.call(this,p,i.fI.GET_CHATROOM_DETAIL)}function d(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error("Invalid parameter");if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d={groupname:e.chatRoomName,description:e.description,maxusers:e.maxusers},R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"?resource=").concat(p.clientResource),type:"PUT",data:JSON.stringify(d),dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call modifyChatRoom",e),n.hj.call(this,R,i.fI.MODIFY_CHATROOM)}function R(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId||"string"!=typeof e.username)throw Error("Invalid parameter");if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d=e.username,R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/users/").concat(d,"?resource=").concat(p.clientResource),type:"DELETE",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call removeChatRoomMember",e),n.hj.call(this,R,i.fI.REMOVE_CHATROOM_MEMBER)}var f=R;function T(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId||!Array.isArray(e.users))throw Error("Invalid parameter");if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=e.chatRoomId,u=e.users.join(","),m=this.context,h=m.orgName,p=m.appName,l=m.accessToken,d=m.jid,R={url:"".concat(this.apiUrl,"/").concat(h,"/").concat(p,"/chatrooms/").concat(t,"/users/").concat(u,"?resource=").concat(d.clientResource),type:"DELETE",dataType:"json",headers:{Authorization:"Bearer "+l,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call removeChatRoomMembers",e),n.hj.call(this,R,i.fI.MULTI_REMOVE_CHATROOM_MEMBER)}var y=T;function E(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId||!Array.isArray(e.users))throw Error("Invalid parameter");if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=e.chatRoomId,u={usernames:e.users},m=this.context,h=m.orgName,p=m.appName,l=m.accessToken,d=m.jid,R={url:"".concat(this.apiUrl,"/").concat(h,"/").concat(p,"/chatrooms/").concat(t,"/users?resource=").concat(d.clientResource),type:"POST",data:JSON.stringify(u),dataType:"json",headers:{Authorization:"Bearer "+l,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call addUsersToChatRoom",e),n.hj.call(this,R,i.fI.ADD_USERS_TO_CHATROOM)}function I(e){if("string"!=typeof e.roomId||""===e.roomId)throw Error("Invalid parameter");if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}return s.kg.debug("Call joinChatRoom",e),this.mSync.handleChatRoom(e,"join")}function g(e){if("string"!=typeof e.roomId||""===e.roomId)throw Error("Invalid parameter");if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}return s.kg.debug("Call leaveChatRoom",e),this.mSync.handleChatRoom(e,"leave")}var A=g;function S(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(isNaN(e.pageNum)||e.pageNum<=0)throw Error('The parameter "pageNum" should be a positive number');if(isNaN(e.pageSize)||e.pageSize<=0)throw Error('The parameter "pageSize" should be a positive number');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t={pagenum:e.pageNum,pagesize:e.pageSize},u=this.context,m=u.orgName,h=u.appName,p=u.accessToken,l={url:this.apiUrl+"/"+m+"/"+h+"/chatrooms/"+e.chatRoomId+"/users",dataType:"json",type:"GET",data:t,headers:{Authorization:"Bearer "+p,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call listChatRoomMembers",e),n.hj.call(this,l,i.fI.LIST_CHATROOM_MEMBERS)}var C=S;function _(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=e.chatRoomId,l={url:this.apiUrl+"/"+u+"/"+m+"/chatrooms/"+p+"/admin",dataType:"json",type:"GET",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call getChatRoomAdmin",e),n.hj.call(this,l,i.fI.GET_CHATROOM_ADMIN)}function k(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if("string"!=typeof e.username||""===e.username)throw Error('Invalid parameter: "username"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d={newadmin:e.username},R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/admin?resource=").concat(p.clientResource),type:"POST",dataType:"json",data:JSON.stringify(d),headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call setChatRoomAdmin",e),n.hj.call(this,R,i.fI.SET_CHATROOM_ADMIN)}function v(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if("string"!=typeof e.username||""===e.username)throw Error('Invalid parameter: "username"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d=e.username,R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/admin/").concat(d,"?resource=").concat(p.clientResource),type:"DELETE",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call removeChatRoomAdmin",e),n.hj.call(this,R,i.fI.REMOVE_CHATROOM_ADMIN)}function j(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "groupId"');if("string"!=typeof e.username||""===e.username)throw Error('Invalid parameter: "username"');if("number"!=typeof e.muteDuration)throw Error('Invalid parameter: "muteDuration"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d={usernames:[e.username],mute_duration:e.muteDuration},R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/mute?resource=").concat(p.clientResource),dataType:"json",type:"POST",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},data:JSON.stringify(d),success:e.success,error:e.error};return s.kg.debug("Call muteChatRoomMember",e),n.hj.call(this,R,i.fI.MUTE_CHATROOM_MEMBER)}function M(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if("string"!=typeof e.username||""===e.username)throw Error('Invalid parameter: "username"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d=e.username,R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/mute/").concat(d,"?resource=").concat(p.clientResource),dataType:"json",type:"DELETE",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call unmuteChatRoomMember",e),n.hj.call(this,R,i.fI.REMOVE_MUTE_CHATROOM_MEMBER)}var b=M;function N(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=e.chatRoomId,l={url:this.apiUrl+"/"+u+"/"+m+"/chatrooms/"+p+"/mute",dataType:"json",type:"GET",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call getChatRoomMutelist",e),n.hj.call(this,l,i.fI.GET_MUTE_CHATROOM_MEMBERS)}var O=N,U=N;function P(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if("string"!=typeof e.username||""===e.username)throw Error('Invalid parameter: "username"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d=e.username,R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/blocks/users/").concat(d,"?resource=").concat(p.clientResource),type:"POST",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call blockChatRoomMember",e),n.hj.call(this,R,i.fI.SET_CHATROOM_MEMBER_TO_BLACK)}var w=P;function Z(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!Array.isArray(e.usernames))throw Error('Invalid parameter: "usernames"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d={usernames:e.usernames},R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/blocks/users?resource=").concat(p.clientResource),data:JSON.stringify(d),type:"POST",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Chat blockChatRoomMembers:",R),n.hj.call(this,R,i.fI.MULTI_SET_CHATROOM_MEMBER_TO_BLACK)}var B=Z;function x(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if("string"!=typeof e.username||""===e.username)throw Error('Invalid parameter: "username"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d=e.username,R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/blocks/users/").concat(d,"?resource=").concat(p.clientResource),type:"DELETE",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call unblockChatRoomMember",e),n.hj.call(this,R,i.fI.REMOVE_CHATROOM_MEMBER_BLACK)}var D=x;function z(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!Array.isArray(e.usernames))throw Error('Invalid parameter: "usernames"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d=e.usernames.join(","),R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/blocks/users/").concat(d,"?resource=").concat(p.clientResource),type:"DELETE",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call unblockChatRoomMembers",e),n.hj.call(this,R,i.fI.MULTI_REMOVE_CHATROOM_MEMBER_BLACK)}var H=z;function L(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=e.chatRoomId,l={url:this.apiUrl+"/"+u+"/"+m+"/chatrooms/"+p+"/blocks/users",type:"GET",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call getChatRoomBlocklist",e),n.hj.call(this,l,i.fI.GET_CHATROOM_BLOCK_MEMBERS)}var X=L,K=L;function F(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/ban?resource=").concat(p.clientResource),type:"POST",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call disableSendChatRoomMsg",e),n.hj.call(this,d,i.fI.DISABLED_CHATROOM_SEND_MSG)}function G(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/ban?resource=").concat(p.clientResource),type:"DELETE",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call enableSendChatRoomMsg",e),n.hj.call(this,d,i.fI.ENABLE_CHATROOM_SEND_MSG)}function W(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!Array.isArray(e.users))throw Error('Invalid parameter: "users"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d={usernames:e.users},R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/white/users?resource=").concat(p.clientResource),type:"POST",data:JSON.stringify(d),dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call addUsersToChatRoomWhitelist",e),n.hj.call(this,R,i.fI.ADD_USERS_TO_CHATROOM)}var J=W;function V(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if("string"!=typeof e.userName||""===e.userName)throw Error('Invalid parameter: "userName"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.chatRoomId,d={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/white/users/").concat(e.userName,"?resource=").concat(p.clientResource),type:"DELETE",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call removeChatRoomAllowlistMember",e),n.hj.call(this,d,i.fI.REMOVE_CHATROOM_WHITE_USERS)}var Y=V,q=V;function Q(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=e.chatRoomId,l={url:this.apiUrl+"/"+u+"/"+m+"/chatrooms/"+p+"/white/users",type:"GET",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call getChatRoomAllowlist",e),n.hj.call(this,l,i.fI.GET_CHATROOM_WHITE_USERS)}var $=Q;function ee(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if("string"!=typeof e.userName||""===e.userName)throw Error('Invalid parameter: "userName"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=e.chatRoomId,l={url:this.apiUrl+"/"+u+"/"+m+"/chatrooms/"+p+"/white/users/"+e.userName,type:"GET",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call isInChatRoomAllowlist",e),n.hj.call(this,l,i.fI.CHECK_CHATROOM_WHITE_USER)}var re=ee;function te(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error('Invalid parameter: "chatRoomId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,i=t.orgName,u=t.appName,m=t.accessToken,h=t.userId,p={url:this.apiUrl+"/"+i+"/"+u+"/sdk/chatrooms/"+e.chatRoomId+"/mute/"+h,dataType:"json",type:"GET",headers:{Authorization:"Bearer "+m}};return s.kg.debug("Call isInChatRoomMutelist",e),n.hj.call(this,p).then((function(e){return e.data}))}function oe(e){if("string"!=typeof e.roomId||""===e.roomId)throw Error('Invalid parameter: "roomId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=e.roomId,l={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(p,"/announcement"),type:"GET",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call fetchChatRoomAnnouncement",e),n.hj.call(this,l,i.fI.GET_CHATROOM_ANN)}function ae(e){if("string"!=typeof e.roomId||""===e.roomId)throw Error('Invalid parameter: "roomId"');if("string"!=typeof e.announcement)throw Error('Invalid parameter: "announcement"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.roomId,d={announcement:e.announcement},R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/announcement?resource=").concat(p.clientResource),type:"POST",dataType:"json",data:JSON.stringify(d),headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call updateChatRoomAnnouncement:",e),n.hj.call(this,R,i.fI.UPDATE_CHATROOM_ANN)}function ne(e){if("string"!=typeof e.roomId||""===e.roomId)throw Error('Invalid parameter: "roomId"');if("object"!==u(e.file))throw Error('Invalid parameter: "file"');if(c.XZ.call(this)){var r=this.context,t=r.orgName,o=r.appName,a=r.accessToken,m=r.jid,h=e.roomId;n.cT.call(this,{uploadUrl:"".concat(this.apiUrl,"/").concat(t,"/").concat(o,"/chatrooms/").concat(h,"/share_files?resource=").concat(m.clientResource),onFileUploadProgress:e.onFileUploadProgress,onFileUploadComplete:e.onFileUploadComplete,onFileUploadError:e.onFileUploadError,onFileUploadCanceled:e.onFileUploadCanceled,accessToken:a,apiUrl:this.apiUrl,file:e.file,appKey:this.context.appKey},i.fI.UPLOAD_CHATROOM_FILE),s.kg.debug("Call uploadChatRoomSharedFile",e)}}function ce(e){if("string"!=typeof e.roomId||""===e.roomId)throw Error('Invalid parameter: "roomId"');if("string"!=typeof e.fileId||""===e.fileId)throw Error('Invalid parameter: "fileId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.jid,l=e.roomId,d=e.fileId,R={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(l,"/share_files/").concat(d,"?resource=").concat(p.clientResource),type:"DELETE",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"},success:e.success,error:e.error};return s.kg.debug("Call deleteChatRoomSharedFile",e),n.hj.call(this,R,i.fI.DELETE_CHATROOM_FILE)}function se(e){if("string"!=typeof e.roomId||""===e.roomId)throw Error('Invalid parameter: "roomId"');if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=e.roomId,l={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/chatrooms/").concat(p,"/share_files"),type:"GET",dataType:"json",headers:{Authorization:"Bearer "+h,"Content-Type":"application/json",accept:"application/json"},success:e.success,error:e.error};return s.kg.debug("Call fetchChatRoomSharedFileList",e),n.hj.call(this,l,i.fI.GET_CHATROOM_FILES)}var ie=se;function ue(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error("Invalid parameter chatRoomId: "+e.chatRoomId);if(e.attributeKeys&&!Array.isArray(e.attributeKeys))throw Error('"Invalid parameter attributeKeys": '+e.attributeKeys);if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=(t.jid,e.chatRoomId),l={keys:e.attributeKeys},d={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/metadata/chatroom/").concat(p),type:"POST",dataType:"json",data:JSON.stringify(l),headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"}};return s.kg.debug("Call getChatRoomAttributes:",e),n.hj.call(this,d,i.fI.GET_CHATROOM_ATTR).then((function(e){return{data:e.data,type:e.type}}))}function me(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error("Invalid parameter chatRoomId: "+e.chatRoomId);if("object"!==u(e.attributes))throw Error("Invalid parameter attributes: "+e.attributes);if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,m=t.orgName,h=t.appName,p=t.accessToken,l=t.userId,d=e.chatRoomId,R=e.attributes,f=e.autoDelete,T=void 0===f||f,y=e.isForced?"/forced":"",E={metaData:R,autoDelete:T?"DELETE":"NO_DELETE"},I={url:"".concat(this.apiUrl,"/").concat(m,"/").concat(h,"/metadata/chatroom/").concat(d,"/user/").concat(l)+y,type:"PUT",dataType:"json",data:JSON.stringify(E),headers:{Authorization:"Bearer "+p,"Content-Type":"application/json"}};return s.kg.debug("Call setChatRoomAttributes:",e),n.hj.call(this,I,i.fI.SET_CHATROOM_ATTR).then((function(e){return(0,c._W)(e)}))}function he(e){var r;if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error("Invalid parameter chatRoomId: "+e.chatRoomId);if("string"!=typeof e.attributeKey||""===e.attributeKey)throw Error("Invalid parameter attributeKey: "+e.attributeKey);if("string"!=typeof e.attributeValue||""===e.attributeValue)throw Error("Invalid parameter attributeValue: "+e.attributeValue);if(!c.XZ.call(this)){var t=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(t)}var u=this.context,m=u.orgName,h=u.appName,p=u.accessToken,l=u.userId,d=e.chatRoomId,R=e.attributeKey,f=e.attributeValue,T=e.autoDelete,y=void 0===T||T,E=e.isForced?"/forced":"",I={metaData:(r={},r[R]=f,r),autoDelete:y?"DELETE":"NO_DELETE"},g={url:"".concat(this.apiUrl,"/").concat(m,"/").concat(h,"/metadata/chatroom/").concat(d,"/user/").concat(l)+E,type:"PUT",dataType:"json",data:JSON.stringify(I),headers:{Authorization:"Bearer "+p,"Content-Type":"application/json"}};return s.kg.debug("Call setChatRoomAttribute:",e),n.hj.call(this,g,i.fI.SET_CHATROOM_ATTR).then((function(e){var r=(0,c.H7)(e);if(r)throw r}))}function pe(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error("Invalid parameter chatRoomId: "+e.chatRoomId);if(!Array.isArray(e.attributeKeys))throw Error('"Invalid parameter attributes": '+e.attributeKeys);if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.userId,l=e.chatRoomId,d=e.attributeKeys,R=e.isForced?"/forced":"",f={keys:d},T={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/metadata/chatroom/").concat(l,"/user/").concat(p)+R,type:"DELETE",dataType:"json",data:JSON.stringify(f),headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"}};return s.kg.debug("Call removeChatRoomAttributes:",e),n.hj.call(this,T,i.fI.DELETE_CHATROOM_ATTR).then((function(e){return(0,c._W)(e)}))}function le(e){if("string"!=typeof e.chatRoomId||""===e.chatRoomId)throw Error("Invalid parameter chatRoomId: "+e.chatRoomId);if("string"!=typeof e.attributeKey||""===e.attributeKey)throw Error('"Invalid parameter attributeKey": '+e.attributeKey);if(!c.XZ.call(this)){var r=a.Z.create({type:o.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,u=t.orgName,m=t.appName,h=t.accessToken,p=t.userId,l=e.chatRoomId,d=e.attributeKey,R=e.isForced?"/forced":"",f={keys:[d]},T={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(m,"/metadata/chatroom/").concat(l,"/user/").concat(p)+R,type:"DELETE",dataType:"json",data:JSON.stringify(f),headers:{Authorization:"Bearer "+h,"Content-Type":"application/json"}};return s.kg.debug("Call removeChatRoomAttribute:",e),n.hj.call(this,T,i.fI.DELETE_CHATROOM_ATTR).then((function(e){var r=(0,c.H7)(e);if(r)throw r}))}},3246:function(e,r,t){t.d(r,{H7:function(){return u},XZ:function(){return s},_W:function(){return i}}),t(7941),t(9554),t(1539),t(4747),t(6699),t(2023);var o=t(5531),a=t(7252);function n(){var e=this.context.appName,r=this.context.orgName;return!(!e||!r)||(this.onError&&this.onError({type:o.E.WEBIM_CONNCTION_AUTH_ERROR,message:"appName or orgName is illegal"}),!1)}function c(){var e;if(!this.context.accessToken){var r=a.Z.create({type:o.E.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR,message:"token not assign error"});return this.onError&&this.onError(r),null===(e=this.eventHandler)||void 0===e||e.dispatch("onError",r),!1}return!0}function s(){return c.call(this)&&n.call(this)}function i(e){var r=e.data,t=e.type;return{data:{status:Object.keys(r.errorKeys).length>0?"fail":"success",errorKeys:r.errorKeys,successKeys:r.successKeys},type:t}}function u(e){var r=e.data,t=void 0;return Object.keys(r.errorKeys).length>0&&Object.keys(r.errorKeys).forEach((function(e){var n=r.errorKeys[e];t=n.includes("is not part of you")?a.Z.create({type:o.E.NO_PERMISSION,message:n}):n.includes("size of metadata for this single chatroom exceeds the user defined limit")||n.includes("total size of chatroom metadata for this app exceeds the user defined limit")||n.includes("is exceeding maximum limit")?a.Z.create({type:o.E.MAX_LIMIT,message:n}):n.includes("is not Legal")?a.Z.create({type:o.E.REQUEST_PARAMETER_ERROR,message:n}):n.includes("Failed to update userMetadata. Concurrent updates not allowed")?a.Z.create({type:o.E.OPERATION_NOT_ALLOWED,message:n}):a.Z.create({type:o.E.WEBIM_CONNCTION_AJAX_ERROR,message:n})})),t}}},function(e){return 9667,e(e.s=9667)}])}));