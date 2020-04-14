import {
  getUserActivity
} from '../services/ticket'

export default {
  namespace: 'ticket',
  state: {
    activity: null,
  },
  effects: {
    *apiGetUserActivity({ payload }, { call, put }){
      const response = yield call(getUserActivity, payload)
      yield put({ type: 'setDetails', payload: response })
    }
  },
  reducers: {
    setDetails(state, { payload }){
      return {
        ...state,
        activity: payload,
      }
    }
  }
}
