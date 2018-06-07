let api = require("../../../utils/api")
let pageNow = 1;
Page({
  data: {
    jobDetail:{},
    companyDetail:{},
    jobObj:[], //热门相关
    pullText:'加载中 . .',
    overflow:"dec",
    flag:true,
    repeatFlag:false,
  },
  onLoad(options) {
    pageNow = 1;
    this.setData({
      cid:options.cid
    })
    wx.showLoading({title:"加载中"})
    this.queryCompanyDetail()//公司详情
    this.getCompanyJobList(pageNow) //请求相关
  },
  dec(){
    this.setData({
      overflow:"",
      flag:false,
      overflow:"dec",
      overFlag:false
    })
  },
  show(){
    this.setData({
      overflow:"",
      overFlag:true
    })
  },
  onPullDownRefresh (){
    this.queryCompanyDetail()
  },
  onReachBottom(){
    this.getCompanyJobList(pageNow)
  },
  getCompanyJobList(page,refresh){
    let _this = this
    if(this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.getCompanyJobList,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        cid:_this.data.cid,
        page:page
      },
      success(res){
        if (res.data.code===0) {
          _this.setData({
            jobObj:_this.data.jobObj.concat(res.data.data.data),
            repeatFlag:false
          })
          console.log(_this.data.jobObj)
          pageNow++
          if(res.data.data.data.length <10){ //没数据了
            _this.setData({
              pullText:"到底了"
            })
            return
          }
        }else{
          console.log(res.data.msg)
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  queryCompanyDetail(){
    let _this = this
    wx.request({
      url: api.queryCompanyDetail,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        cid:_this.data.cid
      },
      success(res){
        wx.stopPullDownRefresh()
        wx.hideLoading()
        if (!res.data.data.image) { //没头像给默认头像
          res.data.data.image = "/img/default-c.png"
        };
        _this.setData({
          companyDetail:res.data.data
        })
        console.log(_this.data.companyDetail)
      },
      fail(res){
        console.log(res)
      }
    })
  },
})