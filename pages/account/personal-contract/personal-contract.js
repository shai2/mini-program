let api = require("../../../utils/api")
Page({
  data: {
    cid:'',
    avatar:'',
    contractObj:{},
    jid:'',
    jobDetail:{},
    enlargeFlag:false
  },
  onLoad: function (options) {
    this.setData({
      jid:options.jid,
      cid:options.cid
    })
    this.queryJobDetail()
    this.contractpath()
    wx.showLoading({title:"加载中"})
  },
  queryJobDetail(){
    let _this = this
    wx.request({
      url: api.queryJobDetail,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        jid:_this.data.jid
      },
      success(res){
        if (!res.data.data.companyLogo) { //没头像给默认头像
          res.data.data.companyLogo = "/img/default-c.png"
        };
        _this.setData({
          jobDetail:res.data.data
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  contractpath(){
    let _this = this
    wx.request({
      url: api.contractpath,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        jobId:this.data.jid
      },
      success(res){
        _this.setData({
          contractObj:res.data.data,
        })
        wx.hideLoading()
      },
      fail(res){
        console.log(res)
      }
    })
  },
  uploadContract(){
    let _this = this
    wx.chooseImage({count:1,
      success: function(res) {
        wx.uploadFile({
          url: api.uploadContract,
          header:{
            sessionId: wx.getStorageSync('sessionId')
          },
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData:{
            jobId:_this.data.jid
          },
          success: function(res){
            _this.contractpath()
            // _this.setData({
            //   ['contractObj.contractPath']:JSON.parse(res.data).url
            // })
          }
        })
      }
    })
  },
  enlargeShow(){
    this.setData({
      enlargeFlag:true
    })
  },
  enlargeHide(){
    this.setData({
      enlargeFlag:false
    })
  }
})