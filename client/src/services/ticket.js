import { requestGet } from '../utils/request'

export async function getUserActivity(payload){
  return requestGet(`userActivity/${payload.id}`, payload)
}
