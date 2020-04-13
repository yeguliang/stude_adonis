/**
 * Created by Fred(qq:24242811) on 22/02/2018.
 */
const ERR = {

	/*------ 通用错误码 1000~9999 ------*/
	UNDEFINED:            {error:1000,message:'未定义异常'},
	INVALID_PARAMS:       {error:1001,message:'参数异常'},
	API_ERROR:            {error:1002,message:'接口异常'},
	AUTH_FAILED:          {error:1003,message:'无效验证'},
	USER_NOT_EXISTS:      {error:1004,message:'账号不存在'},
	USER_ROLE_NO_PRIVILEGE:{error:1005, message: '操作权限不足'},

	SQL_DUPLICATION:      {error:3004, message:"数据已经存在"},
	SQL_INCOMPLETE_PARAMS:{error:3005, message:'错误，参数不全'},
	SQL_INSERT_FAILED:    {error:3006, message:'插入数据失败'},
  SQL_DUP_NAME_OR_PHONE:{error:3007, message:'用户名或手机号重复'},
  SQL_DUP_NAME_OR_PASSWORD:{error:3008, message:'用户名或密码错误'},

	USER_FORBIDDEN:       {error:1004,message:'用户已被禁用'},
	USER_EXISTS:          {error:1005,message:'账号已经存在'},
	INVALID_PASSWORD:     {error:1006,message:'密码错误'},
	USER_IN_BLACKLIST:    {error:1007,message:'用户被列入黑名单'},
	SESSION_FAILED:       {error:1008,message:'您账户已经在另一设备登录'},
	AUTH_LOGIN:           {error:1009,message:'请先登录'},
	PHONE_NOT_REGISTER:   {error:1010,message:'手机号未注册'},
	PHONE_NOT_INPUT:      {error:1011,message:'请输入手机号码'},
	PHONE_IS_REGISTER:    {error:1012,message:'该手机号码已经注册'},

	// RESTFUL
	RESTFUL_GET_ID:       {error:2001, message:"查询数据不存在"},
	RESTFUL_DELETE_ID:    {error:2002, message:"删除数据不存在"},
	RESTFUL_UPDATE_ID:    {error:2003, message:"更新数据不存在"},
	RESTFUL_DUPLICATION:  {error:2004, message:"数据已经存在"},
	RESTFUL_TODO:         {error:2005, message:"该接口未实现"},
	RESTFUL_HAS_DELETED:  {error:2006, message:"该数据已被删除"},
  RESTFUL_GET_AUTH:     {error:2007, message:"该权限不存在"},
  RESTFUL_SUPER_ADMIN:  {error:2008, message:"超级管理员只能有一个"},
	/*------ 业务错误码 10000~19999 ------*/
	// 短信验证码
	INVALID_SMS_CAPTCHA:    {error:11001,message:'验证码错误'},
	SMS_MAX_DAILY_COUNT:    {error:11002,message:'验证短信过多，请改日再试'},
	SMS_MIN_INTERVAL:       {error:11003,message:'验证短信至少间隔60s'},
	SMS_EXPIRE:             {error:11004,message:'短信验证码过期'},

	// 上传异常
	UPLOAD_FILE_NOT_EXIST:  {error:12001,message:'文件不存在'},
	UPLOAD_FAILED:          {error:12002,message:'文件上传失败'},
	UPLOAD_OSS_FAILED:      {error:12003,message:'OSS上传失败'},
	NOTICE_FILE_NOT_EXIST:  {error:12004,message:'公告文件不存在'},

	//入参错误
	PHONE_INVALID:          {error:13001,message:'手机号格式错误'},

	// 任务
	ALREADY_DAILY_SIGN:     {error:14001,message:'已经签到过了'},

	// 用户相关
	WALLET_NOT_ENOUGH:      {error:15001, message: '积分不足'},
  WALLET_NOT_COIN:				{error:15002, message: '余额不足'},
  WALLET_NOT_SEX:					{error:15003, message: '没有选择性别'},

	// 商品订单相关
	// SKU_STOCK_NOT_ENOUGH:      {error:16001, message: '商品库存不足'},
	// ORDER_STATUS_INVALID:      {error:16002, message: '该状态下无法执行订单操作'},
	// ORDER_STATUS_FINISH:      {error:16003, message: '订单已完成'},
  ORDER_NORMAL_ALREADY:      {error:16004, message: '第二次订单无法免运费'},
  ORDER_FIRST_ALREADY:      {error:16005, message: '首餐只能享用一次'},
	ORDER_DINNER_TIME_NOT_ENOUGH:  {error:16006, message: '用餐日期安排不足'},

	ORDER_DELIVERY_TIME_INVALID:  {error:16007, message: '请选择有效配餐时间'},
	ORDER_DATE_OLD:  {error:16008, message: '用餐时间至少明天开始'},
	ORDER_DATE_INVALID:  {error:16009, message: '该日期没有配送餐'},
	ORDER_DATE_HAS_DINNER:  {error:16010, message: '该日期已有配餐'},
	ORDER_DATE_OLD_18H:  {error:16011, message: '18点前才可修改明日配餐'},

	ORDER_STATUS_INVALID:{error:16010, message: '配送状态异常'},

	ORDER_DELIVERY_ONLY_TODAY:{error:16011, message: '只能当日配送'},

	ORDER_REFUND_INVALID:{error:16012, message:'订单未支付或已退单'},
	ORDER_HAS_POST_PAID:{error:16013, message:'请先支付「先吃后付」订单'},
	ORDER_TYPE_INVALID:{error:16014, message:'该订单类型不支持此操作'},
	ORDER_REFUND_NO_DINNER:{error:16015, message:'订单无配餐可退'},

	ORDER_REFUND_RMB_INVALID:{error:16016, message:'退款金额不正确'},
	ORDER_CANCEL_HAS_DINNER:  {error:16017, message: '订单已有消费，无法直接退单'},

	// 团购
	GROUP_BUY_STATUS_INVALID: {error:20010, message: '拼团状态异常'},

	// 第三方接口
	THIRD_AUTH:           {error:17001, message:"code验证失败"},
	MOBILE_NOT_EXIST:     {error:17002, message:"该手机号用户不存在"},

	//评分相关
  TYPE_ERR :            {error:18001, message:"评分类型有误"},
  NOT_FIND_COURSE :            {error:18002, message:"该用户未拥有该课程"},
  SCORED_COURSE :            {error:18003, message:"重复加分"},

	//下单相关
  SELLER_CASH_NOT_ENOUGH :            {error:19001, message:"现金不足"},
  SELLER_APPLY_CASH_MIN :            {error:19002, message:"不足提现最小金额"},
  SELLER_APPLY_CASH_STATUS_INVALID :            {error:19003, message:"提现申请状态异常"},

	// 优惠券
	COUPON_NOT_EXIST:{error:20001, message:"无优惠券可用"},
	COUPON_USER_LIMIT:{error:20002, message:"优惠券数量已达上限"},
	USER_COUPON_USED:{error:20003, message:"优惠券已使用"},
	USER_COUPON_EXPIRE:{error:20004, message:"优惠券已过期"},
}

module.exports = ERR