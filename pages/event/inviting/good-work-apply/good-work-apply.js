let api = require("../../../../utils/api.js")
let info=getApp().globalData;
Page({
  data: {
    detail:{},
    position:"",
    jid:'',
    imgFlag:false
  },
  onLoad: function (options) {
    console.log(options)
    this.data.position=options.position;
    this.data.jid=options.jid;
    this.data.userId=options.userId
    this.shareJobDetail()
  },
  imgError(){
    this.setData({
      imgFlag:true
    })
  },
  shareJobDetail(){
    var _this=this;
    wx.request({
      url: api.shareJobDetail,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        userId:this.data.userId,
        jid:this.data.jid
      },
      success(res){
        console.log(res.data.data,"bbbbb")
        if(res.data.msg=="success")
        {
          console.log(res.data.data)
          _this.setData({
            detail:res.data.data
          })
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  // 登录流程 没有账号跳到主页
  login(){
    if (this.data.stateFlag) {
      wx.switchTab({
        url:"/pages/job/personal-jobindex/personal-jobindex"
      })
    }else{
      let _this = this
      wx.login({
        success: res => {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: api.login,
              method:"POST",
              data: {
                code: res.code,
                inviteCode:_this.data.inviteCode
              },
              success(res){
                console.log(res)
                wx.setStorageSync('sessionId', res.data.data.token)
                wx.setStorageSync('userId', res.data.data.userInfo.userId)
                info.userInfo = res.data.data.userInfo //同步到全局
                if (res.data.data.jobIntentionFlag===0) { //已经有意向了
                  console.log("有意向（有手机）")
                  wx.setStorageSync('hasPhone',true)
                  _this.clickJob()
                  return
                }
                if (res.data.data.userInfo.phone&&res.data.data.jobIntentionFlag!==0) { // 有手机号没意向 只出来intention
                  console.log("已绑定手机 无意向")
                  wx.setStorageSync('hasPhone',true);
                  _this.clickJob()
                  return
                }
                if(!res.data.data.userInfo.phone){
                  console.log("需要绑定手机权限授权")
                  wx.setStorageSync('hasPhone',false)
                  wx.switchTab({
                    url:"/pages/job/personal-jobindex/personal-jobindex?inviteCode=" + _this.data.jid
                  })
                }
              },
              fail(res){
                console.log(res)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail:res => (
          console.log(res)
        )
      })
    }
  },
  apply(){
    this.login()
  },
  clickJob(){
    wx.navigateTo({
      url:"/pages/job/personal-jobdetail/personal-jobdetail?jid="+this.data.jid+"&pos="+this.data.position
    })
  }
})