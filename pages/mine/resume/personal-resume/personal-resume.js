let info = getApp().globalData
let api = require("../../../../utils/api")
Page({
  data: {
    userInfo:{}
  },
  onLoad() {
    
  },
  onShow(){
    this.getResume()
  }, 
  onShareAppMessage() {

  },
  getResume(){
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
  toWorkExp(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-workexp/personal-resume-workexp"
    })
  },
  toEduExp(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-eduexp/personal-resume-eduexp"
    })
  },
  toEventExp(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-eventexp/personal-resume-eventexp"
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