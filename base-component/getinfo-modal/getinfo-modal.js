let api = require("../../utils/api")
let app = getApp()
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
    checkUserInfo(){ // 页面出现没权限弹窗点击后赋值然后上传基本信息 有权限的话 在登录后就获取基本信息了
      wx.getSetting({
        success: res => {
          if (app.globalData.userInfo.wechatUnionId) return
          if (res.authSetting['scope.userInfo']) {
            console.log("已授权过基本信息")
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
          app.globalData.userInfo = res.data.data
        },
        fail(res){
          console.info(res)
        }
      })
    }
  },
})