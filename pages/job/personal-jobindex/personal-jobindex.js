let api = require("../../../utils/api")
let page = 1
Page({
  data: {

  },
  onLoad: function (options) {
    wx.request({
      url: api.getJobListByType,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        type: 0,
        keyword: wx.getStorageSync('hopePosition'),
        page:1
      },
      success(res){
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
    })
  }
})