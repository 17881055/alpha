import axios from 'axios';
import store from '@/store';
// import { Spin } from 'iview'
class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    };
    return config;
  }
  distroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.distroy(url);
        const { data, status } = res;
        // 全局拦截，永平的SSO, if errorCode: "SSO00000001" 就跳转到SSO 登录页
        if (
          data &&
          data.errorCode &&
          data.errorCode.toString() === 'SSO00000001'
        ) {
          //
          var redirectUrl = window.location.href;
          setTimeout(() => {
            window.location.href = `${data.content}${redirectUrl}`;
          }, 0);
          return;
        }
        return { data, status };
      },
      error => {
        this.distroy(url);
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
