import Taro from '@tarojs/taro';
import Config from '../config/Config';

export default function request(url, options){
  let loading=null
  let { method, body } = options
    if (!url.indexOf("https://") > -1 || !url.indexOf("http://") > -1) {
      url = (!Config.noConsole?Config.SERVER_HOME_DEBUG:Config.SERVER_HOME_PRODUCTION) + (url.indexOf("/") === 0 ? url.substr(1) : url)
    }
    let option = {
      method,
      url,
      header: {
        Accept: "application/json",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Expires: 0,
        "Content-Type": "application/json; charset=utf-8"
      },
      complete:()=>{
        if(loading){
          clearTimeout(loading)
          loading = null
        }
        else{
          Taro.hideLoading()
        }
      }
    }
    //let token = Config.IS_DEBUG ? Config.token : Taro.getStorageSync()
    let token = Taro.getStorageSync('token')

    if (token) {
      option.header = option.headers || {}
      option.header.Authorization = `Bearer ${token}`
    }
    // 参数赋值
    switch (method) {
      case "GET":
      case "DELETE":
        option.data = body || {}
        break
      case "POST":
      case "PATCH":
      case "PUT":
        option.data = body || {}
        break
    }
    if (!Config.noConsole) {
      console.log(`${new Date().toLocaleString()} url:${url} P=${JSON.stringify(options)}`);
    }
    loading = setTimeout(()=>{Taro.showLoading({
      title: '加载中'
    })},800)
    console.log(`option:${JSON.stringify(option)}`);
  return new Promise((resolve, reject)=>{
    Taro.request(option).then((res) => {
      const { statusCode, data } = res;
      if (statusCode >= 200 && statusCode < 300) {
        if (!Config.noConsole) {
          console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,res.data);
        }
        resolve(data);
      }
      else if (statusCode === 401) {
        Taro.navigateTo({
          url: `/pages/index/index`
        })
          return
        }
      else {
        Taro.showToast({
          title: `错误: ${data.message}`,
          icon: 'none',
          mask: true,
        })
        throw new Error(`网络请求错误，状态码${statusCode}`);
      }
    })
  })  
}

export function requestGet(url, body) {
    return request(url, { method: "GET", body })
  }
  export function requestDelete(url) {
    return request(url, { method: "DELETE" })
  }
  export function requestPost(url, body) {
    return request(url, { method: "POST", body })
  }
  export function requestPatch(url, body) {
    return request(url, { method: "PATCH", body })
  }
  export function requestPut(url, body) {
    return request(url, { method: "PUT", body })
  }