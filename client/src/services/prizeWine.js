import {requestGet, requestPost} from '../utils/request'
export async function getWine(payload){
    return requestGet('wine',payload)
}
export async function getWineDetails(payload){
    return requestGet(`wine/${payload.id}`)
}
export async function postWineCollect(payload){
    return requestPost(`userCollect`,payload)
}