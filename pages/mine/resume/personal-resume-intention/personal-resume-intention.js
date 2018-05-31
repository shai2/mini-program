Page({
  data: {

  },
  onReady: function () {

  },
  workPlaceChange(){
    let _workPlace = 'userInfo.workPlace'
    this.setData({
      [_workPlace]:e.detail.value
    })
  },
  save(){

  },
  getResume(){
    wx.request({
      url: api.getResume,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        _this.setData({
          userInfo:res.data.data
        })
        console.log(_this.data.userInfo)
      },
      fail(res){
        console.log(res)
      }
    })
  }
})