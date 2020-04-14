import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import { connect } from "@tarojs/redux"
import BaseLayout from '../../layout/layout'
import './styles.less'
import moment from 'moment'

@connect(({ activityCollect })=>({
  collect: activityCollect.collect,
}))
class ActivityCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null,
    }
  }
  config = {
    onReachBottomDistance: 50,   //上拉加载事件的触发距离
  }
  //---------------------生命周期------------------//
  componentDidMount() {
    this.props.dispatch({
      type: 'activityCollect/apiGetActivityCollect',
      payload: { page: 1, perPage: 10 }
    })
  }
  //---------------------事件------------------//
  //跳转至活动详情页
  handleJumpToActivityDetails = (id) => {
    Taro.navigateTo({
      url: `/pages/activityDetails/activityDetails?id=${id}`
    })
  }
  //搜索
  handleSearchActivityCollection = (e) => {
    let value = e.detail.value
    this.setState({ word: value })
    this.props.dispatch({
      type: 'activityCollect/apiGetActivityCollect',
      payload: { page: 1, perPage: 10, word: value }
    })
  }
  handleSearchInput = (e) => {
    let value = e.detail.value
    if(!value){
      this.props.dispatch({
        type: 'activityCollect/apiGetActivityCollect',
        payload: { page: 1, perPage: 10 }
      })
    }
  }
  //上拉加载更多
  onReachBottom () {
    const { word } = this.state
    const { collect } = this.props
    if(collect.total === collect.data.length){
      Taro.showToast({
        title: '没有更多了...',
        icon: 'none',
        duration: 1000,
      })
    }else{
      if(word){
        this.props.dispatch({
          type: 'activityCollect/apiGetActivityCollect',
          payload: { page: 1, perPage: collect.perPage + 10, word: word }
        })
      }else{
        this.props.dispatch({
          type: 'activityCollect/apiGetActivityCollect',
          payload: { page: 1, perPage: collect.perPage + 10 }
        })
      }
    }
  }
  //---------------------渲染------------------//
  render() {
    const { collect } = this.props
    return (
      <BaseLayout hideFooter={true}>
        <View className={'activity_collect'}>
          <View className={'top_search'}>
            <View className={'search'}>
              <Input
                type={'text'}
                placeholder={'搜索收藏的活动'}
                placeholderClass={'input_placeholder'}
                className={'input_search'}
                confirmType={'search'}
                onConfirm={(e)=>{this.handleSearchActivityCollection(e)}}
                onInput={(e)=>{this.handleSearchInput(e)}}
              />
              <Image className={'icon_search'} src={require('../../asset/icon/icon_search.png')}/>
            </View>
          </View>
          <View className={'collect_list'}>
            {collect&&collect.data.map((vo,index)=>{
              return (
                <View className={'item_card'} key={vo.id} onClick={()=>{this.handleJumpToActivityDetails(vo.activity&&vo.activity.id)}}>
                  <View className={'card_pic'}>
                    <Image className={'pic'} src={vo.activity&&vo.activity.banner}/>
                    <View className={'status'}><Text>活动{vo.activity&&vo.activity.status}</Text></View>
                  </View>
                  <View className={'card_text'}>
                    <View className={'name'}><Text>[{vo.activity&&vo.activity.type}] {vo.activity&&vo.activity.title}</Text></View>
                    <View className={'other_line'}><Text>{vo.activity&&vo.activity.address&&vo.activity.address.name}</Text></View>
                    <View className={'other_line'}><Text>{moment(vo.activity&&vo.activity.startTime).format('YYYY.MM.DD')} - {moment(vo.activity&&vo.activity.endTime).format('MM.DD')}</Text></View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </BaseLayout>
    )
  }
}
