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

  }
})