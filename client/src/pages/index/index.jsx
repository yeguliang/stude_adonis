import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import BaseLayout from '../../layout/layout'
import { connect } from "@tarojs/redux"
@connect(({ system, user }) => ({
  isLogin: user.isLogin
}))
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareID: this.$router.params.shareID
    }
  }
  //------------------------生命周期--------------------//
  componentDidMount() {

    Taro.login().then((res) => {
      const { code } = res;
      this.props.dispatch({ type: 'user/apiPostLogin', payload: { code: code } })
    })
    this.props.dispatch({ type: 'system/wxGetSystemInfo' })
    if(this.props.isLogin){
      if (this.state.shareID) {
        Taro.reLaunch({
          url: `/pages/share/share?id=${this.state.shareID}`
        })
      }
      else{
        this.handleJumpTo()
      }
    }
    
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('nextState',nextState)
    if (nextProps.isLogin !== this.props.isLogin) {
      if (nextState.shareID) {
        Taro.reLaunch({
          url: `/pages/share/share?id=${nextState.shareID}`
        })
      }
      else{
        this.handleJumpTo()
      }
    }
  }
  //------------------------事件--------------------//
  handleJumpTo = () => {
    if (Taro.getCurrentPages().length === 1) {
      Taro.switchTab({
        url: `/pages/activity/activity`
      })
    }
    else {
      Taro.navigateBack()
    }
  }
  //------------------------渲染--------------------//
  render() {
    return (
    <View></View>
    )
  }
}
export default Mine