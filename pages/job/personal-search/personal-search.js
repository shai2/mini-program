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
    if (this.data.tipArrHistory.indexOf(this.data.searchText)<0) {
      if (this.data.tipArrHistory.length===3) {
        this.data.tipArrHistory.splice(-1,1)
      };
      this.data.tipArrHistory.unshift(this.data.searchText)
      // console.log(_tipArrHistory)
      wx.setStorageSync('tipArrHistory',this.data.tipArrHistory)
    };
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
