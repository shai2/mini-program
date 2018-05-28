var info = getApp().globalData
Page({
  data: {
    name:null,
    avatar:null,
    resumePercent:90
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      name:info.userInfo.nickName,
      avatar:info.userInfo.avatarUrl
    })
    console.log(info.userInfo)
  },
  toDeliver(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-hasdeliver/personal-hasdeliver"
    })
  },
  toCommunicate(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-hascommunicate/personal-hascommunicate"
    })
  },
  toInterview(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-waitinterview/personal-waitinterview"
    })
  },
  toResume(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume/personal-resume"
    })
  },
  toMore(){
    wx.navigateTo({
      url:"/pages/mine/service/personal-service/personal-service"
    })
  },
})