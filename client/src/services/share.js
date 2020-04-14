import { requestGet, requestPut } from '../utils/request'

export async function getShareInfo(payload) {
  return requestGet(`share/${payload.id}`, payload)
}
export async function putShareInfo(payload) {
  return requestPut(`share/${payload.id}`, payload)
}
