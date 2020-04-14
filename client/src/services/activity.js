import { requestGet, requestPost } from '../utils/request'
import { request } from '@tarojs/taro'

//获取活动首页的数据
export async function getActivityPageInfo(payload) {
  return requestGet('home', payload)
}
//获取活动详情
export async function getActivityDetails(payload) {
  return requestGet(`activity/${payload.id}`, payload)
}
//收藏、取消收藏活动
export async function postActivityCollect(payload) {
  return requestPost('userCollect', payload)
}
//活动报名
export async function postUserActivity(payload) {
  return requestPost('userActivity', payload)
}
//搜索
export async function getSearch(payload) {
  return requestGet('search', payload)
}
//分享
export async function postShareActivity(payload) {
  return requestPost('share', payload)
}
//支付活动
export async function payTheActivity(payload) {
  return requestPost('pay', payload)
}
export async function getPayResult(payload) {
  return requestGet(`pay/${payload.id}`)
}
//所报名的活动详情
export async function getUserActivityDetails(payload) {
  return requestPost('userActivity/afterPay', payload)
}
