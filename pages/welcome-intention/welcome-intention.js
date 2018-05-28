Page({
  data: {
    city:'上海',
    tipArr:['产品','设计师','产品','程序员','产品','销售专员',],
    canTap:false,
  },
  onLoad: function (options) {
    wx.login({
      success: res => {
        if (res.code) {
          console.info(res)
          //发起网络请求
          wx.request({
            url: 'http://zfddue.natappfree.cc/wx/v1/login',
            method:"POST",
            data: {
              code: res.code
            },
            success:function(res){
              console.info(res);
              wx.setStorageSync('token', res.data.data.token)
            },
            fail:function(res){
              console.info(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onReady: function () {

  },
  next(){
    if(this.data.canTap){
      console.log(111)
      wx.switchTab({
        url: '/pages/mine/personal-mine/personal-mine'
      })
    }
  },
  changeActiveTip(e){
    this.setData({
      "activeTip":e.currentTarget.dataset.index,
      "canTap":true
    })
  },
  hasContent(e){
    if (e.detail.value.trim().length>0) {
      this.setData({"canTap":true})
    }else{
      this.setData({"canTap":false})
    }

  }
})
