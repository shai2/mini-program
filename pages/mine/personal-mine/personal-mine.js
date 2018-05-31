let api = require("../../../utils/api")
let info = getApp().globalData
Page({
  data: {
    userInfo:{},
    name:'',
    avatar:'',
    resumePercent:90,
    countJobStatus:[0,0,0],
  },
  onLoad(){
    this.countJobStatus()
    this.getUserInfo()
  },
  onShow(options) {
    this.setData({
      name:info.userInfo.nickName,
      avatar:info.userInfo.avatarPhoto
    })
  },
  countJobStatus(){
    let _this = this
    wx.request({
      url: api.countJobStatus,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        _this.setData({
          countJobStatus:res.data.data
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getUserInfo(){
    let _this = this
    wx.request({
      url: api.getUserInfo,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        if (res.data.data.scoreVO.totalScore==-1) {
          res.data.data.scoreVO.totalScore = 0
        };
        _this.setData({
          userInfo:res.data.data
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  toResume(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume/personal-resume"
    })
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
  toWhoFocus(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-whofocus/personal-whofocus"
    })
  },
  toMore(){
    wx.navigateTo({
      url:"/pages/mine/service/personal-service/personal-service"
    })
  },
  toJobSave(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-jobsave/personal-jobsave"
    })
  },
  toIntention(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-intention/personal-resume-intention"
    })
  }
})