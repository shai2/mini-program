let QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
let api = require("../../../utils/api")
let info = getApp().globalData
let qqmapsdk;
let pageNow = 1;
Page({
  data: {
    jobDetail:{},
    companyDetail:{},
    addressObj: {}, //中文地址查询返回集合
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
      title: '您的好友 ' + this.data.userName + ' 向您推荐了优质岗位“' + this.data.jobDetail.position + '”，点击查看',
      path: '/pages/event/inviting/good-work-apply/good-work-apply?jid='+this.data.jid+"&userId="+wx.getStorageSync('userId')+"&position="+this.data.position
    }
  },
  onLoad(options) {
    console.log(options.jid)
    this.getUserInfo() //查询分享者信息
    this.login()
    qqmapsdk = new QQMapWX({
      key: 'MPABZ-64LLO-4IWWC-SEKKE-B7SK5-3XBXA'
    });
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
        _this.data.userName = res.data.data.realName
      },
      fail(res){
        console.log(res)
      }
    })
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
          this.data.clickResume=true;
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
        _this.getAddress()
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
        var rewardNum=parseFloat(res.data.data.rewardAmountText)
        _this.setData({
          jobDetail:res.data.data,
          "jobDetail.rewardAmountText": rewardNum
        })
        if(_this.data.jobDetail.address.length<=200){
           _this.setData({
            flag:false,            
          })
        }
       
        if(rewardNum>=1000){
          rewardNum=(rewardNum/1000).toFixed(2)+"K";
          _this.setData({
            "jobDetail.rewardAmountText":rewardNum,            
          })
        }else{
          rewardNum="￥"+rewardNum;
          _this.setData({
            "jobDetail.rewardAmountText":rewardNum,            
          })
        }
        console.log(_this.data.jobDetail,"job")
        console.log(parseFloat(_this.data.jobDetail.rewardAmountText),"job")
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
  getAddress(){
    let _this = this
    qqmapsdk.geocoder({
      address: this.data.companyDetail.prov+this.data.companyDetail.city+this.data.companyDetail.adress,
      success: function(res) {
        _this.setData({
          addressObj:res.result,
        })
        console.log(res.result)
      },
      fail: function(res) {
        console.log(res.result);
      },
      complete: function(res) {

      }
    })
  },
  // 登录流程 没有账号快捷注册
  login(){
    let _this = this
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: api.login,
            method:"POST",
            data: {
              code: res.code
            },
            success(res){
              console.log(res)
              wx.setStorageSync('sessionId', res.data.data.token)
              wx.setStorageSync('userId', res.data.data.userInfo.userId)
              info.userInfo = res.data.data.userInfo //同步到全局
              if (res.data.data.jobIntentionFlag===0) { //已经有意向了
                console.log("有意向（有手机）")
                wx.setStorageSync('hasPhone',true)
                return
              };
              if (res.data.data.userInfo.phone&&res.data.data.jobIntentionFlag!==0) { // 有手机号没意向 只出来intention
                console.log("已绑定手机 无意向")
                wx.setStorageSync('hasPhone',true)
                return
              }
              if(!res.data.data.userInfo.phone){
                console.log("需要绑定手机权限授权")
                wx.setStorageSync('hasPhone',false)
                _this.selectComponent('#getPhone').show()
              }
            },
            fail(res){
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail:res => (
        console.log(res)
      )
    })
  },
  toCompanyDetail(e){
    wx.navigateTo({
      url:"/pages/job/personal-companydetail/personal-companydetail?cid=" + e.currentTarget.dataset.cid
    })
  },
  toAddress(){
    let _this = this
    wx.openLocation({
      latitude: _this.data.addressObj.location.lat*1,
      longitude: _this.data.addressObj.location.lng*1,
      name:_this.data.companyDetail.name,
      address:_this.data.companyDetail.adress,
      scale: 18
    })
  }
})