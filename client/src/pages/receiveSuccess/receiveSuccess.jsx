import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Canvas} from '@tarojs/components'
import { connect } from "@tarojs/redux"
import './styles.less'
import moment from 'moment'
import drawQrcode from 'weapp-qrcode'

@connect(({ share })=>({
  receiveInfo: share.receiveInfo,
}))
class ReceiveSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //-----------------------生命周期--------------------//
  componentDidMount() {
    const { receiveInfo } = this.props
    if(receiveInfo){
      setTimeout(()=>{
        drawQrcode({
          width: 41,
          height: 41,
          canvasId: 'myQrcode',
          text: receiveInfo.no,
        })
      }, 500)
    }
  }
  //-----------------------事件--------------------//
  handleJumpToIndex = () => {
    Taro.switchTab({
      url: `/pages/activity/activity`
    })
  }
  //-----------------------渲染--------------------//
  render() {
    const { receiveInfo } = this.props
    return (
      receiveInfo ? <View className={'receive_container'}>
        <View className={'top_tips'}>
          <Image className={'bg'} src={require('../../asset/success/bg.png')}/>
          <View className={'success_icon'}>
            <Image className={'icon'} src={require('../../asset/success/success_icon.png')}/>
            <Text className={'text'}><Text>领取成功！</Text></Text>
          </View>
        </View>
        <View className={'coupon_code'}>
          <View className={'coupon_top'}>
            <View className={'name'}><Text>[{receiveInfo.activity&&receiveInfo.activity.type}] {receiveInfo.activity&&receiveInfo.activity.title}</Text></View>
            <View className={'pic'}><Image src={receiveInfo.activity&&receiveInfo.activity.banner}/></View>
            <View className={'other_info'}>
              <View className={'other_info_line'}><Text>主办方：{receiveInfo.activity&&receiveInfo.activity.sponsor}</Text></View>
              <View className={'other_info_line'}><Text>地址：{receiveInfo.activity&&receiveInfo.activity.address&&receiveInfo.activity.address.name}</Text></View>
              <View className={'other_info_line'}><Text>时间：{moment(receiveInfo.activity&&receiveInfo.activity.startTime).format('YYYY.MM.DD')} - {moment(receiveInfo.activity&&receiveInfo.activity.endTime).format('MM.DD')}</Text></View>
            </View>
          </View>
          <View className={'coupon_bottom'}>
            <View className={'code_img'}>
              <Canvas style={{width: '41px', height: '41px'}} canvasId="myQrcode"></Canvas>
            </View>
            <Text className={'code_number'}>券码：\n{receiveInfo.no}</Text>
          </View>
        </View>
        <View className={'confirm_button'} onClick={()=>{this.handleJumpToIndex()}}><Text>进入小程序查看</Text></View>
      </View> : null
    )
  }
}
export default ReceiveSuccess
