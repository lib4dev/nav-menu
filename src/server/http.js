import axios from 'axios';
const Qs = require('qs');
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://api.sso2.100bm.cn:6688";

let AUTH_TOKEN=(function(){
  return sessionStorage.getItem("__jwt__");
});

//http request 拦截器
axios.interceptors.request.use(
  config => {
    if (AUTH_TOKEN != null){
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        '__jwt__': AUTH_TOKEN()
      }
    }else{
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
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
    if (response.status == 403) {
      router.push({
        path: "/member/login",
        querry: {
          redirect: router.currentRoute.fullPath
        } //从哪个页面跳转
      })
    }
    if (response.headers.__jwt__ != '' && response.headers.__jwt__ != null) {
      //console.log(response.headers.__jwt__)
      sessionStorage.setItem("__jwt__",response.headers.__jwt__);
    }

    return response;
  },
  error => {
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
