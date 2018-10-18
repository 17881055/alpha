import axios from 'axios';
import store from '@store';
import whitelist from './whitelist';
import helper from '@helper';

export default {
  use() {
    axios.interceptors.response.use(
      response => {
        response.content = response.data.content;
        response.result = response.data.result;
        response.errorMsg = response.data.errorMsg;

        const errorMsg = response.errorMsg;
        const url = response.config.url;

        // 已经在页面显示错误的，跳过
        const isPass = whitelist.indexOf(url) !== -1;
        console.log('response.result', response.result);
        if (!response.result) {
          const info = response.data.info;
          if (info) {
            const duration = 1500;
            store.dispatch('setNotifierState', {
              show: true,
              text: '您未登录或者账号已过期，请重新登录',
              duration
            });
            setTimeout(() => {
              store.dispatch('logout');
              helper.goUrl(info[0].msg);
            }, duration + 500);
            return;
          }
        }
        if (response.result === 'error') {
          if (!isPass && errorMsg) {
            store.dispatch('setNotifierState', {
              show: true,
              text: errorMsg
            });
          }
          return Promise.reject({
            errorMsg: errorMsg,
            errorCode: response.data.intErrorCode
          });
        }
        return response;
      },
      err => {
        if (!err.response) {
          const duration = 1500;
          store.dispatch('setNotifierState', {
            show: true,
            text: '您未登录或者账号已过期，请重新登录',
            duration
          });
          setTimeout(() => {
            store.dispatch('logout');
            helper.goUrl();
          }, duration + 500);
          return;
        }
        if (err && err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            // store.dispatch("logout");
            // helper.goUrl();
            // router.replace({
            //   path: "login",
            //   query: { redirect: router.currentRoute.fullPath }
            // });
            return Promise.reject();
          }
          if (err.response.status >= 400) {
            return Promise.reject({
              errorMsg: '请求出错了！'
            });
          }
        }
      }
    );
  }
};
