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
        _this.setData({
          feedbackText:''
        })
      },
      fail(res){
        console.log(res)
      }
    })
  }
})