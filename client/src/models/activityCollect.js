import {
  getActivityCollect
} from '../services/activityCollect'

export default {
  namespace: 'activityCollect',
  state: {
    collect: null,
  },
  effects: {
    *apiGetActivityCollect({ payload }, { call, put }){
      const response = yield call(getActivityCollect, payload)
      yield put({ type: 'setList', payload: response })
    }
  },
  reducers: {
    setList(state, { payload }){
      return {
        ...state,
        collect: payload,
      }
    }
  }
}
