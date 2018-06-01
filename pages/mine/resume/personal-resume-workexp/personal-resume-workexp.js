let app = getApp()
let api = require("../../../../utils/api")
Page({
  data: {
    userInfo:{},
    index:''
  },
  onLoad(options) {
    var _this = this
    this.getResume(()=>{
      _this.setData({
        index:options.index
      })
      if (_this.data.index==-1) {
        _this.setData({
          index:_this.data.userInfo.workExperiences.length*1
        })
      }else{
        _this.setData({
          index:options.index
        })
      }
      console.log('options.index是'+options.index+'要修改的index是'+_this.data.index)
      console.log(_this.data.index,this.data.userInfo.workExperiences.length)
    })
  },
  nameChange(e){
    let _name = 'userInfo.workExperiences['+this.data.index+'].company'
    this.setData({
      [_name]:e.detail.value
    })
  },
  positionChange(e){
    let _pos = 'userInfo.workExperiences['+this.data.index+'].position'
    this.setData({
      [_pos]:e.detail.value
    })
  },
  workStartChange(e){
    let _workStart = 'userInfo.workExperiences['+this.data.index+'].workStart'
    this.setData({
      [_workStart]:e.detail.value
    })
  },
  workEndChange(e){
    let _workEnd = 'userInfo.workExperiences['+this.data.index+'].workEnd'
    this.setData({
      [_workEnd]:e.detail.value
    })
  },
  textChange(e){
    let _workDesc = 'userInfo.workExperiences['+this.data.index+'].workDesc'
    this.setData({
      [_workDesc]:e.detail.value
    })
  },
  getResume(fn){
    let _this = this
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
        if(fn) fn()
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
        setTimeout(()=>{
          wx.navigateBack({delta:1})
        },1000)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  deleteItem(){
    this.data.userInfo.workExperiences.splice(this.data.index,1)
    this.saveResume()
  }
})