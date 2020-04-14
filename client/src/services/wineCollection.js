import { requestGet } from '../utils/request'

export async function getWineCollect(payload){
  return requestGet('wineCollect', payload)
}
