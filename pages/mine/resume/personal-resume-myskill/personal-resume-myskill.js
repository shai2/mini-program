let info = getApp().globalData
let api = require("../../../../utils/api")
Page({
  data: {
    killName:"aa",
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getResume()
  },
  input(e){
    console.log(e)
    this.setData({
      killName:e.detail.value
    })
    console.log(this.data.killName)
  },
  addKill(){
    console.log( this.data.userInfo.skill.languages)
    this.data.userInfo.skill.languages.push({
      languageName:this.data.killName,
      qualification:"",
      primaryId:""
    })
    this.saveResume(()=>{
      this.getResume()
    });
  },
  delKill(e){
    
    this.data.userInfo.skill.languages.splice(
      e.currentTarget.dataset.index,1);
    console.log(this.data.userInfo.skill.languages)
    this.saveResume(()=>{
      this.getResume()
    });
  },
  getResume() {
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
  saveResume(fn){
    let _this = this
    wx.request({
      url: api.resumeUpdate,
      method:"POST",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: _this.data.userInfo,
      success(res){
        console.log(res)
        if(res.data.msg=="更新成功"){
          if(typeof(fn)==="function") fn()
          wx.showToast({
            title: "保存成功",
            icon: 'success',
            duration: 1000
          })
        }
        
      },
      fail(res){
        console.log(res)
      }
    })
  }
})