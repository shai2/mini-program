let api = require("../../utils/api")
var app = getApp()
Component({
  attached(){
    this.checkUserInfo()
  },
  properties: {

  },
  data: {
    isHide:true,
  },
  methods: {
    checkUserInfo(){ // 页面出现时获取用户信息 有权限直接赋值给全局不弹窗 没权限弹窗点击后赋值
      let _this = this
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log("已授权过基本信息")
            // this.authorize() 可以从login拿到
            this.setData({  // 关闭弹窗
              isHide:true
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
    getUserInfo(e){ //允许后返回个人数据
      let _this = this
      console.log(e)
      this.setData({
        isHide:true
      })
      wx.request({
        url: api.authorize,
        method:"POST",
        header:{
          sessionId: wx.getStorageSync('sessionId')
        },
        data:e.detail,
        success(res){
          console.info(res)
          // app.globalData.userInfo = res.data.data
          let a = 'app.globalData.userInfo'
          _this.setData({  // 关闭弹窗
            [a]:res.data.data
          })
          console.log(app.globalData.userInfo)
        },
        fail(res){
          console.info(res)
        }
      })
    }
  },
})