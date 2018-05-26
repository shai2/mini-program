var app = getApp()
Page({
  data: {
    userInfo:{},
    sexOption:['男','女'],
  },
  onReady: function () {
    // 先请求后台接口 如果没数据的话 读取微信的赋值给userInfo--------最后传userInfo
    let _userInfo = JSON.parse(JSON.stringify(app.globalData.userInfo)) //深拷贝微信的userInfo
    // 转化微信的性别
    if(_userInfo.gender === 1){
      _userInfo.gender = '男'
    }else if(_userInfo.gender === 2){
      _userInfo.gender = '女'
    }
    this.setData({
      userInfo:_userInfo
    })
  },
  nameChange(){

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
    this.setData({
      [_province]:e.detail.value[0],
      [_city]:e.detail.value[0],
      [_area]:e.detail.value[0]
    })
  },
})