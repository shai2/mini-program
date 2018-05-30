let api = require("../../utils/api")
let info = getApp().globalData
Page({
  data: {
    city:'上海',
    tipArr:["热门职位","热门职位","热门职位"],
    canTap:false,
    searchText:''
  },
  onLoad(options) {

  },
  onReady() {
    let _this = this
    wx.request({
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
      "activeTip":-1,
    })
    if (e.detail.value.trim().length>0) {
      this.setData({"canTap":true})
    }else{
      this.setData({"canTap":false})
    }
  },
  regionChange(e){
    this.setData({
      city:e.detail.value[2],
    })
  },
})
