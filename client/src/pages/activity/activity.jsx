import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from "@tarojs/redux"
import BaseLayout from '../../layout/layout'
import './styles.less'
import moment from 'moment'

import ActivityModal from '../../components/activityModal/activityModal'

@connect(({ user, activity }) => ({
  userCity: user.userCity,
  indexBanner: activity.indexBanner,
  indexActivity: activity.indexActivity,
}))

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      bannerInfo: null,
      visible: false, //弹窗
      tagItem: null,
    }
  }
  config = {
    onReachBottomDistance: 50,   //上拉加载事件的触发距离
  }
  //------------------------生命周期--------------------//
  componentDidMount() {
    this.props.dispatch({ type: 'activity/apiGetActivityPageInfo', payload: { page: 1, perPage: 10 } })
    //
  }
  componentDidShow(){
    Taro.hideTabBar()
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const { indexBanner } = this.props
    if(indexBanner != nextProps.indexBanner && nextProps.indexBanner){
      this.setState({ current: 0, bannerInfo: nextProps.indexBanner[0] })
    }
  }
  //------------------------事件--------------------//
  //点击搜索输入框前往搜索页面
  handleJumpToSearchPage = () => {
    Taro.navigateTo({ url: '/pages/search/search' })
  }
  //banner改变
  handleChangeBanner = (current) => {
    const { indexBanner } = this.props
    this.setState({ current: current, bannerInfo: indexBanner[current] })
  }
  handleJumpToActivityDetails = (id) => {
    Taro.navigateTo({
      url: `/pages/activityDetails/activityDetails?id=${id}`
    })
  }
  //点击banner跳转至活动详情页
  handleJumpToActivityDetails = (id) => {
    Taro.navigateTo({
      url: `/pages/activityDetails/activityDetails?id=${id}`
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
  //上拉加载更多
  onReachBottom () {
    const { indexActivity } = this.props
    if(indexActivity.total === indexActivity.data.length){
      Taro.showToast({
        title: '没有更多了...',
        icon: 'none',
        duration: 1000,
      })
    }else{
      this.props.dispatch({ type: 'activity/apiGetActivityPageInfo', payload: { page: 1, perPage: indexActivity.perPage + 10 } })
    }
  }
  //------------------------渲染--------------------//
  render() {
    const { current, bannerInfo } = this.state
    const { userCity, indexBanner, indexActivity } = this.props
    return (
      <BaseLayout pageIndex={1}>
        <View className={'activity_container'}>
          <View className={'top_search'}>
            <View className={'address'}>
              <Image className={'icon'} src={require('../../asset/icon/icon_address.png')}/>
              <Text className={'name'}>{userCity ? userCity : '未知'}</Text>
            </View>
            <View className={'search_content'}>
              <Input type='text'
                     confirmType={'search'}
                     placeholder={'搜索精彩活动或葡萄酒'}
                     placeholderClass={'placeholder_styles'}
                     className={'search_input'}
                     onClick={()=>{this.handleJumpToSearchPage()}}
              />
              <Image className={'search_icon'} src={require('../../asset/icon/icon_search.png')}/>
            </View>
          </View>
          {indexBanner ? <View className={'banner'}>
            <Swiper
              current={current}
              indicatorDots={false}
              onChange={(e)=>{this.handleChangeBanner(e.detail.current)}}
            >
              {indexBanner.map((vo, index)=>{
                return (
                  <SwiperItem key={index} onClick={()=>{this.handleJumpToActivityDetails(vo.id)}}>
                    <Image className={'banner_img'} src={vo.banner} mode={'aspectFill'}/>
                  </SwiperItem>
                )
              })}
            </Swiper>
            <View className={'banner_dots'}>
              {indexBanner.map((vo, index)=>{
                return (
                  <View key={index} className={current===index ? 'dot_active' : 'dots'}></View>
                )
              })}
            </View>
          </View> : null}
          {bannerInfo ? <View className={'activity_details'}>
            <View className={'name_price'}><Text>[{bannerInfo.type}]{bannerInfo.title}</Text><Text>{bannerInfo.price ? `￥${bannerInfo.price/100}` : '免费'}</Text></View>
            <View className={'btn_line'}>
              {bannerInfo.tags&&bannerInfo.tags.map((vo, index)=>{
                return (
                  <View key={index}
                        className={index==0 ? 'button red_button' : 'button black_button'}
                        onClick={()=>{this.handleShowActivityModal(vo)}}
                  ><Text>{vo.name}</Text></View>
                )
              })}
            </View>
            <View className={'contact_txt'}><Text>主办方：{bannerInfo.sponsor}</Text></View>
            <View className={'contact_txt'}><Text>地址：{bannerInfo.address&&bannerInfo.address.name}</Text></View>
            <View className={'contact_txt'}><Text>时间：{moment(bannerInfo.startTime).format('YYYY.MM.DD')} - {moment(bannerInfo.endTime).format('YYYY.MM.DD')}</Text></View>
          </View> : null}
          <View className={'activity_list'}>
            <View className={'title'}><View className={'line'}></View><Text>精彩活动</Text></View>
            {indexActivity&&indexActivity.data ? <View className={'list'}>
              {
                indexActivity.data.map((vo, index)=>{
                  return (
                    <View key={vo.id} className={'card'} onClick={()=>{this.handleJumpToActivityDetails(vo.id)}}>
                      <Image className={'card_pic'} src={vo.banner} mode={'aspectFill'}/>
                      <View className={'message'}>
                        <View className={'card_name'}><Text>[{vo.type}] {vo.title}</Text></View>
                        <View className={'card_otherInfo'}>
                          <Text>{vo.address&&vo.address.name}</Text><Text>{moment(vo.startTime).format('YYYY.MM.DD')}</Text>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View> : null}
          </View>
          {this.renderActivityModal()}
        </View>
      </BaseLayout>
    )
  }
}
export default Activity
