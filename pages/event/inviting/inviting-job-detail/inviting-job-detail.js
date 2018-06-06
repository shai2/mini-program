let api = require("../../../../utils/api")
Page({
  data: {
    jid:'',
    jobObj:{},
    userList:{},
  },
  onLoad(options) {
    this.setData({
      jid:options.jid
    })
    wx.showLoading({title:"加载中"})
    this.invitingRegister() //查询
  },
  invitingRegister(){
    let _this = this
    if(this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.invitingRegister,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        jobId:this.data.jid
      },
      success(res){
        _this.setData({
          jobObj:res.data.data.jobDetailBean,
          userList:res.data.data.userList,
        })
        console.log(res.data.data.userList)
        wx.hideLoading()
      },
      fail(res){
        console.log(res)
      }
    })
  }
})