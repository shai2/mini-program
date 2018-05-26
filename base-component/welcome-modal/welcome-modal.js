var app = getApp()
Component({
  attached(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权，直接调用 getUserInfo 获取头像昵称")
          this.setData({
            isHide:true
          })
          wx.getUserInfo({
            lang:"zh_CN",
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log("需要授权")
          this.setData({
            isHide:false
          })
        }
      }
    })
  },
  properties: {

  },
  data: {
    isHide:true,
    pic:""
  },
  methods: {
    getUserInfo(e){
      console.log(e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo //数据传给globalData
      this.setData({
        isHide:true
      })
    }
  },
})