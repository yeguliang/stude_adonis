import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import { connect } from "@tarojs/redux"
import BaseLayout from '../../layout/layout'
import './styles.less'
import activity from "../../models/activity";

@connect(({ activity, user })=>({
  search: activity.search,
  userCity: user.userCity,
}))
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //---------------------生命周期------------------//
  componentDidMount() {

  }
  //---------------------事件------------------//
  handleInputSearch = (e) => {
    let values = e.detail.value
    this.props.dispatch({
      type: 'activity/apiGetSearch',
      payload: { word: values }
    })
  }
  //点击搜索结果前往指定详情页面
  handleJumpToPage = (url) => {
    Taro.navigateTo({ url: url })
  }
  //---------------------渲染------------------//
  render() {
    const { search, userCity } = this.props
    return (
      <BaseLayout hideFooter={true}>
        <View className={'search_container'}>
          <View className={'top_search'}>
            <View className={'address'}>
              <Image className={'icon'} src={require('../../asset/icon/icon_address.png')}/>
              <Text className={'name'}>{userCity ? userCity : '未知'}</Text>
            </View>
            <View className={'search_content'}>
              <Input type='text'
                     focus={true}
                     confirmType={'search'}
                     placeholder={'搜索精彩活动或葡萄酒'}
                     placeholderClass={'placeholder_styles'}
                     className={'search_input'}
                     onConfirm={(e)=>{this.handleInputSearch(e)}}
              />
              <Image className={'search_icon'} src={require('../../asset/icon/icon_search.png')}/>
            </View>
          </View>
          <View className={'search_list'}>
            {search&&search.activity&&search.activity.length!==0 ? <View className={'list_item'}>
              <View className={'item_title'}><Text>活动：</Text></View>
              {search.activity.map((vo,index)=>{
                return (
                  <View key={vo.id} className={'item_text'} onClick={()=>{this.handleJumpToPage(`/pages/activityDetails/activityDetails?id=${vo.id}`)}}>
                    <Text>[{vo.type}] {vo.title}</Text>
                  </View>
                )
              })}
            </View> : null}
            {search&&search.wine&&search.wine.length!==0 ? <View className={'list_item'}>
              <View className={'item_title'}><Text>获奖酒：</Text></View>
              {search.wine.map((vo, index)=>{
                return (
                  <View key={vo.id} className={'item_text'} onClick={()=>{this.handleJumpToPage(`/pages/wineDetails/wineDetails?id=${vo.id}`)}}>
                    <Text>{vo.winenameEn}</Text>
                  </View>
                )
              })}
            </View> : null}
          </View>
        </View>
      </BaseLayout>
    )
  }
}
export default Search
