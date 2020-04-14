import {getWine,getWineDetails,postWineCollect} from '../services/prizeWine'
export default {
    namespace:'wine',
    state:{
        wineList:null,
        wineDetails:null
    },
    effects:{
        *apiGetWine({payload},{call,put}){
            const response = yield call(getWine,payload)
            yield put({type:'setWine',payload:response})
        },
        *apiGetNextWine({payload},{call,put}){
            const response = yield call(getWine,payload)
            yield put({type:'setNextWine',payload:response})
        },
        *apiGetWineDetails({payload},{call,put}){
            const response = yield call(getWineDetails,payload)
            yield put({type:'setWineDetails',payload:response})
        },
        *apiPostWineCollect({payload},{call,put}){
            const response = yield call(postWineCollect,payload)
            yield put({type:'setWineCollect',payload:response})
        }
    },
    reducers:{
        setWine(state,{payload}){
            return {
                ...state,
                wineList:payload
            }
        },
        setWineDetails(state,{payload}){
            return {
                ...state,
                wineDetails:payload
            }
        },
        setNextWine(state,{payload}){
            const {wineList} =state
            wineList.data = wineList.data.concat(payload.data)
            wineList.page = payload.page
            wineList.lastPage = payload.lastPage
            return {
                ...state,
                wineList:Object.assign({},wineList)
            }
        },
        setWineCollect(state,{payload}){
            console.log('payload===>',payload)
            const {wineDetails} = state
            if(payload&&payload.cancleCollect){
                wineDetails.collect = false
            }
            else if(payload){
                wineDetails.collect = true  
            }
            return{
                ...state,
                wineDetails:Object.assign({},wineDetails)
            }
        }
    }
}