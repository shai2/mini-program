
let api = require("../../../../utils/api.js");
Page({
  data: {
    inviteNumber:0,
    recommNumber:0,
  },
  onLoad: function (options) {
    let _this = this;
    wx.request({ //我的邀请
      url: api.myInvitings,
      method: "GET",
      header: {
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res) {
        console.log(res)
        _this.setData({
          inviteNumber: res.data.data.inviteNumber,
          recommNumber: res.data.data.recommNumber
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  tofriendInvite(){
    wx.navigateTo({
      url:"/pages/event/inviting/inviting-register/inviting-register"
    })
  },
  tojobInvite(){
    wx.navigateTo({
      url:"/pages/event/inviting/inviting-job/inviting-job"
    })
  }
})