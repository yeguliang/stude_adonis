import {
  getShareInfo,
  putShareInfo,
} from '../services/share'

export default {
  namespace: 'share',
  state: {
    shareInfo: null,
    receiveInfo: null,
  },
  effects: {
    *apiGetShareInfo({ payload }, { call, put }){
      const response = yield call(getShareInfo, payload)
      yield put({ type: 'setShareInfo', payload: response })
    },
    *apiPutShareInfo({ payload }, { call, put }){
      const response = yield call(putShareInfo, payload)
      yield put({ type: 'receiveShare', payload: response })
    }
  },
  reducers: {
    setShareInfo(state, { payload }){
      return {
        ...state,
        shareInfo: payload,
      }
    },
    receiveShare(state, { payload }){
      return {
        ...state,
        receiveInfo: payload,
      }
    }
  }
}
