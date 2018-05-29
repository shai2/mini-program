let api = require("../../utils/api")
Page({
  data: {
    city:'上海',
    tipArr:['产品','设计师','产品','程序员','产品','销售专员',],
    canTap:false,
    searchText:''
  },
  onLoad(options) {
    this.login()
  },
  onReady() {

  },
  login(){
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
            },
            fail(res){
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  next(){
    if(this.data.canTap){
      wx.setStorageSync('hopePosition',this.data.searchText)
      wx.switchTab({
        url: '/pages/job/personal-jobindex/personal-jobindex'
      })
    }
  },
  changeActiveTip(e){
    this.setData({
      "activeTip":e.currentTarget.dataset.index,
      "canTap":true,
      "searchText":e.currentTarget.dataset.text
    })
  },
  hasContent(e){
    this.setData({
      "activeTip":-1,
    })
    if (e.detail.value.trim().length>0) {
      this.setData({"canTap":true})
    }else{
      this.setData({"canTap":false})
    }
  },
  regionChange(e){
    this.setData({
      city:e.detail.value[2],
    })
  },
})
