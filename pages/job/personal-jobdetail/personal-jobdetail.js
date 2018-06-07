let api = require("../../../utils/api")
let pageNow = 1;
Page({
  data: {
    jobDetail:{},
    companyDetail:{},
    jobObj:[], //热门相关
    jid:'',
    position:'',
    pullText:'加载中 . .',
    overflow:"dec",
    flag:true,
    repeatFlag:false,
    collectionFlag:false,
    coImg:"/img/collect.png",
    ResumeFlag:false,
    ResumeText:"应聘职位",
    boxName:"",
    hidden:true,
    collectFlag:true,
    clickResume:true
  },
   onShareAppMessage: function (res) {
    return {
      title: '蜗牛职信',
      path: '/pages/event/inviting/good-work-apply/good-work-apply?jid='+this.data.jid+"userId="+wx.getStorageSync('userId')
    }
  },
  onLoad(options) {
    pageNow = 1;
    this.setData({
      jid:options.jid,
      position:options.pos
    })
    this.seeCollection() //判断是否收藏
    this.getSendResumeStatus() //判断是否投递简历
    wx.showLoading({title:"加载中"})
    this.queryJobDetail()//职位详情
    this.getHotJobList(pageNow) //请求相关
  },
  dec(){
    this.setData({
      overflow:"",
      flag:false
    })
  },
  onPullDownRefresh (){
    this.queryJobDetail()
  },
  onReachBottom(){
    this.getHotJobList(pageNow)
  },
  seeCollection(){
    var _this=this;
    wx.request({
      url: api.jobSaveFlag,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        jobId:_this.data.jid
      },
      success(res){
        if(res.data.data)
        {
          _this.setData({
            coImg:"/img/collected.png"
          })
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getSendResumeStatus(){
    // 是否投递简历
    var _this=this;
    wx.request({
      url: api.getSendResumeStatus,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        jid:_this.data.jid
      },
      success(res){
          if(res.data.data)
          {
            _this.setData({
              ResumeFlag:true,
              ResumeText:"已经投递"
            })
          }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  collection(){
    if(this.data.collectFlag)
    {
      this.setData({
            collectFlag: false
          })
    var _this = this;
    var imgUrl=this.data.coImg=="/img/collect.png"?api.jobSave : api.jobSaveNo;
    wx.request({
      url: imgUrl,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        jobId:_this.data.jobDetail.jid
      },
      success(res){
        _this.setData({
          collectionFlag:res.data.msg,
          collectFlag: true
        })
        var coFlag=""
        if(imgUrl==api.jobSave)
        {
          if(_this.data.collectionFlag=="success")
          {
            coFlag="收藏成功！"
            _this.setData({
              coImg:"/img/collected.png"
            })
          }else{
            coFlag="收藏失败！"
          }
          wx.showToast({
            title: coFlag,
            icon: 'success',
            duration: 1000
          })
        }else{
          if(_this.data.collectionFlag=="success")
          {
            coFlag="取消成功！"
            _this.setData({
              coImg:"/img/collect.png"
            })
          }else{
            coFlag="取消失败！"
          }
          wx.showToast({
            title: coFlag,
            icon: 'success',
            duration: 1000
          })
        }
      },
      fail(res){
        console.log(res)
        _this.setData({
            collectFlag: true
          })
      }
    })
   }
  },
  sendResume(){
    if(!this.data.ResumeFlag&&this.data.clickResume){
      this.data.clickResume=false;
      var _this=this;
      wx.request({
        url: api.sendResume,
        method:"POST",
        header:{
          sessionId: wx.getStorageSync('sessionId'),
          'content-type': 'application/json'
        },
        data: {
          cid:_this.data.jobDetail.cid,
          jid:_this.data.jobDetail.jid,
          jobPosition:_this.data.jobDetail.positionid,
          userId:_this.data.jobDetail.user_id
        },
        success(res){
            if(res.data.msg=="投递成功")
            {
              _this.setData({
                ResumeFlag:true,
                ResumeText:"已经投递"
              })
            }
            wx.showToast({
              title: '投递成功',
              icon: 'success',
              duration: 1000
            })
        },
        fail(res){
          console.log(res)
        }
      })
    }
  },
  getHotJobList(page,refresh){
    let _this = this
    if(this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.getHotJobList,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        position:_this.data.position,
        page:page
      },
      success(res){
        _this.setData({
          jobObj:_this.data.jobObj.concat(res.data.data.data),
          repeatFlag:false
        })
        pageNow++
        if(res.data.data.data.length <10){ //没数据了
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
  queryCompanyDetail(){
    let _this = this
    wx.request({
      url: api.queryCompanyDetail,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        cid:_this.data.jobDetail.cid
      },
      success(res){
        _this.setData({
          companyDetail:res.data.data
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  queryJobDetail(){
    let _this = this
    wx.request({
      url: api.queryJobDetail,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        jid:_this.data.jid
      },
      success(res){
        wx.stopPullDownRefresh()
        wx.hideLoading()
        _this.setData({
          jobDetail:res.data.data
        })
        console.log(_this.data.jobDetail)
        if(_this.data.jobDetail.isPrizes==1){
          _this.setData({
            hidden:false,
            boxName:"name-sp"
          })
        }
        _this.queryCompanyDetail()
      },
      fail(res){
        console.log(res)
      }
    })
  },
  toCompanyDetail(e){
    wx.navigateTo({
      url:"/pages/job/personal-companydetail/personal-companydetail?cid=" + e.currentTarget.dataset.cid
    })
  }
})