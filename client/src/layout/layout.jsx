import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from "@tarojs/redux"
import './styles.less'

@connect(({ system, user }) => ({
  system: system.system,
  isLogin: user.isLogin
}))

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBar: [
        {
          pageIndex: 1,
          pagePath: '/pages/activity/activity',
          text: '活动',
          iconPath: require('../asset/tabIcon/activity_unChecked.png'),
          selectedIconPath: require('../asset/tabIcon/activity_selected.png'),
        },
        {
          pageIndex: 2,
          pagePath: '/pages/prizeWines/prizeWines',
          text: '获奖酒',
          iconPath: require('../asset/tabIcon/wines_unChecked.png'),
          selectedIconPath: require('../asset/tabIcon/wines_selected.png'),
        },
        {
          pageIndex: 3,
          pagePath: '/pages/mine/mine',
          text: '我的',
          iconPath: require('../asset/tabIcon/mine_unChecked.png'),
          selectedIconPath: require('../asset/tabIcon/mine_selected.png'),
        }
      ]
    }
  }
  //------------------------生命周期--------------------//
  componentDidMount() {
    const {isLogin}=this.props
    if(!isLogin){
      Taro.navigateTo({
        url: `/pages/index/index`
      })
    }else{
      this.getWxSetting()
    }
  }
  //------------------------事件--------------------//
  getWxSetting = () => {
    Taro.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          Taro.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: (res) => {
              if (res.cancel) {
                Taro.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                Taro.openSetting({
                  success: (dataAu) => {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      Taro.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      this.getUserLocation()
                    } else {
                      Taro.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          this.getUserLocation()
        }
        else {
          //调用wx.getLocation的API
          this.getUserLocation()
        }
      }
    })
  }
  getUserLocation = () => {
    Taro.getLocation({
      type: 'wgs84',
      success: (res)=>{
        this.props.dispatch({
          type: 'user/apiGetUserLocation',
          payload: {latitude: res.latitude, longitude: res.longitude}
        })
      },
      fail: (res) => {
        this.getWxSetting()
      }
    })
  }
  handleRouteTo = (route) => {
    Taro.switchTab({ url: route })
  }
  //-------------------------渲染-------------------//
  render() {
    const { pageIndex, hideFooter, system, isLogin } = this.props
    const { tabBar } = this.state
    return (
      <View className={'app_container'}>
        <View className={system && system.indexOf('iOS') !== -1 && !hideFooter ? 'main_maxPadding' : system && system.indexOf('iOS') === -1 && !hideFooter ? 'main' : null}>{isLogin?this.props.children:null}</View>
        {hideFooter ? null : <View>
          <View className={'tabs_bottom'}>
            <View className={'tabs_content'}>
              {
                tabBar.map((vo, index)=>{
                  return (
                    <View key={index} className={'tabs'} onClick={() => { this.handleRouteTo(vo.pagePath) }}>
                      <Image src={pageIndex&&pageIndex===vo.pageIndex ? vo.selectedIconPath : vo.iconPath} />
                      <Text>{vo.text}</Text>
                    </View>
                  )
                })
              }
            </View>
            {system&&system.indexOf('iOS') !== -1 ? <View className={'empty_bottom'}></View> : null}
          </View>
        </View>}
      </View>
    )
  }
}
export default Layout
