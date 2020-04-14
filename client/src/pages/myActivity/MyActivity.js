import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import BaseLayout from '../../layout/layout'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './styles.less'
import { connect } from "@tarojs/redux"
import moment from 'moment'
@connect(({ user }) => ({
  userActivity: user.userActivity,
}))

class MyActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      scrollHeight: 500,
      lock: false
    }
  }
  //------------------------生命周期--------------------//
  componentDidMount() {
    this.props.dispatch({ type: 'user/apiGetUserActivity', payload: { page: 1, perPage: 10, cate: '活动中' } })
    this.initHeight()
  }
  componentWillUpdate(nextProps, nextState) {
    const { current } = this.state
    if (nextState.current !== current) {
      this.props.dispatch({ type: 'user/apiGetUserActivity', payload: { page: 1, perPage: 10, cate: ['活动中', '已结束', '转赠'][nextState.current] } })
    }
    if (nextProps.userActivity !== this.props.userActivity) {
      this.setState({ lock: false })
    }
  }
  //------------------------事件--------------------//
  handleClick = (value) => {
    this.setState({
      current: value
    })
  }
  initHeight = () => {      //初始化scrollview高度
    let windowHeight = Taro.getSystemInfoSync().windowHeight
    let scrollHeight = windowHeight - 50
    this.setState({ scrollHeight: scrollHeight })
  }
  onEnd = () => {
    const { userActivity } = this.props
    const { lock, current } = this.state
    if (!userActivity[current] || lock) {
      return
    }
    if (userActivity[current] && userActivity[current].page < userActivity[current].lastPage) {
      this.setState({ lock: true })
      this.props.dispatch({ type: 'wine/apiGetNextUserActivity', payload: { page: wineList.page + 1, perPage: 10, cate: ['活动中', '已结束', '转赠'][current] } });
    }
  }
  handleJumpToActivityDetails = (id) => {
    Taro.navigateTo({
      url: `/pages/activityDetails/activityDetails?id=${id}`
    })
  }
  givePerson = (id,myActID)=>{
    Taro.navigateTo({
      url: `/pages/activityDetails/activityDetails?id=${id}&type=share&myActID=${myActID}`
    })
  }
  handleJumpToTicket = (id) => {
    Taro.navigateTo({
      url: `/pages/ticket/ticket?id=${id}`
    })
  }
  renderItem = (vo) => {
    const { activity = {} } = vo
    return <View className='activityItem'>
      <View className='activityPic activityPicContainer' onClick={() => { this.handleJumpToActivityDetails(activity.id) }}>
        <Image className='activityPic' src={activity.banner}></Image>
        {vo.activityStatus !== '进行中' ? <View className='actCloseContainer'><Text className='actClose'>活动{vo.activityStatus === '已结束' ? '已结束' : '已转赠'}</Text></View> : null}
      </View>
      <View>
        <View onClick={() => { this.handleJumpToActivityDetails(activity.id) }}>
          <View className='actText'><Text className='actTitle'>[{activity.type}]{activity.title}</Text></View>
          <View className='actText' style={{ marginTop: '18rpx' }}><Text className='actAddress'>地址：{`${activity.address.name}`}</Text></View>
          <View className='actText' style={{ marginTop: '8rpx' }}><Text className='actTime'>时间：{`${moment(activity.startTime).format('YYYY-MM-DD')}-${moment(activity.endTime).format('YYYY-MM-DD')}`}</Text></View>
        </View>
        {(vo.activityStatus == '进行中' && vo.isSend == 0) ? <View className='actBtnContainer'>
          <View className='actBtn' onClick={()=>{this.givePerson(activity.id,vo.id)}}>转赠给好友</View>
          <View className='actBtn' style={{ marginLeft: '10rpx' }}  onClick={() => { this.handleJumpToActivityDetails(activity.id) }}>再次报名</View>
          <View className='actBtn' style={{ backgroundColor: '#EFBF28', borderWidth: 0, marginLeft: '10rpx' }} onClick={()=>{this.handleJumpToTicket(vo.id)}}>入场券</View>
        </View> : null}
        {
  vo.isSend == 1 ? <View className={'givePerson actText'}><Text className='actAddress'>活动已转赠用户：{`${vo.send &&vo.send.user.userWxName||''} ${vo.phone ||''}`}</Text></View> : null
        }

      </View>
    </View>
  }
  //------------------------渲染--------------------//
  render() {
    const tabList = [{ title: '活动中' }, { title: '已结束' }, { title: '已转赠' }]
    const { scrollHeight, current } = this.state
    const { userActivity } = this.props
    console.log('userActivity',userActivity)
    return (
      <BaseLayout hideFooter={true}>
        <View>
          <AtTabs current={current} tabList={tabList} onClick={this.handleClick}>
            <AtTabsPane current={this.state.current} index={0} >
              <ScrollView scroll-y="true" style={{ height: `${scrollHeight}px` }} lowerThreshold={200} onScrollToLower={this.onEnd}>
                <View style={{ paddingTop: '18rpx', padding: '20rpx' }}>
                  <View>
                    {userActivity[0] && userActivity[0].data.map((vo, index) => { return <View key={vo.id}> {this.renderItem(vo)}</View> })}
                  </View>
                </View>
              </ScrollView>
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
              <ScrollView scroll-y="true" style={{ height: `${scrollHeight}px` }} lowerThreshold={200} onScrollToLower={this.onEnd}>
                <View style={{ paddingTop: '18rpx', padding: '20rpx' }}>
                  <View>
                    {userActivity[1] && userActivity[1].data.map((vo, index) => { return <View key={vo.id}> {this.renderItem(vo)}</View> })}
                  </View>
                </View>
              </ScrollView>
            </AtTabsPane>
            <AtTabsPane current={current} index={2}>
              <ScrollView scroll-y="true" style={{ height: `${scrollHeight}px` }} lowerThreshold={200} onScrollToLower={this.onEnd}>
                <View style={{ paddingTop: '18rpx', padding: '20rpx' }}>
                  <View>
                    {userActivity[2] && userActivity[2].data.map((vo, index) => { return <View key={vo.id}> {this.renderItem(vo)}</View> })}
                  </View>
                </View>
              </ScrollView>
            </AtTabsPane>
          </AtTabs>
        </View>
      </BaseLayout>
    )
  }
}
export default MyActivity
