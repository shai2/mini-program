var util = require('../../../../utils/util')
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
  showWaiting(){
    util.showWaiting()
  }
})