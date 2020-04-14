import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input, Button, ScrollView } from '@tarojs/components'
import BaseLayout from '../../layout/layout'
import { connect } from "@tarojs/redux"
import './styles.less'
import E from '../../config/E'
@connect(({ wine }) => ({
  wineList: wine.wineList
}))
class prizeWinesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 500
    }
  }
  //------------------------生命周期--------------------//
  componentWillMount() {
  }
  componentDidMount() {
    //Taro.hideTabBar()
    Taro.setNavigationBarTitle({ title: `WINE100-${this.$router.params.type}` })
    this.props.dispatch({ type: 'wine/apiGetWine', payload: { award: this.$router.params.type, page: 1, perPage: 10 } });
    this.initHeight()
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.wineList !== this.props.nextProps) {
      this.setState({ lock: false })
    }
    if (nextState.orderParam !== this.state.orderParam) {
      this.props.dispatch({ type: 'wine/apiGetWine', payload: { award: this.$router.params.type, page: 1, perPage: 10, sortBy: nextState.orderParam } });
    }
  }
  //------------------------事件--------------------//
  handleJumpToPrizeWinesDetails = (id) => {
    Taro.navigateTo({
      url: `/pages/wineDetails/wineDetails?id=${id}`
    })
  }
  initHeight = () => {      //初始化scrollview高度
    let query = Taro.createSelectorQuery()
    query.select('.top').boundingClientRect()
    query.select('.sort-container').boundingClientRect()
    query.exec(res => {
      let height_1 = res[0].height
      let height_2 = res[1].height
      let windowHeight = Taro.getSystemInfoSync().windowHeight
      let scrollHeight = windowHeight - height_1 - height_2
      this.setState({ scrollHeight: scrollHeight })
    })
  }
  onEnd = () => {
    const { wineList } = this.props
    const { lock } = this.state
    if (!wineList || lock) {
      return
    }
    if (wineList && wineList.page < wineList.lastPage) {
      this.setState({ lock: true })
      this.props.dispatch({ type: 'wine/apiGetNextWine', payload: { award: this.$router.params.type, page: wineList.page + 1, perPage: 10, sortBy: this.state.orderParam } });
    }
  }
  orderSearch = (type) => {
    this.setState({ orderParam: E['WineSort'][type] })
  }
  goSearch = () => {
    const { word } = this.state
    this.props.dispatch({ type: 'wine/apiGetWine', payload: { word: word } });
  }
  //------------------------渲染--------------------//
  render() {
    const { wineList } = this.props
    const { scrollHeight } = this.state
    console.log('===>wineList', wineList)
    return (
      <BaseLayout hideFooter={true}>
        <View className={'container'}>
          <View class="top" style={{ paddingBottom: '38rpx' }}>
            <View class="search-bar">
              <View class="logo icon-wine100-s"></View>
              <View class="border"></View>
              <Input type="text" confirmType="search" onConfirm={this.goSearch} onInput={(e) => { this.setState({ word: e.target.value }) }}
                class="txt-search" name="txtSearch" placeholder="输入酒品信息" value="" />
              <Button class='btn-search icon-search' onClick={this.goSearch}></Button>
            </View>
          </View>
          <View class="sort-container" >
            <Button onClick={() => { this.orderSearch('CountryAsc') }}>国名升序</Button><Button onClick={() => { this.orderSearch('CountryDesc') }}>国名降序</Button>
            <Button onClick={() => { this.orderSearch('WineAsc') }}>字母升序</Button><Button onClick={() => { this.orderSearch('WineDesc') }}>字母降序</Button>
          </View>
        </View>
        <ScrollView class="search-list" scroll-y="true" style={{ height: `${scrollHeight}px` }} lowerThreshold={200} onScrollToLower={this.onEnd}>
          {wineList && wineList.data.map((vo) => {
            return <View class="search-list-item" onClick={() => { this.handleJumpToPrizeWinesDetails(vo.id) }} key={vo.id}>
              <View class="item-left">
                <View class="list-item-brand" >{vo.companynameCn}</View>
                <View class="list-item-brand">{vo.regionnameEn}</View>
                <View class="list-item-title">{vo.winenameEn}</View>
                <View class="list-item-sub">{`${vo.winenameCn} ${vo.aocnameCn || ''}`}</View>
              </View>
              <View class="item-right">
                <View class="thumb-image-container">
                  <Image class="thumb-image" mode='aspectFit' src={`http://cdn.winewin9.com/wine100/images/wines/${vo.wine100No}.jpg`}></Image>
                </View>
              </View>
            </View>
          })}

        </ScrollView>
      </BaseLayout>
    )
  }
}
export default prizeWinesList