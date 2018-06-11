let api = require("../../../../utils/api")
let pageNow = 1;
Page({
  data: {
    jobObj:[], //热门相关
    pullText:'加载中 . .',
    repeatFlag:false,
  },
  onLoad(options) {
    pageNow = 1
    wx.showLoading({title:"加载中"})
    this.jobListInterviewed(pageNow,2,true) //查询
  },
  onPullDownRefresh (){
    pageNow = 1;
    this.jobListInterviewed(pageNow,2,true)
  },
  onReachBottom(){
    this.jobListInterviewed(pageNow,2)
  },
  jobListInterviewed(page,type,refresh){
    let _this = this
    if(this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.jobListInterviewed,
      method:"GET",
        header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        page:page
      },
      success(res){
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
        wx.hideLoading()
        wx.stopPullDownRefresh()
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
  enlarge(){
    
  }
})