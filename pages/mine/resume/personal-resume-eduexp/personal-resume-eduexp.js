let app = getApp()
let api = require("../../../../utils/api")
Page({
  data: {
    userInfo:{},
    index:'',
    deleteShow:true
  },
  onLoad(options) {
    var _this = this
    this.getResume(()=>{
      _this.setData({
        index:options.index
      })
      if (_this.data.index==-1) {
        _this.setData({
          index:_this.data.userInfo.educationExperiences.length*1,
          deleteShow:true
        })
      }else{
        _this.setData({
          index:options.index
        })
      }
      console.log('options.index是'+options.index+'要修改的index是'+_this.data.index)
      // console.log(_this.data.index,this.data.userInfo.educationExperiences.length)
    })
  },
  nameChange(e){
    let _name = 'userInfo.educationExperiences['+this.data.index+'].school'
    this.setData({
      [_name]:e.detail.value
    })
  },
  majorChange(e){
    let _pos = 'userInfo.educationExperiences['+this.data.index+'].major'
    this.setData({
      [_pos]:e.detail.value
    })
  },
  educationStartChange(e){
    let _workStart = 'userInfo.educationExperiences['+this.data.index+'].educationStart'
    this.setData({
      [_workStart]:e.detail.value
    })
  },
  educationEndChange(e){
    let _workEnd = 'userInfo.educationExperiences['+this.data.index+'].educationEnd'
    this.setData({
      [_workEnd]:e.detail.value
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
        if(typeof(fn)==="function") fn()
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
    this.data.userInfo.educationExperiences.splice(this.data.index,1)
    this.saveResume()
  }
})