import Config from "./config"
import axios from "axios"
import { message } from "antd"

export default function request(url, options) {
  return new Promise((resolve, reject) => {
    let { method, body } = options
    // 添加url前缀
    if (url.indexOf("https://") == -1 && url.indexOf("http://") == -1) {
      url = Config.SERVER_HOME + (url.indexOf("/") === 0 ? url.substr(1) : url)
    }

    // url= (body&&body.url)||url;
    let option = {
      method,
      url,
      headers: {
        Accept: "application/json",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Expires: 0,
        "Content-Type": "application/json; charset=utf-8"
      }
    }
    // 参数赋值
    switch (method) {
      case "GET":
      case "DELETE":
        option.params = body || {}
        break
      case "POST":
      case "PATCH":
      case "PUT":
        option.data = body || {}
        break
    }
    // console.log('option', option.data)
    axios(option)
      .then(response => {
        // console.log(response)
        resolve(response.data)
      })
      .catch(error => {
        if (error.response) {
          let { status, data } = error.response
          message.destroy()
          message.error(data.message, 1)
          if (status === 400) {
            let { error } = data
            // message.error(data.message, .5);
          }
          if (status === 401) {
            let currentUrl = window.location.href
            // location.href = location.origin
            // window.location.href = `https://s.stgame.cn/st12/client/v1/wechat/authByLink?url=${encodeURIComponent(currentUrl)}&state=snsapi_base`
            return
          }
          // environment should not be used
          if (status === 403) {
            //router.push('/exception/403');
            return
          }
          if (status <= 504 && status >= 500) {
            //router.push('/exception/500');
            return
          }
          if (status >= 404 && status < 422) {
            //router.push('/exception/404');
          }
        } else if (error.request) {
          message.error("网络链接失败", 1)
          throw error
        } else {
          throw error
        }
      })
  })
}

export function requestGet(url, body) {
  return request(Config.SERVER_HOME+url, { method: "GET", body })
}
export function requestDelete(url) {
  return request(Config.SERVER_HOME+url, { method: "DELETE" })
}
export function requestPost(url, body) {
  // console.log("url-------------", url)
  return request(Config.SERVER_HOME+url, { method: "POST", body })
}
export function requestPatch(url, body) {
  return request(Config.SERVER_HOME+url, { method: "PATCH", body })
}
export function requestPut(url, body) {
  return request(Config.SERVER_HOME+url, { method: "PUT", body })
}
