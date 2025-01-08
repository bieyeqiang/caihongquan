!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.websdk=r():e.websdk=r()}(this,(function(){return(this.webpackChunkwebsdk=this.webpackChunkwebsdk||[]).push([[883],{1735:function(e,r,t){t.r(r),t.d(r,{clearRemindTypeForConversation:function(){return l},getPushPerformLanguage:function(){return m},getSilentModeForAll:function(){return p},getSilentModeForConversation:function(){return d},getSilentModeForConversations:function(){return f},setPushPerformLanguage:function(){return h},setSilentModeForAll:function(){return c},setSilentModeForConversation:function(){return u}}),t(7941),t(1539),t(8674),t(2222),t(9753),t(9554),t(4747),t(9600);var o=t(4370),n=t(3246),a=t(7252),s=t(5531),i=t(7360);function c(e){if(!(e.options instanceof Object))throw Error('Invalid parameter: "options"');var r=e.options.paramType;if("number"!=typeof r||r<0||r>2)throw Error('Invalid parameter: "options of paramType"');if(0===r){if("string"!=typeof e.options.remindType)throw Error('Invalid parameter: "options of remindType"')}else if(1===r){if("number"!=typeof e.options.duration)throw Error('Invalid parameter: "options of duration"')}else if(2===r){var t=e.options,c=t.startTime,p=t.endTime;if(!(c instanceof Object&&Object.keys(c).length))throw Error('Invalid parameter: "options of startTime"');if(!c.hours||"number"!=typeof c.hours||!c.minutes||"number"!=typeof c.minutes)throw Error('Invalid parameter: "options of startTime of hours or minutes"');if(!(p instanceof Object&&Object.keys(p).length))throw Error('Invalid parameter: "options of endTime"');if(!p.hours||"number"!=typeof p.hours||!p.minutes||"number"!=typeof p.minutes)throw Error('Invalid parameter: "options of endTime of hours or minutes"')}if(!n.XZ.call(this)){var u=a.Z.create({type:s.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(u)}var l=this.context,d=l.accessToken,f=l.orgName,h=l.appName,m=l.userId,y={};switch(r){case 0:y={type:e.options.remindType};break;case 1:y={ignoreDuration:e.options.duration};break;case 2:var g=e.options;c=g.startTime,p=g.endTime,y={ignoreInterval:"".concat(c.hours,":").concat(c.minutes,"-").concat(p.hours,":").concat(p.minutes)}}var T={url:"".concat(this.apiUrl,"/").concat(f,"/").concat(h,"/users/").concat(m,"/notification/user/").concat(m),type:"PUT",dataType:"json",data:JSON.stringify(y),headers:{Authorization:"Bearer "+d,"Content-Type":"application/json"},success:e.success,error:e.error};return i.kg.debug("Call setSilentModeForAll:",e),o.hj.call(this,T)}function p(e){if(!n.XZ.call(this)){var r=a.Z.create({type:s.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,c=t.accessToken,p=t.orgName,u=t.appName,l=t.userId,d={url:"".concat(this.apiUrl,"/").concat(p,"/").concat(u,"/users/").concat(l,"/notification/user/").concat(l),type:"GET",dataType:"json",headers:{Authorization:"Bearer "+c,"Content-Type":"application/json"},success:null==e?void 0:e.success,error:null==e?void 0:e.error};return i.kg.debug("Call getSilentModeForAll:",e),o.hj.call(this,d)}function u(e){if("string"!=typeof e.conversationId||!e.conversationId)throw Error('Invalid parameter: "conversationId"');if("string"!=typeof e.type||!e.type)throw Error('Invalid parameter: "type"');if(!(e.options instanceof Object))throw Error('Invalid parameter: "options"');var r=e.options.paramType;if("number"!=typeof r||r<0||r>2)throw Error('Invalid parameter: "options of paramType"');if(0===r){if("string"!=typeof e.options.remindType)throw Error('Invalid parameter: "options of remindType"')}else if(1===r){if("number"!=typeof e.options.duration)throw Error('Invalid parameter: "options of duration"')}else if(2===r){var t=e.options,c=t.startTime,p=t.endTime;if(!(c instanceof Object&&Object.keys(c).length))throw Error('Invalid parameter: "options of startTime"');if(!c.hours||"number"!=typeof c.hours||!c.minutes||"number"!=typeof c.minutes)throw Error('Invalid parameter: "options of startTime of hours or minutes"');if(!(p instanceof Object&&Object.keys(p).length))throw Error('Invalid parameter: "options of endTime"');if(!p.hours||"number"!=typeof p.hours||!p.minutes||"number"!=typeof p.minutes)throw Error('Invalid parameter: "options of endTime of hours or minutes"')}if(!n.XZ.call(this)){var u=a.Z.create({type:s.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(u)}var l=this.context,d=l.accessToken,f=l.orgName,h=l.appName,m=l.userId,y="chatgroup",g={};switch(r){case 0:g={type:e.options.remindType};break;case 1:g={ignoreDuration:e.options.duration};break;case 2:var T=e.options;c=T.startTime,p=T.endTime,g={ignoreInterval:"".concat(c.hours,":").concat(c.minutes,"-").concat(p.hours,":").concat(p.minutes)}}"singleChat"===e.type&&(y="user");var v={url:"".concat(this.apiUrl,"/").concat(f,"/").concat(h,"/users/").concat(m,"/notification/").concat(y,"/").concat(e.conversationId),type:"PUT",dataType:"json",data:JSON.stringify(g),headers:{Authorization:"Bearer "+d,"Content-Type":"application/json"},success:e.success,error:e.error};return i.kg.debug("Call setSilentModeForConversation:",e),o.hj.call(this,v)}function l(e){if("string"!=typeof e.conversationId||!e.conversationId)throw Error('Invalid parameter: "conversationId"');if("string"!=typeof e.type||!e.type)throw Error('Invalid parameter: "type"');if(!n.XZ.call(this)){var r=a.Z.create({type:s.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,c=t.accessToken,p=t.orgName,u=t.appName,l=t.userId,d="chatgroup";"singleChat"===e.type&&(d="user");var f={url:"".concat(this.apiUrl,"/").concat(p,"/").concat(u,"/users/").concat(l,"/notification/").concat(d,"/").concat(e.conversationId),type:"PUT",dataType:"json",data:JSON.stringify({type:"DEFAULT"}),headers:{Authorization:"Bearer "+c,"Content-Type":"application/json"},success:e.success,error:e.error};return i.kg.debug("Call clearRemindTypeForConversation:",e),o.hj.call(this,f)}function d(e){if("string"!=typeof e.conversationId||!e.conversationId)throw Error('Invalid parameter: "conversationId"');if("string"!=typeof e.type||!e.type)throw Error('Invalid parameter: "type"');if(!n.XZ.call(this)){var r=a.Z.create({type:s.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,c=t.accessToken,p=t.orgName,u=t.appName,l=t.userId,d="chatgroup";"singleChat"===e.type&&(d="user");var f={url:"".concat(this.apiUrl,"/").concat(p,"/").concat(u,"/users/").concat(l,"/notification/").concat(d,"/").concat(e.conversationId),type:"GET",dataType:"json",headers:{Authorization:"Bearer "+c,"Content-Type":"application/json"},success:e.success,error:e.error};return i.kg.debug("Call getSilentModeForConversation:",e),o.hj.call(this,f)}function f(e){if(!Array.isArray(e.conversationList))throw Error('Invalid parameter: "conversationList"');if(!n.XZ.call(this)){var r=a.Z.create({type:s.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,c=t.accessToken,p=t.orgName,u=t.appName,l=t.userId,d=[],f=[];e.conversationList.forEach((function(e){"singleChat"===e.type?d.push(e.id):f.push(e.id)}));var h=d.length?d.join(","):"",m=f.length?f.join(","):"",y={url:"".concat(this.apiUrl,"/").concat(p,"/").concat(u,"/users/").concat(l,"/notification?user=").concat(h,"&group=").concat(m),type:"GET",dataType:"json",headers:{Authorization:"Bearer "+c,"Content-Type":"application/json"},success:e.success,error:e.error};return i.kg.debug("Call getSilentModeForConversations:",e),o.hj.call(this,y)}function h(e){if("string"!=typeof e.language||!e.language)throw Error('Invalid parameter: "language"');if(!n.XZ.call(this)){var r=a.Z.create({type:s.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t={translationLanguage:e.language},c=this.context,p=c.accessToken,u=c.orgName,l=c.appName,d=c.userId,f={url:"".concat(this.apiUrl,"/").concat(u,"/").concat(l,"/users/").concat(d,"/notification/language"),type:"PUT",dataType:"json",data:JSON.stringify(t),headers:{Authorization:"Bearer "+p,"Content-Type":"application/json"},success:e.success,error:e.error};return i.kg.debug("Call setPushPerformLanguage:",e),o.hj.call(this,f)}function m(e){if(!n.XZ.call(this)){var r=a.Z.create({type:s.E.REST_PARAMS_STATUS,message:"appkey or token error"});return Promise.reject(r)}var t=this.context,c=t.accessToken,p=t.orgName,u=t.appName,l=t.userId,d={url:"".concat(this.apiUrl,"/").concat(p,"/").concat(u,"/users/").concat(l,"/notification/language"),type:"GET",dataType:"json",headers:{Authorization:"Bearer "+c,"Content-Type":"application/json"},success:null==e?void 0:e.success,error:null==e?void 0:e.error};return i.kg.debug("Call getPushPerformLanguage:",e),o.hj.call(this,d)}},3246:function(e,r,t){t.d(r,{H7:function(){return p},XZ:function(){return i},_W:function(){return c}}),t(7941),t(9554),t(1539),t(4747),t(6699),t(2023);var o=t(5531),n=t(7252);function a(){var e=this.context.appName,r=this.context.orgName;return!(!e||!r)||(this.onError&&this.onError({type:o.E.WEBIM_CONNCTION_AUTH_ERROR,message:"appName or orgName is illegal"}),!1)}function s(){var e;if(!this.context.accessToken){var r=n.Z.create({type:o.E.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR,message:"token not assign error"});return this.onError&&this.onError(r),null===(e=this.eventHandler)||void 0===e||e.dispatch("onError",r),!1}return!0}function i(){return s.call(this)&&a.call(this)}function c(e){var r=e.data,t=e.type;return{data:{status:Object.keys(r.errorKeys).length>0?"fail":"success",errorKeys:r.errorKeys,successKeys:r.successKeys},type:t}}function p(e){var r=e.data,t=void 0;return Object.keys(r.errorKeys).length>0&&Object.keys(r.errorKeys).forEach((function(e){var a=r.errorKeys[e];t=a.includes("is not part of you")?n.Z.create({type:o.E.NO_PERMISSION,message:a}):a.includes("size of metadata for this single chatroom exceeds the user defined limit")||a.includes("total size of chatroom metadata for this app exceeds the user defined limit")||a.includes("is exceeding maximum limit")?n.Z.create({type:o.E.MAX_LIMIT,message:a}):a.includes("is not Legal")?n.Z.create({type:o.E.REQUEST_PARAMETER_ERROR,message:a}):a.includes("Failed to update userMetadata. Concurrent updates not allowed")?n.Z.create({type:o.E.OPERATION_NOT_ALLOWED,message:a}):n.Z.create({type:o.E.WEBIM_CONNCTION_AJAX_ERROR,message:a})})),t}}},function(e){return 1735,e(e.s=1735)}])}));