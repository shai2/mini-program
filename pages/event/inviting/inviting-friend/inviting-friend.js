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