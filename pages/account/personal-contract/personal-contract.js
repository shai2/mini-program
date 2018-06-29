let api = require("../../../utils/api")
Page({
  data: {
    cid:'',
    avatar:'',
    contractObj:{},
    jid:'',
    jobDetail:{},
    enlargeFlag:false
  },
  onLoad: function (options) {
    this.setData({
      jid:options.jid,
      cid:options.cid
    })
    this.queryJobDetail()
    this.contractpath()
    wx.showLoading({title:"加载中"})
  },
   
})