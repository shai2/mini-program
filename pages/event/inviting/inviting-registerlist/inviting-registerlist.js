let api = require("../../../../utils/api")
let pageNow = 1;
Page({
  data: {
    res:{},
    sum:0,
    registerObj:[], //热门相关
    pullText:'加载中 . .',
    repeatFlag:false,
    money:0
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
  getReward(e){
    if (e.currentTarget.dataset.inviteRewardFlag===2) return
    let _this = this
    wx.request({
      url: api.inviteMoney,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        id:e.currentTarget.dataset.id
      },
      success(res){
        if (!res.data.data.money) {
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 1000
          })
          return
        };
        let _flag = 'registerObj['+e.currentTarget.dataset.index+'].inviteRewardFlag'
        _this.setData({
          money:res.data.data.money/100,
          [_flag]:2
        })
        _this.selectComponent("#redpack").show()
      },
      fail(res){
        console.log(res)
      }
    })
  },
})