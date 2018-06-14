
let api = require("../../../../utils/api.js");
Page({
  data: {
    inviteCode:"",
    inviteNumber:0,
    recommNumber:0,
  },
  onShareAppMessage: function (res) {
    return {
      title: '蜗牛职信',
      path: '/pages/event/inviting/good-work-register/good-work-register?inviteCode=' + this.data.inviteCode
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
    wx.request({ //获取邀请码
      url: api.getUserInfo,
      method: "GET",
      header: {
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res) {
        _this.setData({
          inviteCode:res.data.data.inviteCode
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