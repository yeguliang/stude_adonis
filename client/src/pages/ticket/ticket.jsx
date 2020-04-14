import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Canvas } from '@tarojs/components'
import { connect } from "@tarojs/redux"
import BaseLayout from '../../layout/layout'
import './styles.less'
import moment from 'moment'
import drawQrcode from 'weapp-qrcode'

@connect(({ ticket })=>({
  activity: ticket.activity
}))
class Ticket extends Component {
  constructor(props) {
    super(props);
    let id = this.$router.params.id
    this.state = {
      id: id,
    }
  }
  //-------------------生命周期----------------//
  componentDidMount() {
    const { id } = this.state
    this.props.dispatch({
      type: 'ticket/apiGetUserActivity',
      payload: { id: id }
    })
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const { activity } = this.props
    if(activity != nextProps.activity && nextProps.activity){
      console.warn('nextProps.activity', nextProps.activity)
      setTimeout(()=>{
        drawQrcode({
          width: 41,
          height: 41,
          canvasId: 'activityCode',
          text: nextProps.activity.no,
        })
      }, 500)
    }
  }
  //-------------------事件----------------//
  //-------------------渲染----------------//
  render() {
    const { activity } = this.props
    return (
      <BaseLayout hideFooter={true}>
        {activity ? <View className={'ticket_content'}>
          <View className={'top_tips'}>
            <Image className={'bg'} src={require('../../asset/success/bg.png')}/>
          </View>
          <View className={'coupon_code'}>
            <View className={'coupon_top'}>
              <View className={'name'}><Text>[{activity.activity&&activity.activity.type}] {activity.activity&&activity.activity.title}</Text></View>
              <View className={'pic'}><Image src={activity.activity&&activity.activity.banner}/></View>
              <View className={'other_info'}>
                <View className={'other_info_line'}><Text>主办方：{activity.activity&&activity.activity.sponsor}</Text></View>
                <View className={'other_info_line'}><Text>地址：{activity.activity&&activity.activity.address&&activity.activity.address.name}</Text></View>
                <View className={'other_info_line'}><Text>时间：{moment(activity.activity.startTime).format('YYYY.MM.DD')} - {moment(activity.activity.endTime).format('MM.DD')}</Text></View>
              </View>
            </View>
            <View className={'coupon_bottom'}>
              <View className={'code_img'}>
                <Canvas style={{width: '41px', height: '41px'}} canvasId="activityCode"></Canvas>
              </View>
              <Text className={'code_number'}>券码：\n{activity.no}</Text>
            </View>
          </View>
        </View> : null}
      </BaseLayout>
    )
  }
}
export default Ticket
