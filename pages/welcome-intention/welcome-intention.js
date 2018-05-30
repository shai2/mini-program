let api = require("../../utils/api")
let info = getApp().globalData
Page({
  data: {
    city:'上海',
    tipArr:[],
    canTap:false,
    searchText:''
  },
  onLoad(options) {

  },
  onReady() {
    let _this = this
    wx.request({ //热门职位
      url: api.getHotJobAndCompany,
      method:"GET",
      data: {},
      success(res){
        _this.setData({
          tipArr:res.data.hotJobList
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  next(){
    if(this.data.canTap){
      wx.setStorageSync('hopePosition',this.data.searchText)
        wx.request({
        url: api.updateJobIntention,
        method:"POST",
        header:{
          sessionId: wx.getStorageSync('sessionId')
        },
        data: {
          jobIntention:{
            "city": this.data.city,
            "jobTraidId": this.data.searchText,
          }
        },
        success(res){
          console.log("保存求职意向")
        },
        fail(res){
          console.log(res)
        }
      })
      wx.switchTab({
        url: '/pages/job/personal-jobindex/personal-jobindex'
      })
    }
  },
  changeActiveTip(e){
    this.setData({
      "activeTip":e.currentTarget.dataset.index,
      "canTap":true,
      "searchText":e.currentTarget.dataset.text
    })
  },
  hasContent(e){
    this.setData({
      "searchText":e.detail.value,
      "activeTip":-1,
    })
    if (e.detail.value.trim().length>0) {
      this.setData({"canTap":true})
    }else{
      this.setData({"canTap":false})
    }
  },
  search(){

  }
})
