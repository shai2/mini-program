let api = require("../../../../utils/api")
let pageNow = 1;
Page({
  data: {
    res:{},
    jobObj:[], //热门相关
    pullText:'加载中 . .',
    repeatFlag:false,
  },
  onLoad(options) {
    pageNow = 1;
    wx.showLoading({title:"加载中"})
    this.myInvitingList(pageNow,true) //查询
  },
  onPullDownRefresh (){
    pageNow = 1;
    this.myInvitingList(pageNow,true)
  },
  onReachBottom(){
    this.myInvitingList(pageNow)
  },
  myInvitingList(page,refresh){
    let _this = this
    if(this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.myInvitingList,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        page:page
      },
      success(res){
        console.log(res.data)
        if (refresh) {
          _this.setData({
            res:res.data.data,
            jobObj:res.data.data.resultList,
            repeatFlag:false
          })
        }else{
          _this.setData({
            jobObj:_this.data.jobObj.concat(res.data.data.resultList),
            repeatFlag:false
          })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
        // console.log(_this.data.jobObj)
        pageNow++
        if(res.data.data.resultList.length <10){ //没数据了
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