let api = require("../../../../utils/api.js")
let info=getApp().globalData;
Page({
  data: {
    detail:{},
    position:"",
    jid:'',
    imgFlag:true
  },
  onLoad: function (options) {
    console.log(options)
    this.data.position=options.position;
    this.data.jid=options.jid;
    this.data.inviteCode=options.inviteCode
    wx.setStorageSync('inviteCode',options.inviteCode)
    wx.setStorageSync('inviteJid',options.jid)
    this.shareJobDetail()
    // console.log('inviteCode:',wx.getStorageSync('inviteCode'))
    // console.log('inviteJid:',wx.getStorageSync('inviteJid'))
    console.log('apply页面')
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
        inviteCode:_this.data.inviteCode,
        jid:_this.data.jid,
      },
      success(res){
        console.log(res,"bbbbb")
        if(res.data.msg=="success")
        {
          console.log(res.data.data)
          _this.setData({
            detail:res.data.data
          })
          if(_this.data.detail.avatar){
            _this.setData({
            imgFlag:false
          })
          }
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
                inviteCode:_this.data.inviteCode,
                jobId:_this.data.jid
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
                    url:"/pages/job/personal-jobindex/personal-jobindex"
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
    var _this = this
    wx.request({
      url: api.recommonedApply,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        jobId:_this.data.jid,
        inviteCode:_this.data.inviteCode
      },
      success(res){
        wx.navigateTo({
          url:"/pages/job/personal-jobdetail/personal-jobdetail?jid="+_this.data.jid+"&pos="+_this.data.position
        })
      },
      fail(res){
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
      }
    })
    
  }
})