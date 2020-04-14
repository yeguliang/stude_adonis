import Taro, { Component } from '@tarojs/taro'
import Activity from "./pages/activity/activity";
import { Provider } from '@tarojs/redux'
import models from './models'
import './app.less'
import './taroUI.sass'
import dva from './utils/dva'
const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/activity/activity',  //活动
      'pages/search/search', //搜索
      'pages/activityDetails/activityDetails', //活动详情
      'pages/signUp/signUp',    //立即报名
      'pages/success/success', //报名成功
      'pages/prizeWines/prizeWines',  //获奖酒
      'pages/prizeWinesList/prizeWinesList',//获奖酒列表
      'pages/wineDetails/wineDetails',//获奖酒详情
      'pages/mine/mine', //我的
      'pages/myActivity/MyActivity',  //我的报名
      'pages/ticket/ticket', //入场券
      'pages/activityCollection/activityCollection', //活动收藏
      'pages/wineCollection/wineCollection', //酒品收藏
      'pages/share/share',  //分享领取
      'pages/receiveSuccess/receiveSuccess'  //领取成功
    ],
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WINE100',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/activity/activity",
          text: "活动"
        },
        {
          pagePath: "pages/prizeWines/prizeWines",
          text: "获奖酒"
        },
        {
          pagePath: "pages/mine/mine",
          text: "我的"
        }
      ]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (<Provider store={store}>
      <Activity />
    </Provider>)
  }
}

Taro.render(<App />, document.getElementById('app'))
