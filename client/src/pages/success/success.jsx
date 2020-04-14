import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Canvas} from '@tarojs/components'
import { connect } from "@tarojs/redux"
import BaseLayout from '../../layout/layout'
import './styles.less'
import moment from 'moment'
import drawQrcode from 'weapp-qrcode'

@connect(({ activity })=>({
  successInfo: activity.successInfo,
}))
class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //---------------------生命周期------------------//
  componentDidMount() {
    const { successInfo } = this.props
    if(successInfo){
      console.warn('successInfo', successInfo)
      setTimeout(()=>{
        drawQrcode({
          width: 41,
          height: 41,
          canvasId: 'successCode',
          text: successInfo.no,
        })
      }, 500)
    }
  }
  handleJumpToPage = () => {
    Taro.switchTab({ url: '/pages/activity/activity' })
  }
  //---------------------事件------------------//
  //---------------------渲染------------------//
  render() {
    const { successInfo } = this.props
    return (
      <BaseLayout hideFooter={true}>
        {successInfo ? <View className={'success_container'}>
          <View className={'top_tips'}>
            <Image className={'bg'} src={require('../../asset/success/bg.png')}/>
            <View className={'success_icon'}>
              <Image className={'icon'} src={require('../../asset/success/success_icon.png')}/>
              <Text className={'text'}><Text>恭喜，支付成功！</Text></Text>
            </View>
          </View>
          <View className={'coupon_code'}>
            <View className={'coupon_top'}>
              <View className={'name'}><Text>[{successInfo.activity&&successInfo.activity.type}] {successInfo.activity&&successInfo.activity.title}</Text></View>
              <View className={'pic'}><Image src={successInfo.activity&&successInfo.activity.banner}/></View>
              <View className={'other_info'}>
                <View className={'other_info_line'}><Text>主办方：{successInfo.activity&&successInfo.activity.sponsor}</Text></View>
                <View className={'other_info_line'}><Text>地址：{successInfo.activity&&successInfo.activity.address&&successInfo.activity.address.name}</Text></View>
                <View className={'other_info_line'}><Text>时间：{moment(successInfo.activity&&successInfo.activity.startTime).format('YYYY.MM.DD')} - {moment(successInfo.activity&&successInfo.activity.endTime).format('MM.DD')}</Text></View>
              </View>
            </View>
            <View className={'coupon_bottom'}>
              <View className={'code_img'}>
                <Canvas style={{width: '41px', height: '41px'}} canvasId="successCode"></Canvas>
              </View>
              <Text className={'code_number'}>券码：\n{successInfo.no}</Text>
            </View>
          </View>
          <View className={'confirm_button'} onClick={()=>{this.handleJumpToPage()}}><Text>确认</Text></View>
        </View> : null}
      </BaseLayout>
    )
  }

}
export default Success
