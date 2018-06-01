let info = getApp().globalData
let api = require("../../../../utils/api")
Page({
  data: {
    userInfo:{}
  },
  onShow(){
    this.getResume()
  },
  getResume() {
    var _this = this
    wx.request({
      url: api.getResume,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        _this.setData({
          userInfo:res.data.data
        })
        console.log(_this.data.userInfo)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  onShareAppMessage: function () {

  },
  toIntention(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-intention/personal-resume-intention"
    })
  },
  toBaseInfo(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-baseinfo/personal-resume-baseinfo"
    })
  },
  // 加data-type 来区分是不是添加 添加的话 隐藏删除 删除的话 加载那一条
  toWorkExp(e){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-workexp/personal-resume-workexp?index="+e.currentTarget.dataset.index
    })
  },
  toEduExp(e){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-eduexp/personal-resume-eduexp="+e.currentTarget.dataset.index
    })
  },
  toEventExp(e){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-eventexp/personal-resume-eventexp="+e.currentTarget.dataset.index
    })
  },
  toMySkill(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-myskill/personal-resume-myskill"
    })
  },
  toAdvantage(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-advantage/personal-resume-advantage"
    })
  },
  save(){

  }
})