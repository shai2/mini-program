
let api = require("../../../../utils/api.js");
Page({
  data: {
    inviteNumber:0,
    recommNumber:0,
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '蜗牛职信',
      path: '/pages/event/inviting/good-work-register/good-work-register?userId=' + wx.getStorageSync('userId')
    }
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
      url:"/pages/event/inviting/inviting-registerlist/inviting-registerlist"
    })
  },
  tojobInvite(){
    wx.navigateTo({
      url:"/pages/event/inviting/inviting-joblist/inviting-joblist"
    })
  }
})