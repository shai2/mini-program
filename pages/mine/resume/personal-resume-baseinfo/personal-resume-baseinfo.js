let app = getApp()
let api = require("../../../../utils/api")
Page({
  data: {
    userInfo:{},
    sexOption:['男','女'],
    repeatFlag:false
  },
  onReady() {
    this.getResume()
    this.setExpArr()
  },
  chooseAvatar(){
    var _this = this
    wx.chooseImage({
      success: function(res) {
        wx.uploadFile({
          url: api.avatarUpload,
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData:{
          },
          success: function(res){
            let _avatar = 'userInfo.basicInfo.avatar'
            _this.setData({
              [_avatar]:JSON.parse(res.data).url
            })
          }
        })
      }
    })
  },
  setExpArr(){
    this.setData({
      expOption:wx.getStorageSync('expList'),
    })
  },
  expChange(e){
    var _exp = 'userInfo.basicInfo.workLife'
    this.setData({
      [_exp]:this.data.expOption[e.detail.value]
    })
  },
  nameChange(e){
    var _name = 'userInfo.basicInfo.name'
    this.setData({
      [_name]:e.detail.value
    })
  },
  sexChange(e){
    let _gender = 'userInfo.basicInfo.gender'
    this.setData({
      [_gender]:this.data.sexOption[e.detail.value]
    })
  },
  expChange(e){
    var _name = 'userInfo.basicInfo.workLife'
    this.setData({
      [_name]:e.detail.value
    })
  },
  birthdayChange(e){
    let _birthday = 'userInfo.basicInfo.birthday'
    this.setData({
      [_birthday]:e.detail.value
    })
  },
  regionChange(e){
    this.setData({
      ['userInfo.basicInfo.province']:e.detail.value[0],
      ['userInfo.basicInfo.city']:e.detail.value[1],
      ['userInfo.basicInfo.area']:e.detail.value[2]
    })
  },
  mobileChange(e){
    let _mobile = 'userInfo.basicInfo.mobile'
    this.setData({
      [_mobile]:e.detail.value
    })
  },
  emailChange(e){
    let _email = 'userInfo.basicInfo.email'
    this.setData({
      [_email]:e.detail.value
    })
  },
  saveBaseInfo(){

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
        res.data.data.basicInfo.workLife += '年'
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
  }
})