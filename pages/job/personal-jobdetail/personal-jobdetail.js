let api = require("../../../utils/api")
let pageNow = 1;
Page({
  data: {
    jobDetail:{},
    jobObj:[], //热门相关
    jid:'',
    pullText:'加载中 . .'
  },
  onLoad(options) {
    this.setData({
      jid:options.jid
    })
    wx.showLoading({title:"加载中"})
    this.queryJobDetail()//岗位详情
    this.getHotJobList(pageNow) //请求相关
  },
  onPullDownRefresh (){
    this.queryJobDetail()
  },
  onReachBottom(){
    this.getHotJobList(pageNow)
  },
  getHotJobList(page,refresh){
    let _this = this
    wx.request({
      url: api.getHotJobList,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        position:jobDetail.position,
        page:page
      },
      success(res){
        _this.setData({
          jobObj:_this.data.jobObj.concat(res.data.data.data)
        })
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
        wx.stopPullDownRefresh()
        wx.hideLoading()
        _this.setData({
          jobDetail:res.data.data
        })
        console.log(_this.data.jobDetail)
      },
      fail(res){
        console.log(res)
      }
    })
  }
})