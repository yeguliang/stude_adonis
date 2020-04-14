import { postLogin, putUser, getUserActivity, getUserLocation,postDecodePhone } from '../services/user'
import Taro from '@tarojs/taro'
const type = ['活动中', '已结束', '转赠']

export default {
  namespace: 'user',
  state: {
    userInfo: null,
    isLogin: false,
    userActivity: [],
    userCity: null,  //用户所在位置
  },
  effects: {
    *apiPostLogin({ payload }, { call, put }) {
      const response = yield call(postLogin, payload)
      yield put({ type: 'setUser', payload: response })
    },
    *apiPutUser({ payload }, { call, put }) {
      const response = yield call(putUser, payload)
      yield put({ type: 'putUser', payload: response })
    },
    *apiGetUserActivity({ payload }, { call, put }) {
      const response = yield call(getUserActivity, payload)
      yield put({ type: 'setUserActivity', payload: { response: response, cate: payload.cate } })
    },
    *apiGetNextUserActivity({ payload }, { call, put }) {
      const response = yield call(getUserActivity, payload)
      yield put({ type: 'setNextUserActivity', payload: { response: response, cate: payload.cate } })
    },
    //用户地理位置转换
    *apiGetUserLocation({ payload }, { call, put }){
      const response = yield call(getUserLocation, payload)
      yield put({ type: 'saveUserLocation', payload: response })
    },
    *apiPostDecodePhone({ payload }, { call, put }){
      const response = yield call(postDecodePhone, payload)
      yield put({ type: 'setDecodePhone', payload: response })
    }
  },
  reducers: {
    setUser(state, { payload }) {
      Taro.setStorageSync('token', payload.token)
      return {
        ...state,
        isLogin: true,
        userInfo: payload.user
      }
    },
    putUser(state, { payload }) {
      return {
        ...state,
        userInfo: payload
      }
    },
    setUserActivity(state, { payload }) {
      const { response, cate } = payload
      const { userActivity } = state
      userActivity[type.indexOf(cate)] = response
      return {
        ...state,
        userActivity: userActivity.concat()
      }
    },
    setNextUserActivity(state, { payload }){
      const { response, cate } = payload
      const { userActivity } = state
      userActivity[type.indexOf(cate)].data = userActivity[type.indexOf(cate)].data.concat(response.data)
      userActivity[type.indexOf(cate)].page = response.page
      userActivity[type.indexOf(cate)].lastPage = response.lastPage
      return {
        ...state,
        userActivity: userActivity.concat()
      }
    },
    saveUserLocation(state, { payload }){
      return {
        ...state,
        userCity: payload.city,
      }
    },
    setDecodePhone(state, { payload }){
      const {userInfo}  = state
      return {
        ...state,
        userInfo:{...userInfo,mobile:payload.mobile}
      }
    }
  }
}
