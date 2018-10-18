import { login, logout, getUserInfo } from '@/api/user';
import { setToken, getToken } from '@/libs/util';
import iconAvatar from '@/assets/images/IDR_PROFILE_AVATAR_13@2x.png';

var super_admin = {
  name: 'super_admin',
  user_id: '1',
  access: ['super_admin', 'admin'],
  token: 'super_admin',
  avator: 'a0e88e83800f138b94d2414621bd9704'
};

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: iconAvatar,
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator(state, avatorPath) {
      // state.avatorImgPath = avatorPath;
    },
    setUserId(state, id) {
      state.userId = id;
    },
    setUserName(state, name) {
      state.userName = name;
    },
    setAccess(state, access) {
      state.access = access;
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    }
  },
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password }) {
      userName = userName.trim();
      return new Promise((resolve, reject) => {
        commit('setToken', super_admin.token);
        resolve();
        /*   login({
          userName,
          password
        })
          .then(res => {
            const data = res.data;
            commit('setToken', data.token);
            resolve();
          })
          .catch(err => {
            reject(err);
          }); */
      });
    },
    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('setToken', '');
            commit('setAccess', []);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      });
    },
    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        /*  commit('setAvator', super_admin.avator);
        commit('setUserName', super_admin.user_name);
        commit('setUserId', super_admin.user_id);
        commit('setAccess', super_admin.access);
        resolve(super_admin); */

        getUserInfo(state.token)
          .then(res => {
            const data = res.data;
            commit('setAvator', super_admin.avator);
            commit('setUserName', super_admin.user_name);
            commit('setUserId', super_admin.user_id);
            commit('setAccess', super_admin.access);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
