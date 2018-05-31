let api = require("../../../utils/api")
let pageNow = 1;
Page({
  data: {
    jobObj:[], //搜索相关
    pullText:'加载中 . .',
    repeatFlag:false,
  },
  onLoad(options) {
    wx.showLoading({title:"加载中"})
    this.getJobListByType(pageNow)
  },
  onPullDownRefresh (){
    this.getJobListByType(1,0,true)
  },
  onReachBottom(){
    this.getJobListByType(pageNow)
  },
  getJobListByType(page,type,refresh){
    if (!type) type=0; //只写page 默认搜索全部类型 要判断fresh type不能省
    let _this = this
    if(this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.getJobListByType,
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
        if(res.data.data.data.length === 0){ //没数据了
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
  toAll(){  //全部
    wx.navigateTo({
      url: "/pages/job/job-all/job-all"
    })
  },
  toNew(){  //全新
    wx.navigateTo({
      url: "/pages/job/job-new/job-new"
    })
  },
  toHot(){  //热门
    wx.navigateTo({
      url: "/pages/job/job-hot/job-hot"
    })
  },
  toTop(){  //高薪
    wx.navigateTo({
      url: "/pages/job/job-top/job-top"
    })
  }
})