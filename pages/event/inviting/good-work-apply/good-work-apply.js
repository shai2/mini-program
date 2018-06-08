let api = require("../../../../utils/api.js")
Page({
  data: {
    detail:{}
  },
  onLoad: function (options) {
    //jid= 649808
    var _this=this;
    wx.request({
      url: api.shareJobDetail,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        userId:options.userId,
        jid:options.jid
      },
      success(res){
        console.log(res.data.data)
        if(res.data.msg=="success")
        {
          console.log(res.data.data)
          _this.setData({
            detail:res.data.data
          })
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  apply(){
    wx.switchTap({
      url:"/pages/job/personal-jobindex/personal-jobindex"
    })
  }
})