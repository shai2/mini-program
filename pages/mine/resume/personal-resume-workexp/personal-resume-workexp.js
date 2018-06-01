let app = getApp()
let api = require("../../../../utils/api")
Page({
  data: {
    userInfo:{},
    index:''
  },
  onLoad(options) {
    this.getResume()
    this.setData({
      index:options.index
    })
    console.log(this.data.index)
    if (this.data.index===-1) { //新增

    }else{  //修改

    }
  },
  nameChange(e){
    var _name = 'userInfo.workExperiences.company'
    this.setData({
      [_name]:e.detail.value
    })
  },
  positionChange(e){
    var _pos = 'userInfo.workExperiences.position'
    this.setData({
      [_pos]:e.detail.value
    })
  },
  workStartChange(e){
    let _workStart = 'userInfo.workExperiences.workStart'
    this.setData({
      [_workStart]:e.detail.value
    })
  },
  workEndChange(e){
    let _workEnd = 'userInfo.workExperiences.workEnd'
    this.setData({
      [_workEnd]:e.detail.value
    })
  },
  textChange(e){
    let _workDesc = 'userInfo.workExperiences.workDesc'
    this.setData({
      [_workDesc]:e.detail.value
    })
  },
  getResume(){
    var _this = this
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
  },
  saveResume(){
    let _this = this
    wx.request({
      url: api.resumeUpdate,
      method:"POST",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: _this.data.userInfo,
      success(res){
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
      },
      fail(res){
        console.log(res)
      }
    })
  }
})