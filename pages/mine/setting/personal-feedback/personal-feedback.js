let api = require("../../../../utils/api")
let app = getApp()
Page({
  data: {
    feedbackText:''
  },
  getText(e){
    this.setData({
      feedbackText:e.detail.value
    })
  },
  feedback(){
    console.log(this.data.feedbackText)
    var _this = this
    wx.request({
      url: api.feedback,
      method:"POST",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        feedBackContent:this.data.feedbackText,
        feedBackType:0
      },
      success(res){
        wx.showToast({
          title: '反馈成功',
          icon: 'success',
          duration: 1000
        })
        _this.setData({
          feedbackText:''
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