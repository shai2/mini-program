let api = require("../../../utils/api")
let pageNow = 1;
Page({
  data: {
    jobObj:[], //热门相关
    pullText:'加载中 . .'
  },
  onLoad(options) {
    wx.showLoading({title:"加载中"})
    this.getJobListByType(1,3) //查询
  },
  onPullDownRefresh (){
    this.getJobListByType(1,3,true)
  },
  onReachBottom(){
    this.getJobListByType(pageNow,3)
  },
  getJobListByType(page,type,refresh){
    if (!type) type=0; //只写page 默认搜索全部类型 要判断fresh type不能省
    let _this = this
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
        if(res.data.data.data.length === 0){ //没数据了
          _this.setData({
            pullText:"到底了"
          })
          return
        }
        if (refresh) {
          _this.setData({
            jobObj:res.data.data.data
          })
        }else{
          _this.setData({
            jobObj:_this.data.jobObj.concat(res.data.data.data)
          })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
        // console.log(_this.data.jobObj)
        pageNow++
      },
      fail(res){
        console.log(res)
      }
    })
  },
})