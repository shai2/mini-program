let api = require("../../../utils/api")
let page = 1
Page({
  data: {
    jobObj:[]
  },
  onLoad(options) {
    let _this = this
    wx.showLoading({title:"加载中"})
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
        _this.setData({
          jobObj:res.data.data.data
        })
        wx.hideLoading()
        console.log(_this.data.jobObj)
      },
      fail(res){
        console.log(res)
      }
    })
  }
})