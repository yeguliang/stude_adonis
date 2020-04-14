import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './styles.less'

export default class ActivityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //--------------------生命周期------------------//
  //--------------------事件------------------//
  handleClickMask = () => {
    const { maskClose, onCancel } = this.props
    if(maskClose){
      onCancel&&onCancel()
    }
  }
  //--------------------渲染------------------//
  render() {
    const { visible, data, onCancel } = this.props
    if(visible){
      return (
        <View className={'activity_modal'}>
          <View className={'modal_mask'} onClick={()=>{this.handleClickMask()}}></View>
          <View className={'modal_content'}>
            <View className={'content'}>
              <View className={'head_icon'}>
                <Image src={data&&data.icon}/>
              </View>
              <Text className={'name'}>{data&&data.name}</Text>
              <Text className={'honor_line'}>{data&&data.detailInfo.replace(/,/g, '\n')}</Text>
            </View>
            <View className={'close_icon'} onClick={()=>{onCancel()}}>
              <Image src={require('../../asset/icon/icon_close.png')}/>
              <View><Text>关闭</Text></View>
            </View>
          </View>
        </View>
      )
    }
  }
}
