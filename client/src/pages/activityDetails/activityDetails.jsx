import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, RichText, Button } from '@tarojs/components'
import { connect } from "@tarojs/redux"
import BaseLayout from '../../layout/layout'
import './styles.less'
import moment from 'moment'

import ActivityModal from '../../components/activityModal/activityModal'

@connect(({ system, activity, user }) => ({
  system: system.system,
  details: activity.details,
  shareActivity: activity.shareActivity,
  userInfo: user.userInfo
}))

class ActivityDetails extends Component {
  constructor(props) {
    super(props);
    let id = this.$router.params.id

    this.state = {
      id: id,
      visible: false, //弹窗
      tagItem: null,
      type: this.$router.params.type,
      myActID:this.$router.params.myActID
    }
  }
  //--------------------生命周期------------------//
  componentDidMount() {
    const { id, type,myActID } = this.state
    this.props.dispatch({
      type: 'activity/apiGetActivityDetails',
      payload: { id: parseInt(id) }
    })
    if (type == 'share') {
      this.props.dispatch({
        type: 'activity/apiPostShareActivity',
        payload: { userActivityID: parseInt(myActID) }
      })
    }
  }
  onShareAppMessage = (obj) => {
    const { shareActivity } = this.props
    if (shareActivity && obj.target.id === 'shareTicket') {
      return {
        title: '送给你一张活动门票',
        path: `/pages/index/index?shareID=${shareActivity.id}`
      }
    }
  }
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
  //---------------------事件-----------------//
  //立即报名
  handleSignUp = () => {
    const { id } = this.state
    Taro.navigateTo({
      url: `/pages/signUp/signUp?id=${id}`
    })
  }
  //活动标签弹窗
  handleShowActivityModal = (vo) => {
    this.setState({ visible: true, tagItem: vo })
  }
  renderActivityModal = () => {
    const { visible, tagItem } = this.state
    return (
      <ActivityModal
        visible={visible}
        maskClose={true}
        data={tagItem}
        onCancel={this.handleCloseModal}
      />
    )
  }
  handleCloseModal = () => {
    this.setState({ visible: false })
  }
  //收藏、取消收藏活动
  handleCollectActivity = () => {
    const { id } = this.state
    this.props.dispatch({
      type: 'activity/apiPostActivityCollect',
      payload: { type: '活动', relationID: parseInt(id) }
    })
  }
  //---------------------渲染-----------------//
  render() {
    const { system, details, userInfo } = this.props
    const { type, } = this.state
    return (
      <BaseLayout hideFooter={true}>
        {details ? <View className={'activity_details'}>
          <View className={system && system.indexOf('iOS') !== -1 ? 'content_maxPadding' : 'content'}>
            <View className={'banner'}>
              <Image src={details.banner} mode={'aspectFill'}/>
            </View>
            <View className={'info'}>
              <View className={'title'}><Text>[{details.type}] {details.title}</Text></View>
              <View className={'price_number'}>
                <Text>{details.price && details.price !== 0 ? `￥${details.price / 100}` : '免费'}</Text><Text>{details.status} 已报{details.accept}/共{details.total}人</Text>
              </View>
              <View className={'btn_line'}>
                {details.tags.map((vo, index) => {
                  return (
                    <View
                      key={index}
                      className={index == 0 ? 'button red_button' : 'button black_button'}
                      onClick={() => { this.handleShowActivityModal(vo) }}
                    >
                      <Text>{vo.name}</Text>
                    </View>
                  )
                })}
              </View>
            </View>
            <View className={'dividing_line'}></View>
            <View>
              <View className={'info_line'}>
                <View className={'line_txt'}><Text>主办方：</Text><Text>{details.sponsor}</Text></View>
                <View className={'line_txt'}><Text>合作方：</Text><Text>{details.partner && details.partner.nameCn}</Text></View>
                <View className={'line_txt'}><Text>时间：</Text><Text>{moment(details.startTime).format('YYYY.MM.DD')} - {moment(details.endTime).format('YYYY.MM.DD')}</Text></View>
                <View className={'line_txt'}><Text>地址：</Text><Text>{details.address && details.address.name}</Text></View>
              </View>
              <View className={'dividing_line'}></View>
              <View className={'details'}>
                <View className={'title'}><View className={'line'}></View><Text>活动详情</Text></View>
                <View className={'text_content'}>
                  <RichText nodes={details.content.replace('<img ', '<img style="max-width:100%;height:auto"')} />
                </View>
              </View>
            </View>
          </View>
          <View className={'footer'}>
            {!type ? <View className={'main_foot'}>
              <View className={'share_collect'}>
                <Button className={'icon_button'} style={{ padding: 0 }} open-type='share'>
                  <Image src={require('../../asset/icon/icon_share.png')} />
                  <Text>分享</Text>
                </Button>
                {userInfo && userInfo.mobile ? <View className={'icon_button'} onClick={() => { this.handleCollectActivity() }}>
                  <Image src={details && details.collect ? require('../../asset/icon/icon_collected.png') : require('../../asset/icon/icon_collect.png')} />
                  <Text>收藏</Text>
                </View> : <Button className={'icon_button'} style={{ padding: '0px' }} open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
                    <Image src={details && details.collect ? require('../../asset/icon/icon_collected.png') : require('../../asset/icon/icon_collect.png')} />
                    <Text>收藏</Text>
                  </Button>}
              </View>
              {userInfo && userInfo.mobile ? <View className={'sign_up'} onClick={() => { this.handleSignUp() }}>
                <Text>{details.price && details.price !== 0 ? `￥${details.price / 100} 立即报名` : '立即报名'}</Text>
              </View> : <Button className={'sign_up'} style={{ padding: '0px' }} open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
                  <Text>{details.price && details.price !== 0 ? `￥${details.price / 100} 立即报名` : '立即报名'}</Text>
                </Button>}
            </View> : <View className={'main_foot'}>
                <View className={'share_collect'}>
                  {userInfo && userInfo.mobile ?
                    <View className={'icon_button'} style={{ marginLeft: 0 }} onClick={() => { this.handleCollectActivity() }}>
                      <Image src={details && details.collect ? require('../../asset/icon/icon_collected.png') : require('../../asset/icon/icon_collect.png')} />
                      <Text>收藏</Text>
                    </View> : <Button className={'icon_button'} style={{ padding: '0px' }} open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber}>
                      <Image src={details && details.collect ? require('../../asset/icon/icon_collected.png') : require('../../asset/icon/icon_collect.png')} />
                      <Text>收藏</Text>
                    </Button>}
                </View>
                <Button id={'shareTicket'} className={'sign_up'} style={{ width: '474rpx', padding: '0px' }} open-type='share'>
                  <Text>已报名，转赠给好友</Text>
                </Button>
              </View>}
            {system && system.indexOf('iOS') !== -1 ? <View className={'empty_bottom'}></View> : null}
          </View>
          {this.renderActivityModal()}
        </View> : null}
      </BaseLayout>
    )
  }
}
export default ActivityDetails
