import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import BaseLayout from '../../layout/layout'
import './styles.less'
import { connect } from "@tarojs/redux"
@connect(({ system }) => ({
  windowHeight: system.windowHeight,
  system:system.system
}))

 class PrizeWines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [
        {
          title: '黑金奖',
          url: 'http://cdn.winewin9.com/wine100/images/iconPrize/iconPrize_1.png',
          type_index: 1,
          text_color: '#1F3135'
        },
        {
          title: '金奖',
          url: 'http://cdn.winewin9.com/wine100/images/iconPrize/iconPrize_2.png',
          type_index: 2,
          text_color: '#DFB13A'
        },
        {
          title: '银奖',
          url: 'http://cdn.winewin9.com/wine100/images/iconPrize/iconPrize_3.png',
          type_index: 3,
          text_color: '#777777'
        },
        {
          title: '铜奖',
          url: 'http://cdn.winewin9.com/wine100/images/iconPrize/iconPrize_4.png',
          type_index: 4,
          text_color: '#B06C3D'
        },
        {
          title: '推荐奖',
          url: 'http://cdn.winewin9.com/wine100/images/iconPrize/iconPrize_5.png',
          type_index: 5,
          text_color: '#4E4299'
        },
        {
          title: '性价比甄选',
          url: 'http://cdn.winewin9.com/wine100/images/iconPrize/iconPrize_6.png',
          type_index: 6,
          text_color: '#E5342C'
        },
      ],
      containerHeight:600
    }
  }
  //------------------------生命周期--------------------//
  componentDidMount() {
    Taro.hideTabBar()
    const { system } = this.props
    this.setState({containerHeight:98+(system?system.includes('iOS')?68:0:0)})
  }
  handleJumpToPrizeWinesList = (type) => {
    Taro.navigateTo({
      url: `/pages/prizeWinesList/prizeWinesList?type=${type}`
    })
  }
  //------------------------事件--------------------//
  //------------------------渲染--------------------//
  render() {
    const { typeList ,containerHeight} = this.state
    return (
      <BaseLayout pageIndex={2}>
        <View className='container' style={{height:`calc(100vh - ${containerHeight}rpx)`}}>
          <View className="logo-container">
            <Image className="logo" src="http://cdn.winewin9.com/wine100/images/logo/wine100logo.png"></Image>
          </View>
          <View className='typeContent'>
            {typeList.map((vo, index) => {
              return <View style={{ margin: '10rpx', height: '270rpx' }} key={vo.type_index}>
                <View className=' items' onClick={() => { this.handleJumpToPrizeWinesList(vo.title) }}>
                  <Image className={'typeLogo'} src={vo.url}></Image>
                  <Text className={'typeText'} style={{ color: vo.text_color }}>{vo.title}</Text>
                </View>
              </View>
            })}
          </View>
        </View>
      </BaseLayout>
    )
  }
}
export default PrizeWines