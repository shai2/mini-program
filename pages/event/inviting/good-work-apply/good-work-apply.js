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
        userId:wx.getStorageSync('userId'),
        jid:649808
      },
      success(res){
        console.log(res)
        // if(res.data.data)
        // {
        //   _this.setData({
        //     detail:"/img/collected.png"
        //   })
        // }
      },
      fail(res){
        console.log(res)
      }
    })
  }
})