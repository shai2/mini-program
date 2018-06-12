let api = require("../../../../utils/api.js")
Page({
  data: {
    detail:{},
    position:"",
    jid:0
  },
  onLoad: function (options) {
    //jid= 649808
    this.data.position=options.position;
    this.data.jid=options.jid;
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
        // userId:wx.getStorageSync('userId'),
        // jid:649808
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
  },
  clickJob(){
    wx.navigateTo({
      url:"/pages/job/personal-jobdetail/personal-jobdetail?jid="+this.data.jid+"&pos="+this.data.position
    })
  }
})