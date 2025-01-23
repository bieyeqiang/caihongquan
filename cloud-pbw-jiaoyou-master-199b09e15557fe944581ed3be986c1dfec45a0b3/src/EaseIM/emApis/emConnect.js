import { EMClient } from '../index';
const emConnect = () => {
  const loginWithPassword = (hxUserId, hxPassword) => {
    if (!hxUserId || !hxPassword) throw Error('empty params');
    return new Promise((resolve, reject) => {
      EMClient.open({
        user: hxUserId,
        pwd: hxPassword,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
  const loginWithAccessToken = (hxUserId, hxAccessToken) => {
    if (!hxUserId || !hxAccessToken) throw Error('empty params');
    return new Promise((resolve, reject) => {
      EMClient.open({
        user: hxUserId,
        accessToken: hxAccessToken,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
  const registerUser = (username, password) => {
    if (!username || !password) throw Error('empty params');
    return new Promise((resolve, reject) => {
      EMClient.registerUser({
        username: username,
        password: password,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
  const closeEaseIM = () => {
    EMClient.close();
  };
  return {
    loginWithPassword,
    loginWithAccessToken,
    closeEaseIM,
	registerUser
  };
};
export default emConnect;
