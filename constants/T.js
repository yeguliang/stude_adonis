/**
 * Created by Fred(qq:24242811) on 08/03/2018.
 */
// 通过的工具类
const T = {
	// 验证工具
	checkMobile(num){
		return /^1\d{10}$/.test(num)
	},
	checkIDCard(str){
		return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(str)
	},
	checkMail(str){
		return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(str)
	}
}

module.exports = T