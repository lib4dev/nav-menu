import axios from 'axios';
import router from '../router'
const Qs = require('qs');
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://api.sso2.100bm.cn:6688";


//http request 拦截器
axios.interceptors.request.use(
  config => {
  
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)' ; break;
        case 401:
          error.message = '未授权，请重新登录(401)'; break;
        case 403:
          router.push('/login')
          error.message = '拒绝访问(403)'; break;
        case 404:
          error.message = '请求出错(404)'; break;
        case 408:
          error.message = '请求超时(408)'; break;
        case 500:
          error.message = '服务器错误(500)'; break;
        case 501:
          error.message = '服务未实现(501)'; break;
        case 502:
          error.message = '网络错误(502)'; break;
        case 503:
          error.message = '服务不可用(503)'; break;
        case 504:
          error.message = '网络超时(504)'; break;
        case 505:
          error.message = 'HTTP版本不受支持(505)'; break;
        default:
          error.message = `连接出错(${err.response.status})!`;
      }
    }else{
      error.message = '连接服务器失败!'
    }
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        if (response.status == 200) {
          resolve(response.data);
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}





/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  data = Qs.stringify(data)
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response.status == 200) {
          resolve(response.data);
        }
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        if (response.status == 200) {
          resolve(response.data);
        }
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  data = Qs.stringify(data)
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        if (response.status == 200) {
          resolve(response.data);
        }
      }, err => {
        reject(err)
      })
  })
}


/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        if (response.status == 200) {
          resolve(response.data);
        }
      }, err => {
        reject(err)
      })
  })
}
