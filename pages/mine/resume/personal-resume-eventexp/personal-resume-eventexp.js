let app = getApp()
let api = require("../../../../utils/api")
Page({
  data: {
    userInfo:{},
    index:'',
    deleteShow:true,
    repeatFlag:false
  },
  onLoad(options) {
    var _this = this
    this.getResume(()=>{
      _this.setData({
        index:options.index
      })
      if (_this.data.index==-1) {
        _this.setData({
          index:_this.data.userInfo.projectExperiences.length*1,
          deleteShow:false
        })
      }else{
        _this.setData({
          index:options.index
        })
      }
      // console.log('options.index是'+options.index+'要修改的index是'+_this.data.index)
      // console.log(_this.data.index,this.data.userInfo.projectExperiences.length)
    })
  },
  nameChange(e){
    let _name = 'userInfo.projectExperiences['+this.data.index+'].company'
    this.setData({
      [_name]:e.detail.value
    })
  },
  projectNameChange(e){
    let _posName = 'userInfo.projectExperiences['+this.data.index+'].projectName'
    this.setData({
      [_posName]:e.detail.value
    })
  },
  projectPosChange(e){
    let _pos = 'userInfo.projectExperiences['+this.data.index+'].position'
    this.setData({
      [_pos]:e.detail.value
    })
  },
  projectStartChange(e){
    let _workStart = 'userInfo.projectExperiences['+this.data.index+'].projectStart'
    this.setData({
      [_workStart]:e.detail.value
    })
  },
  projectEndChange(e){
    let _workEnd = 'userInfo.projectExperiences['+this.data.index+'].projectEnd'
    this.setData({
      [_workEnd]:e.detail.value
    })
  },
  responsChange(e){
    let _workDesc = 'userInfo.projectExperiences['+this.data.index+'].responsibility'
    this.setData({
      [_workDesc]:e.detail.value
    })
  },
  proDescChange(e){
    let _proDesc = 'userInfo.projectExperiences['+this.data.index+'].projectDesc'
    this.setData({
      [_proDesc]:e.detail.value
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
        console.log(res.data)
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
    if (this.data.repeatFlag) return
    wx.showLoading({title:"提交中"})
    let _this = this
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.resumeUpdate,
      method:"POST",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: _this.data.userInfo,
      success(res){
        wx.hideLoading()
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
    this.data.userInfo.projectExperiences.splice(this.data.index,1)
    this.saveResume()
  }
})