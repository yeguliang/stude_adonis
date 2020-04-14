import {requestGet,requestPost,requestPut} from '../utils/request'
export async function postLogin(payload){
    return requestPost('wxlogin',payload)
}
export async function putUser(payload){
    return requestPut('user/0',payload)
}

export async function getUserActivity(payload) {
    return requestGet('userActivity',payload)
}

//用户地理位置转换
export async function getUserLocation(payload) {
  return requestGet('location', payload)
}

export async function postDecodePhone(payload) {
    return requestPost('decodePhone', payload)
  }
  