import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import BaseLayout from '../../layout/layout'
import './styles.less'
import { connect } from "@tarojs/redux"
@connect(({ user }) => ({
  userInfo: user.userInfo
}))
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //------------------------生命周期--------------------//
  componentDidMount() {
    Taro.hideTabBar()
  }
  //------------------------事件--------------------//
  getAuth = () => {
    Taro.getUserInfo().then((res) => {
      const { userInfo } = res
      this.props.dispatch({
        type: 'user/apiPutUser', payload: {
          userWxName: userInfo.nickName,
          country: userInfo.country,
          province: userInfo.province,
          city: userInfo.city,
          headImage: userInfo.avatarUrl,
          gender: userInfo.gender
        }
      })
    }).catch((e) => {
      Taro.showModal({
        title: '提醒',
        content: '您关闭了信息授权，将无法使用获得您的用户信息，点击确定重新开启授权',
      }).then((res) => {
        if (res.confirm) {
          Taro.openSetting()
        }
      })
    })
  }
  getPhoneNumber=(e)=>{
    console.log('====',e)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
  handleJumpTo = (routeName) => {
    Taro.navigateTo({
      url: `/pages/${routeName}`
    })
  }
  //------------------------渲染--------------------//
  render() {
    const { userInfo } = this.props;
    console.log('===>', userInfo)
    return (
      <BaseLayout pageIndex={3}>
        <View>
          <View className='top'>
            <View className='userCard'>
              <View className='userImage userImageContainer'>
                <Image className='userImage' src={userInfo && userInfo.headImage ? userInfo.headImage : require('../../asset/mine/defalutAvatar.png')}></Image>
              </View>
              <View className='userNameContainer'>
                <Text className='userName'>{userInfo.userWxName || '未登录'}</Text>
                {!(userInfo && userInfo.headImage)?<Button className='authorizationBtn' openType='getUserInfo'  onClick={this.getAuth} ><Text style={{ textDecoration: 'underline' }}>点击授权</Text></Button>:null}
              </View>
            </View>
          </View>
          <View className='menuContainer'>
            <View className={'menuItem'} onClick={() => { this.handleJumpTo('myActivity/MyActivity') }}>
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Image className='menuIcon' src={require('../../asset/mine/report.png')}></Image>
                <Text className='menuTitle'>我的报名</Text></View>
              <View>
                <Image className='rightArrow' src={require('../../asset/icon/icon_rightArrow.png')}></Image>
              </View>
            </View>
            <View className={'menuItem'} onClick={() => { this.handleJumpTo('activityCollection/activityCollection') }}>
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Image className='menuIcon' src={require('../../asset/mine/activityCollect.png')}></Image>
                <Text className='menuTitle'>活动收藏</Text></View>
              <View>
                <Image className='rightArrow' src={require('../../asset/icon/icon_rightArrow.png')}></Image>
              </View>
            </View>
            <View className={'menuItem'} onClick={() => { this.handleJumpTo('wineCollection/wineCollection') }}>
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Image className='menuIcon' src={require('../../asset/mine/wineCollect.png')}></Image>
                <Text className='menuTitle'>酒品收藏</Text></View>
              <View>
                <Image className='rightArrow' src={require('../../asset/icon/icon_rightArrow.png')}></Image>
              </View>
            </View>
            <View className={'menuItem'}>
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Image className='menuIcon' src={require('../../asset/mine/customerService.png')}></Image>
                <Text className='menuTitle'>联系客服</Text></View>
              <View>
                <Image className='rightArrow' src={require('../../asset/icon/icon_rightArrow.png')}></Image>
              </View>
            </View>
          </View>
        </View>
      </BaseLayout>
    )
  }
}
export default Mine
