import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input, Button, ScrollView } from '@tarojs/components'
import BaseLayout from '../../layout/layout'
import { connect } from "@tarojs/redux"
import E from '../../config/E'
import './styles.less'
@connect(({ wine }) => ({
    wineDetails: wine.wineDetails
}))
class wineDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    //------------------------生命周期--------------------//
    componentWillMount() {

    }
    componentDidMount() {
        this.props.dispatch({ type: 'wine/apiGetWineDetails', payload: { id: this.$router.params.id } });
        // Taro.setNavigationBarColor({backgroundColor:'#EDEDED'})
        //Taro.hideTabBar()
    }
    //------------------------事件--------------------//
    goCall = () => {
        const { wineDetails } = this.props
        if (wineDetails && wineDetails.company && wineDetails.company.tele) {
            Taro.makePhoneCall({ phoneNumber: wineDetails.company.tele, success: () => { }, fail: () => { } })
        }
    }
    collectWine =()=>{
        this.props.dispatch({ type: 'wine/apiPostWineCollect', payload: { type: '酒品',relationID: this.$router.params.id } });
        
    }
    //------------------------渲染--------------------//
    render() {
        const { wineDetails = {} } = this.props
        console.log('wineDetails==>', wineDetails)
        return (
            <BaseLayout hideFooter={true}>
                <View class="container">
                    <View class="header-container">
                        <View class="title">{wineDetails.winenameCn}</View>
                    </View>
                    <View class="image-container">
                        <Image class="wine-image" mode='aspectFit' src={`http://cdn.winewin9.com/wine100/images/wines/${wineDetails.pic1}.jpg`}></Image>
                        <View class={`icon ${!wineDetails.collect ? 'icon-collect' : "icon-collected"}`} onClick={this.collectWine}></View>
                    </View>
                    <View class="primaryInfo">
                        <View class="company-info">
                            {wineDetails.companynameCn}
                        </View>
                        <View class="region-info">
                            {wineDetails.regionnameEn}
                        </View>
                    </View>
                    <View class="wine-container">
                        <View class="wine-title">
                            <View class="icon-identifying wine-identifying"></View>
                            <View class="wine-text">葡萄酒数据</View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title">名称</View>
                            <View class="wine-item-info">
                                <View>{wineDetails.winenameCn}</View>
                                <View>{wineDetails.winenameEn}</View>
                            </View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title">WINE100奖项</View>
                            <View class="wine-item-info">{wineDetails.wine100Award}</View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title">编号</View>
                            <View class="wine-item-info">{wineDetails.wine100No}</View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title">类别</View>
                            <View class="wine-item-info">{`${E['WineSweetness'][wineDetails.sweetName]}${E['WineSparkling'][wineDetails.sparklingName]}${E['WineColor'][wineDetails.colorName]}葡萄酒`}</View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title">葡萄品种</View>
                            <View class="wine-item-info">{wineDetails.varietynameEn}</View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title">年份</View>
                            <View class="wine-item-info">{wineDetails.vintage}</View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title">酒精度</View>
                            <View class="wine-item-info">{wineDetails.alcohol}</View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title">酒商</View>
                            <View class="wine-item-info">{wineDetails.companynameCn}</View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title">酒商联系人</View>
                            <View class="wine-item-info">{wineDetails.company && wineDetails.company.contactPerson}</View>
                        </View>
                        <View class="wine-item">
                            <View class="wine-item-title" onClick={this.goCall}>酒商联系电话</View>
                            <View class="wine-item-info" onClick={this.goCall}>
                                <Image class="inline-icon" src='http://cdn.winewin9.com/wine100/images/icons/call.png'></Image>
                                {wineDetails.company && wineDetails.company.tele}</View>
                        </View>
                    </View >
                </View >
            </BaseLayout >
        )
    }
}
export default wineDetails