// pages/mine/personal-service/personal-service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toInvitingReward(){
    wx.navigateTo({
      url:"/pages/event/inviting/inviting-friend/inviting-friend"
    })
  },
  show(){
    wx.showToast({
      title: '敬请期待',
      icon: 'none',
      duration: 2000
    })
  }
})