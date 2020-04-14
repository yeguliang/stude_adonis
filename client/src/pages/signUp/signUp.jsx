import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input, Button, Form } from '@tarojs/components'
import { connect } from "@tarojs/redux"
import BaseLayout from '../../layout/layout'
import '../activityDetails/styles.less'

@connect(({ activity })=>({
  details: activity.details,
}))
class SignUp extends Component {
  constructor(props) {
    super(props);
    let id = this.$router.params.id
    this.state = {
      id: id,
    }
  }
  //--------------------生命周期------------------//
  componentDidMount() {
    const { id } = this.state
    this.props.dispatch({
      type: 'activity/apiGetActivityDetails',
      payload: { id: parseInt(id) }
    })
  }
  //--------------------事件------------------//
  handleSignUpSubmit = (e) => {
    const { id } = this.state
    let values = e.detail.value
    values.activityID = parseInt(id)
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
      type: 'activity/apiPostUserActivity',
      payload: { ...values }
    })
  }
  //--------------------渲染------------------//
  render() {
    const { details } = this.props
    return (
      <BaseLayout hideFooter={true}>
        <View>
          <View className={'banner'}>
            <Image src={details.banner}/>
          </View>
          <View className={'info'}>
            <View className={'title'}><Text>[{details.type}] {details.title}</Text></View>
            <View className={'price_number'}>
              <Text>{details.price&&details.price!==0 ? `￥${details.price/100}` : '免费'}</Text><Text>{details.status} 已报{details.accept}/共{details.total}人</Text>
            </View>
          </View>
          <View className={'dividing_line'}></View>
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
              <Button
                formType={'submit'}
                className={'signUp_submit'}
              >{details.price&&details.price!==0 ? `￥${details.price/100} 立即报名` : '立即报名'}</Button>
            </Form>
          </View>
        </View>
      </BaseLayout>
    )
  }
}
export default SignUp
