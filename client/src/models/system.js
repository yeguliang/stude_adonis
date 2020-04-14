import Taro from '@tarojs/taro'

export default {
  namespace: 'system',
  state: {
    model: null,  //手机型号
    system: null,  //操作系统版本
    pixelRatio: null,  //设备像素比
    screenWidth: null,  //屏幕宽度
    screenHeight: null,  //屏幕高度
    windowWidth: null,  //可使用窗口宽度
    windowHeight: null,  //可使用窗口高度
    statusBarHeight: null, //状态栏的高度
  },
  effects: {
    //获取手机型号等信息
    *wxGetSystemInfo({ payload } , { put, call } ){
      const response = yield call(Taro.getSystemInfoSync);
      yield put({ type:'saveSystemInfo', payload:response })
    },
  },
  reducers: {
    saveSystemInfo(state, { payload }){
      return {
        ...state,
        ...payload,
      }
    }
  }
}
