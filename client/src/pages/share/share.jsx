import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image, Form, Input, Button} from '@tarojs/components'
import { connect } from "@tarojs/redux"
import './styles.less'

@connect(({ share, user })=>({
  shareInfo: share.shareInfo,
  receiveInfo: share.receiveInfo,
  userInfo: user.userInfo,
}))
class Share extends Component {
  constructor(props) {
    super(props);
    let id = this.$router.params.id
    this.state = {
      id: id,
      phone: '',
    }
  }
  //---------------------生命周期--------------------//
  componentDidMount() {
    const { id } = this.state
    this.props.dispatch({
      type: 'share/apiGetShareInfo',
      payload: { id: id }
    })
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const { shareInfo, receiveInfo, userInfo } = this.props
    if(shareInfo != nextProps.shareInfo && nextProps.shareInfo){
      this.setState({ phone: nextProps.shareInfo.currentUser.mobile })
    }
    if(receiveInfo != nextProps.receiveInfo && nextProps.receiveInfo){
      Taro.navigateTo({url: `/pages/receiveSuccess/receiveSuccess`})
    }
    if(userInfo != nextProps.userInfo && nextProps.userInfo){
      const { id } = this.state
      this.props.dispatch({
        type: 'share/apiGetShareInfo',
        payload: { id: id }
      })
    }
  }
  //----------------------事件-------------------//
  getPhoneNumber = (e) => {
    Taro.checkSession().then((res) => {
      this.props.dispatch({type:'user/apiPostDecodePhone',payload:{
          encryptedData:e.detail.encryptedData,
          iv:e.detail.iv
        }})
    }).catch((e)=>{
      Taro.login().then((res) => {
        const { code } = res;
        this.props.dispatch({ type: 'user/apiPostLogin', payload: { code: code } })
      })
      Taro.showToast({title:'刷新登录中，请重试'})
    })
  }
  handleSignUpSubmit = (e) => {
    const { id } = this.state
    let values = e.detail.value
    values.id = parseInt(id)
    if(!values.name || !values.phone){
      Taro.showToast({
        title: '姓名或手机号为空！',
        icon: 'none',
        duration: 1500
      })
      return
    }else{
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
      let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(!phoneReg.test(values.phone)){
        Taro.showToast({
          title: '手机号码格式错误！',
          icon: 'none',
          duration: 1500
        })
        return
      }
      if(values.email && !emailReg.test(values.email)){
        Taro.showToast({
          title: '邮箱地址格式错误！',
          icon: 'none',
          duration: 1500
        })
        return
      }
    }
    this.props.dispatch({
      type: 'share/apiPutShareInfo',
      payload: { ...values }
    })
  }
  //----------------------渲染------------------//
  render() {
    const { shareInfo } = this.props
    const { phone } = this.state
    return (
      shareInfo ? <View className={'share_container'}>
        <Image className={'top_banner'} src={shareInfo.activity&&shareInfo.activity.banner}/>
        <View className={'activity_txt'}>
          <View className={'name'}><Text>[{shareInfo.activity&&shareInfo.activity.type}] {shareInfo.activity&&shareInfo.activity.title}</Text></View>
          {shareInfo.activity&&shareInfo.activity.price&&shareInfo.activity.price!=0 ? <View className={'price_user'}>
            <Text className={'price'}>￥{shareInfo.activity&&shareInfo.activity.price/100}</Text>
            <Text className={'share_user'}>{shareInfo.user&&shareInfo.user.userWxName}已付款</Text>
          </View> : <View className={'free'}><Text>免费</Text></View>}
        </View>
        <View className={'diver_line'}></View>
        <View className={'signUp_message'}>
          <View className={'title'}>报名信息填写</View>
          <Form onSubmit={this.handleSignUpSubmit}>
            <View className={'input_message'}>
              <View className={'input_line'}>
                <Text className={'title'}>姓名：</Text>
                <View className={'input_box'}>
                  <Input
                    type={'text'}
                    name={'name'}
                    placeholder={'在此输入您的姓名'}
                    placeholderClass={'input_placeholder'}
                    className={'input'}
                  />
                  <Image className={'input_icon'} src={require('../../asset/icon/icon_name.png')}/>
                </View>
              </View>
              <View className={'input_line'}>
                <Text className={'title'}>手机号：</Text>
                <View className={'input_box'}>
                  <Input
                    type={'number'}
                    name={'phone'}
                    value={phone}
                    placeholder={'在此输入您的手机号'}
                    placeholderClass={'input_placeholder'}
                    className={'input'}
                  />
                  <Image className={'input_icon'} src={require('../../asset/icon/icon_phone.png')}/>
                </View>
              </View>
              <View className={'input_line'}>
                <Text className={'title'}>邮箱：</Text>
                <View className={'input_box'}>
                  <Input
                    type={'text'}
                    name={'email'}
                    placeholder={'在此输入您的邮箱地址'}
                    placeholderClass={'input_placeholder'}
                    className={'input'}
                  />
                  <Image className={'input_icon'} src={require('../../asset/icon/icon_email.png')}/>
                </View>
              </View>
            </View>
            {shareInfo.currentUser&&shareInfo.currentUser.mobile ? <Button
              formType={'submit'}
              className={'signUp_submit'}
            >领取</Button> : <Button  className={'signUp_submit'} open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>领取</Button>}
          </Form>
        </View>
      </View> : null
    )
  }
}
export default Share
