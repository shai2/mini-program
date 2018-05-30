let api = require("../../utils/api")
let info = getApp().globalData
Component({
  attached(){
    this.login()
  },
  properties: {

  },
  data: {
    isHide:true,
  },
  methods: {
    login(){
      let _this = this
      wx.login({
        success: res => {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: api.login,
              method:"POST",
              data: {
                code: res.code
              },
              success(res){
                wx.setStorageSync('sessionId', res.data.data.token)
                info.userInfo = res.data.data.userInfo
                if (res.data.data.userInfo.phone) { // 登录成功后检查手机 有不弹窗 没弹窗点击后获取手机号注册
                  console.log("已绑定手机")
                  _this.setData({  // 关闭弹窗
                    isHide:true
                  })
                }else{
                  console.log("需要绑定手机权限授权")
                  _this.setData({
                    isHide:false
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
    },
    getPhoneNumber(e){  //绑定手机请求
      // console.log("弹窗前"+wx.getStorageSync('sessionId'))
      let _this = this
      wx.request({
        url: api.bindMobile,
        method:"POST",
        header:{
          "sessionId":wx.getStorageSync('sessionId')
        },
        data:e.detail,
        success(res){
          console.log("绑定手机成功")
          info.userInfo = res.data.data //绑定成功后获取默认头像与名字
          _this.setData({
            isHide:true
          })
        },
        fail(res){
          console.log(res)
        }
      })
    },
  }
})