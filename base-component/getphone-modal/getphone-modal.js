let api = require("../../utils/api")
Component({
  attached(){
    this.checkPhoneNumber()
  },
  properties: {

  },
  data: {
    isHide:true,
  },
  methods: {
    checkPhoneNumber(){ // 页面出现时获取用户手机 有本地手机号存储不弹窗 没权限弹窗点击后发送数据
      if (wx.getStorageSync("phone")) {
        console.log("已绑定手机")
        this.setData({  // 关闭弹窗
          isHide:true
        })
      }else{
        console.log("需要绑定手机权限授权")
        this.setData({
          isHide:false
        })
      }
    },
    getPhoneNumber(e){  //绑定手机请求
      console.log("弹窗前"+wx.getStorageSync('sessionId'))
      var _this = this
      wx.request({
        url: api.bindMobile,
        method:"POST",
        header:{
          "sessionId":wx.getStorageSync('sessionId')
        },
        data:e.detail,
        success(res){
          console.log("绑定手机成功")
          wx.setStorageSync('phone', res.data.data.phone)
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