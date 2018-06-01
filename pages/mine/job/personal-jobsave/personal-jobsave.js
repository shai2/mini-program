let api = require("../../../../utils/api")
let pageNow = 1;
Page({
  data: {
    jobObj:[], //热门相关
    pullText:'加载中 . .',
    repeatFlag:false,
  },
  onLoad(options) {
    pageNow = 1;
    wx.showLoading({title:"加载中"})
    this.jobSaveList(pageNow,true) //查询
  },
  onPullDownRefresh (){
    pageNow = 1;
    this.jobSaveList(pageNow,true)
  },
  onReachBottom(){
    this.jobSaveList(pageNow)
  },
  jobSaveList(page,refresh){
    let _this = this
    if(this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.jobSaveList,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (refresh) {
          _this.setData({
            jobObj:res.data.data,
            repeatFlag:false
          })
        }else{
          _this.setData({
            jobObj:_this.data.jobObj.concat(res.data.data),
            repeatFlag:false
          })
        }
        // console.log(_this.data.jobObj)
        pageNow++
        if(res.data.data.length <10){ //没数据了
          _this.setData({
            pullText:"到底了"
          })
          return
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
})