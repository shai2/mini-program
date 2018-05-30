let api = require("../../../utils/api")
Page({
  data: {
    city:'上海',
    selectType:'',
    tipArrHistory:[],
    tipArrJob:[],
    tipArrCompany:[],
    canTap:false,
    searchText:'',
  },
  onShow(options) {
    this.getHotJobAndCompany()
    if (!wx.getStorageSync('tipArrHistory')) {
      wx.setStorageSync('tipArrHistory',[])
    }else{
      this.setData({
        tipArrHistory:wx.getStorageSync('tipArrHistory')
      })
    }
    console.log(wx.getStorageSync('tipArrHistory'))
  },
  changeActiveTip(e){
    this.setData({
      "activeTip":e.currentTarget.dataset.index
    })
  },
  cancel(){
    wx.navigateBack({delta: 1})
  },
  search(){
    let aaaa = this.data.tipArrHistory.concat(this.data.searchText)
    wx.setStorageSync('tipArrHistory',)
    wx.navigateTo({
      url: "/pages/job/job-searchlist/job-searchlist?keyword=" + this.data.searchText
    })
  },
  getHotJobAndCompany(){
    let _this = this
    wx.request({ //热门职位
      url: api.getHotJobAndCompany,
      method:"GET",
      data: {},
      success(res){
        _this.setData({
          tipArrJob:res.data.hotJobList,
          tipArrCompany:res.data.hotCompanyList
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  changeActiveTip(e){
    this.setData({
      "activeTip":e.currentTarget.dataset.index,
      "searchText":e.currentTarget.dataset.text,
      "selectType":e.currentTarget.dataset.type
    })
  },
  hasContent(e){
    this.setData({
      "searchText":e.detail.value,
      "activeTip":-1,
    })
  },
})
