var info = getApp().globalData
Page({
  data: {
    avatar:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIehr5Z2wbgOyiaiakRCXxdP8pmlicszkYPBoZLt38IpG1SFyst312rtHkaIbH6jHLvRV0IAHYr0lXlA/132"
  },
  onReady: function () {
    this.setData({

    })
    console.log(info.userInfo)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toIntention(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-intention/personal-intention"
    })
  }
})