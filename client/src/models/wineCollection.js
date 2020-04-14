import {
  getWineCollect,
} from '../services/wineCollection'

export default {
  namespace: 'wineCollection',
  state: {
    wineCollect: null,
  },
  effects: {
    *apiGetWineCollect({ payload }, { call, put }){
      const response = yield call(getWineCollect, payload)
      yield put({ type: 'setList', payload: response })
    }
  },
  reducers: {
    setList(state, { payload }){
      return {
        ...state,
        wineCollect: payload,
      }
    }
  }
}
