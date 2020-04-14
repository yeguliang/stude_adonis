import {
  getActivityPageInfo,
  getActivityDetails,
  postActivityCollect,
  postUserActivity,
  getSearch,
  postShareActivity,
  payTheActivity,
  getPayResult
} from '../services/activity'
import Taro from '@tarojs/taro'

export default {
  namespace: 'activity',
  state: {
    indexBanner: null, //首页Banner数据
    indexActivity: null, //首页活动数据
    details: null,
    search: null,
    shareActivity: null,
    successInfo: null //报名成功的页面
  },
  effects: {
    //获取活动首页的数据
    *apiGetActivityPageInfo({ payload }, { call, put }) {
      const response = yield call(getActivityPageInfo, payload)
      yield put({ type: 'setPageInfo', payload: response })
    },
    //获取活动详情
    *apiGetActivityDetails({ payload }, { call, put }) {
      const response = yield call(getActivityDetails, payload)
      yield put({ type: 'setDetails', payload: response })
    },
    //收藏、取消收藏活动
    *apiPostActivityCollect({ payload }, { call, put }) {
      const response = yield call(postActivityCollect, payload)
      if (response && response.cancleCollect) {
        Taro.showToast({
          title: '已取消收藏',
          icon: 'success',
          duration: 1000
        })
      } else {
        Taro.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1000
        })
      }
      yield put({ type: 'setCollectActivity', payload: response })
    },
    //活动报名
    *apiPostUserActivity({ payload }, { call, put }) {
      const response = yield call(postUserActivity, payload)
      console.log('response', response)
      const { pay, payObj } = yield call(payTheActivity, { userActivityId: response.id, activityID: response.activity.id })
      console.log('payload', pay)

      let payIt = yield new Promise((resolve, reject) => {
        wx.requestPayment({
          ...payObj,
          success(res) {
            console.log('1111111111', res)
            Taro.showToast({
              title: '成功'
            })
            resolve(1)
          },
          fail(res) {
            resolve(-1)
          }
        })
      })
      console.log('payIt', payIt)
      if (payIt === 1) {
        Taro.navigateTo({ url: '/pages/success/success' })
        // const response = yield call(getUserActivityDetails, { activityID: pay.activityID, phone: pay.phone })
        console.log('payResult', response)
        yield put({ type: 'setRegistration', payload: response })
      }
      // const response = yield call(postUserActivity, payload)
      // if (response && !response.error) {
      //   Taro.navigateTo({ url: '/pages/success/success' })
      // }
      // yield put({ type: 'setRegistration', payload: response })
    },
    //搜索
    *apiGetSearch({ payload }, { call, put }) {
      const response = yield call(getSearch, payload)
      yield put({ type: 'setSearch', payload: response })
    },
    *apiPostShareActivity({ payload }, { call, put }) {
      const response = yield call(postShareActivity, payload)
      yield put({ type: 'setShareActivity', payload: response })
    }
  },
  reducers: {
    setPageInfo(state, { payload }) {
      return {
        ...state,
        indexBanner: payload.banner,
        indexActivity: payload.activitys
      }
    },
    setDetails(state, { payload }) {
      return {
        ...state,
        details: payload
      }
    },
    setCollectActivity(state, { payload }) {
      let { details } = state
      if (details) {
        if (payload && payload.cancleCollect) {
          details.collect = false
        } else {
          details.collect = true
        }
      }
      return {
        ...state,
        details: Object.assign({}, details)
      }
    },
    setRegistration(state, { payload }) {
      return {
        ...state,
        successInfo: payload
      }
    },
    setSearch(state, { payload }) {
      return {
        ...state,
        search: payload
      }
    },
    setShareActivity(state, { payload }) {
      return {
        ...state,
        shareActivity: payload
      }
    }
  }
}
