let api = require("../../utils/api")
let info = getApp().globalData
Component({
  attached(){

  },
  properties: {

  },
  data: {
    modalShow:true,
  },
  methods: {
    getPhoneNumber(e){  //绑定手机请求
      let _this = this
      wx.request({
        url: api.bindMobile,
        method:"POST",
        header:{
          "sessionId":wx.getStorageSync('sessionId')
        },
        data:e.detail,
        success(res){
          if(res.data.code===0){
            console.log("绑定手机成功")
            wx.setStorageSync('hasPhone',true)
            _this.setData({
              modalShow:false
            })
          }else{
            console.log(res.data.msg)
          }
        },
        fail(res){
          console.log(res)
        }
      })
    },
  }
})