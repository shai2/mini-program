let api = require("../../../../utils/api")
let pageNow = 1;
Page({
  data: {
    res:{},
    sum:0,
    registerObj:[], //热门相关
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
        console.log(res.data.data.inviteUserAccountVOS)
        if (refresh) {
          _this.setData({
            res:res.data.data,
            registerObj:res.data.data.inviteUserAccountVOS,
            repeatFlag:false,
            sum:res.data.data.sum
          })
        }else{
          _this.setData({
            registerObj:_this.data.registerObj.concat(res.data.data.inviteUserAccountVOS),
            repeatFlag:false,
            sum:res.data.data.sum
          })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
        // console.log(_this.data.registerObj)
        pageNow++
        if(res.data.data.inviteUserAccountVOS.length <10){ //没数据了
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
  getReward(){
    this.selectComponent("#redpack").show()
    // 发送请求 没有红包了
  },
})