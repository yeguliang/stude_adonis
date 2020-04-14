import { requestGet } from '../utils/request'

export async function getActivityCollect(payload) {
  return requestGet('activityCollect', payload)
}
