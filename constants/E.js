const E = {
  HttpMethod: {
    Get: 'get',
    Post: 'post',
    Put: 'put',
    Patch: 'patch',
    Delete: 'delete'
  },
  OrderStatus: {
    Init: '初始化',
    Reservation: '预订',
    Pending: '待处理',
    TransferOrder: '转派',
    Dispatched: '已派单',
    InProgress: '进行中',
    Cancelled: '取消',
    Hacker: '黑客攻击',
    Completed: '完成'
  },
  WorkerLevel: {
    TeamLeader: '组长',
    TeamMember: '组员'
  },
  WorkerAccountStatus: {
    Init: '初始',
    Agree: '同意',
    Reject: '拒绝'
  },
  CancleOrderStatus: {
    Client: '客户取消',
    NotConfirm: '师傅取消',
    Doing: '任务取消'
  },

  PayType: {
    Debug: '测试支付',
    Wechat: '微信支付'
  },
  AdminLevel: {
    总部: '总部',
    服务商: '服务商'
  },
  OrderFrom: {
    小程序: '小程序',
    美团: '美团',
    电话下单: '电话下单',
    二维码跳转下单: '二维码跳转下单',
    定时定点: '定时定点'
  },
  DiscoveryType: {
    WELFARE: 'welfare',
    ACTIVITIES: 'activities',
    MEDIA: 'media'
  }
}

// 将空值用键名填充
function fillValue(dict) {
  for (var key in dict) {
    if (typeof dict[key] === 'object' && dict[key]) {
      fillValue(dict[key])
    } else if (null === dict[key]) {
      dict[key] = key
    }
  }
}
fillValue(E)

module.exports = E
