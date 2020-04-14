const E = {
    ActivityStatus: {
      Running: "进行中",
      Stop: "已结束"
    },
    WineAward: {
      Recommand:"推荐奖",
      Gold:"金奖",
      Bronze:"铜奖",
      Sliver:"银奖",
      BlackGold:"黑金奖",
      HighCP: "性价比"
    },
    CollectType: {
      Wine: "福袋",
      Activity: "活动"
    },
    WineSort: {
      CountryAsc: "countryAsc", // 国名升序
      CountryDesc: "countryDesc", // 国名降序
      WineAsc: "wineAsc", // 字母升序
      WineDesc: "wineDesc" // 字母降序
    },
    WineSweetness: {  
      ["dry"]: "干",
      ["semi-dry"]: "半干",
      ["bone-dry"]: "绝干",
      ["sweet"]: "甜",
      ["semi-sweet"]: "半甜"      
    },
    WineSparkling: {
      ["still"]: "静止",
      ["sparkling"]: "起泡"
    },
    WineColor: {
      ["red"]:"红",	
      ["white"]:"白",	
      ["orange"]:"橙",	
      ["rose"]:"桃红"
    }
  };
  
  // 将空值用键名填充
  function fillValue(dict) {
    for (var key in dict) {
      if (typeof dict[key] === "object" && dict[key]) {
        fillValue(dict[key]);
      } else if (null === dict[key]) {
        dict[key] = key;
      }
    }
  }
  fillValue(E);
  
  module.exports = E;
  