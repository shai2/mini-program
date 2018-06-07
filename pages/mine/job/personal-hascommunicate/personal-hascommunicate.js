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
    this.getJobListByStatus(pageNow,1,true) //查询
  },
  onPullDownRefresh (){
    pageNow = 1;
    this.getJobListByStatus(pageNow,1,true)
  },
  onReachBottom(){
    this.getJobListByStatus(pageNow,1)
  },
  getJobListByStatus(page,type,refresh){
    let _this = this
    if(this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.getJobListByStatus,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        type:type,
        keyword: wx.getStorageSync('hopePosition'),
        page:page
      },
      success(res){
        if (refresh) {
          _this.setData({
            jobObj:res.data.data.data,
            repeatFlag:false
          })
        }else{
          _this.setData({
            jobObj:_this.data.jobObj.concat(res.data.data.data),
            repeatFlag:false
          })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
        // console.log(_this.data.jobObj)
        pageNow++
        if(res.data.data.data.length <10){ //没数据了
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