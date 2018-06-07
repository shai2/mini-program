let info = getApp().globalData
let api = require("../../../../utils/api")
Page({
  data: {
    userInfo:{},
    rewardShow:false,
    hasReward:false,
    money:0
  },
  onShow(){
    this.getResume()
    this.getRewardStatus()
  },
  onShareAppMessage: function () {

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
  getReward(){
    if (this.data.rewardFlag!==1) return
    let _this = this
    wx.request({
      url: api.registMoney,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        // if (!res.data.money) {
        //   wx.showToast({
        //     title: '服务器异常',
        //     icon: 'none',
        //     duration: 1000
        //   })
        //   return
        // };
        _this.setData({
          money:res.data.money/100,
          rewardFlag:-1
        })
        _this.selectComponent("#redpack").show()
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getRewardStatus(){
    let _this = this
    wx.request({
      url: api.getRewardStatus,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        _this.setData({
          rewardFlag:res.data.data.rewardFlag
        })
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
  // 加data-type 来区分是不是添加 添加的话 隐藏删除 删除的话 加载那一条
  toWorkExp(e){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-workexp/personal-resume-workexp?index="+e.currentTarget.dataset.index
    })
  },
  toEduExp(e){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-eduexp/personal-resume-eduexp?index="+e.currentTarget.dataset.index
    })
  },
  toEventExp(e){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-eventexp/personal-resume-eventexp?index="+e.currentTarget.dataset.index
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