let api = require("../../../../utils/api")
let pageNow = 1;
Page({
  data: {
    companyObj:[],
    pullText:'加载中 . .',
    repeatFlag:false,
  },
  onLoad(options) {
    pageNow = 1;
    wx.showLoading({title:"加载中"})
    this.whoFocus(pageNow,true) //查询
  },
  onPullDownRefresh (){
    pageNow = 1;
    this.whoFocus(pageNow,true)
  },
  onReachBottom(){
    this.whoFocus(pageNow)
  },
  whoFocus(page,refresh){
    let _this = this
    if(_this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.whoFocus,
      method:"POST",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {page:pageNow},
      success(res){
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (refresh) {
          _this.setData({
            companyObj:res.data.data.list,
            repeatFlag:false
          })
          if (res.data.data.list.length===0) {
            _this.setData({
              pullText:"尚未被公司查看"
            })
            return
          };
        }else{
          _this.setData({
            companyObj:_this.data.companyObj.concat(res.data.data.list),
            repeatFlag:false
          })
        }
        // console.log(_this.data.companyObj)
        pageNow++
        if(res.data.data.list.length <10){ //没数据了
          _this.setData({
            pullText:"到底了"
          })
          return
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
})