let app = getApp()
let api = require("../../../../utils/api")
let baseData = require('../../../../utils/base-data')
Page({
  data: {
    userInfo:{},
    sexOption:baseData.sexOption,
  },
  onReady() {
    this.getUserInfo()
  },
  getUserInfo(){
    let _this = this
    wx.request({
      url: api.getUserInfo,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        console.log(res.data.data)
        if (!res.data.data.birthday) {
          res.data.data.birthday = ""
        };
        _this.setData({
          userInfo:res.data.data
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  chooseAvatar(){
    var _this = this
    wx.chooseImage({
      success: function(res) {
        wx.uploadFile({
          url: api.avatarUpload, //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData:{
          },
          success: function(res){
            let _avatar = 'userInfo.avatarPhoto'
            _this.setData({
              [_avatar]:JSON.parse(res.data).url
            })
          }
        })
      }
    })
  },
  nameChange(){
    let _nickName = 'userInfo.nickName'
    this.setData({
      [_gender]:e.detail.value
    })
  },
  sexChange(e){
    let _gender = 'userInfo.gender'
    this.setData({
      [_gender]:this.data.sexOption[e.detail.value]
    })
  },
  birthdayChange(e){
    let _birthday = 'userInfo.birthday'
    this.setData({
      [_birthday]:e.detail.value
    })
  },
  regionChange(e){
    let _province = 'userInfo.province'  //省
    let _city = 'userInfo.city'  //市
    let _area = 'userInfo.area'  //区
    console.log(e.detail)
    this.setData({
      [_province]:e.detail.value[0],
      [_city]:e.detail.value[1],
      [_area]:e.detail.value[2]
    })
    console.log(this.data.userInfo)
  },
  saveBaseInfo(){
    let _this = this
    wx.request({
      url: api.updateUserInfo,
      method:"POST",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: _this.data.userInfo,
      success(res){
        app.globalData.userInfo = _this.data.userInfo
        console.log(app.globalData.userInfo)
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