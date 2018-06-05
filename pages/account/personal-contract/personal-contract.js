let api = require("../../../utils/api")
Page({
  data: {
    cid:'',
    avatar:''
  },
  onLoad: function (options) {
    this.setData({
      cid:options.cid
    })
    this.queryCompanyDetail()
  },
  queryCompanyDetail(){
    let _this = this
    wx.request({
      url: api.queryCompanyDetail,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        cid:_this.data.cid
      },
      success(res){
        _this.setData({
          avatar:res.data.data.image
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
})