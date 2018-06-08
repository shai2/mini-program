Page({
  data: {
    inviteCode:0,
    stateFlag:false
  },
  onLoad: function (options) {
    this.setData({
      inviteCode:options.inviteCode
    })
  },
  registe(){
    this.login()
  },
  getFlag(){
    this.setData({
      stateFlag:true
    })
  },
  // 登录流程 没有账号快捷注册
  login(){
    if (this.data.stateFlag) {
      wx.switchTap({
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
                  wx.switchTap({
                    url:"/pages/job/personal-jobindex/personal-jobindex"
                  })
                  return
                };
                if (res.data.data.userInfo.phone&&res.data.data.jobIntentionFlag!==0) { // 有手机号没意向 只出来intention
                  console.log("已绑定手机 无意向")
                  wx.setStorageSync('hasPhone',true)
                  wx.switchTap({
                    url:"/pages/job/personal-jobindex/personal-jobindex"
                  })
                  return
                }
                if(!res.data.data.userInfo.phone){
                  console.log("需要绑定手机权限授权")
                  wx.setStorageSync('hasPhone',false)
                  _this.selectComponent('#getPhone').show()
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
})