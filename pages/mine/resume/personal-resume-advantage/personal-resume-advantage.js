let app = getApp()
let api = require("../../../../utils/api")
Page({
  data: {
    userInfo:{},
    repeatFlag:false
  },
  onLoad(options) {
    var _this = this
    this.getResume()
  },
  textChange(e){
    let _name = 'userInfo.jobIntension.selfEvaluation'
    this.setData({
      [_name]:e.detail.value
    })
  },
  getResume(fn){
    let _this = this
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
        if(typeof(fn)==="function") fn()
        console.log(_this.data.userInfo)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  saveResume(){
    if (this.data.repeatFlag) return
    wx.showLoading({title:"提交中"})
    let _this = this
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.resumeUpdate,
      method:"POST",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: _this.data.userInfo,
      success(res){
        wx.hideLoading()
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(()=>{
          wx.navigateBack({delta:1})
        },1000)
      },
      fail(res){
        console.log(res)
      }
    })
  }
})