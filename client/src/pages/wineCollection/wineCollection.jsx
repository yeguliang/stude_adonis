import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import { connect } from "@tarojs/redux"
import BaseLayout from '../../layout/layout'
import './styles.less'

@connect(({ wineCollection })=>({
  wineCollect: wineCollection.wineCollect
}))
class WineCollection extends Component {
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
      type: 'wineCollection/apiGetWineCollect',
      payload: { page: 1, perPage: 10 }
    })
  }
  //---------------------事件------------------//
  //跳转至酒品详情页面
  handleJumpToWineDetails = (id) => {
    Taro.navigateTo({
      url: `/pages/wineDetails/wineDetails?id=${id}`
    })
  }
  //搜索
  handleSearchWineCollection = (e) => {
    let value = e.detail.value
    this.setState({ word: value })
    this.props.dispatch({
      type: 'wineCollection/apiGetWineCollect',
      payload: { page: 1, perPage: 10, word: value }
    })
  }
  handleSearchInput = (e) => {
    let value = e.detail.value
    if(!value){
      this.props.dispatch({
        type: 'wineCollection/apiGetWineCollect',
        payload: { page: 1, perPage: 10 }
      })
    }
  }
  //上拉加载更多
  onReachBottom () {
    const { word } = this.state
    const { wineCollect } = this.props
    if(wineCollect.total === wineCollect.data.length){
      Taro.showToast({
        title: '没有更多了...',
        icon: 'none',
        duration: 1000,
      })
    }else{
      if(word){
        this.props.dispatch({
          type: 'wineCollection/apiGetWineCollect',
          payload: { page: 1, perPage: wineCollect.perPage + 10, word: word }
        })
      }else{
        this.props.dispatch({
          type: 'wineCollection/apiGetWineCollect',
          payload: { page: 1, perPage: wineCollect.perPage + 10 }
        })
      }
    }
  }
  //---------------------渲染------------------//
  render() {
    const { wineCollect } = this.props
    return (
      <BaseLayout hideFooter={true}>
        <View className={'wine_collect'}>
          <View className={'top_search'}>
            <View className={'search'}>
              <Input
                type={'text'}
                placeholder={'搜索葡萄酒'}
                placeholderClass={'input_placeholder'}
                className={'input_search'}
                confirmType={'search'}
                onConfirm={(e)=>{this.handleSearchWineCollection(e)}}
                onInput={(e)=>{this.handleSearchInput(e)}}
              />
              <Image className={'icon_search'} src={require('../../asset/icon/icon_search.png')}/>
            </View>
          </View>
          <View className={'wineCollection_list'}>
            {wineCollect&&wineCollect.data.map((vo, index)=>{
              return (
                <View class="search-list-item" key={vo.id} onClick={()=>{this.handleJumpToWineDetails(vo.wine.id)}}>
                  <View class="item-left">
                    <View class="list-item-brand" >{vo.wine&&vo.wine.companynameCn}</View>
                    <View class="list-item-brand">{vo.wine&&vo.wine.regionnameEn}</View>
                    <View class="list-item-title">{vo.wine&&vo.wine.winenameEn}</View>
                    <View class="list-item-sub">{`${vo.wine&&vo.wine.winenameCn} ${vo.wine&&vo.wine.aocnameCn || ''}`}</View>
                  </View>
                  <View class="item-right">
                    <View class="thumb-image-container">
                      <Image class="thumb-image" mode='aspectFit' src={`http://cdn.winewin9.com/wine100/images/wines/${vo.wine&&vo.wine.wine100No}.jpg`}></Image>
                    </View>
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
export default WineCollection
