let api = require("../../../utils/api")
let info = getApp().globalData
let pageNow = 1;
Page({
  data: {
    city:'上海',
    tipArr:[],
    canTap:false,
    searchText:'',
    jobObj:[], //搜索相关
    pullText:'加载中 . .',
    repeatFlag:false,
    hasIntension:true,
    canScroll:false,
    rewardFlag:''
  },
  onLoad(options) {
    this.login()
    this.getHot()
    this.getRewardStatus()
    pageNow = 1;
    wx.showLoading({title:"加载中"})
    this.getJobListByType(pageNow,4,true)
  },
  onPullDownRefresh (){
    pageNow = 1;
    this.getJobListByType(pageNow,4,true)
  },
  onReachBottom(){
    this.getJobListByType(pageNow,4)
  },
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
                _this.setData({
                  hasIntension:true,
                  canScroll:true
                })
                return
              };
              if (res.data.data.userInfo.phone&&res.data.data.jobIntentionFlag!==0) { // 有手机号没意向 只出来intention
                console.log("已绑定手机 无意向")
                wx.setStorageSync('hasPhone',true)
                _this.setData({  // 无弹窗
                  hasIntension:false,
                  canScroll:false
                })
                return
              }
              if(!res.data.data.userInfo.phone){
                console.log("需要绑定手机权限授权")
                wx.setStorageSync('hasPhone',false)
                _this.setData({
                  hasIntension:false,
                  canScroll:false
                })
                console.log(_this.selectComponent('#getPhone'))
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
  getRewardStatus(){
    let _this = this
    wx.request({
      url: api.getRewardStatus,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        _this.setData({
          rewardFlag:res.data.data.rewardFlag
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  regionChange(e){
    this.setData({
      city:e.detail.value[0]
    })
  },
  getJobListByType(page,type,refresh){
    let _this = this
    if(this.data.repeatFlag) return
    _this.setData({
      repeatFlag:true
    })
    wx.request({
      url: api.getJobListByType,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {
        type:type,
        // keyword: wx.getStorageSync('hopePosition'),
        page:page
      },
      success(res){
        if (refresh) {
          _this.setData({
            jobObj:res.data.data.data,
            repeatFlag:false
          })
        }else{
          _this.setData({
            jobObj:_this.data.jobObj.concat(res.data.data.data),
            repeatFlag:false
          })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
        // console.log(_this.data.jobObj)
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
  getHot(){
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
    var _this = this
    if(this.data.canTap){
      // wx.setStorageSync('hopePosition',this.data.searchText)
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
          _this.setData({
            hasIntension:true,
            canScroll:true
          })
        },
        fail(res){
          console.log(res)
        }
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
  toAll(){  //全部
    wx.navigateTo({
      url: "/pages/job/job-all/job-all"
    })
  },
  toNew(){  //全新
    wx.navigateTo({
      url: "/pages/job/job-new/job-new"
    })
  },
  toHot(){  //热门
    wx.navigateTo({
      url: "/pages/job/job-hot/job-hot"
    })
  },
  toTop(){  //高薪
    wx.navigateTo({
      url: "/pages/job/job-top/job-top"
    })
  },
  toResume(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume/personal-resume"
    })
  },
  toInvitingReward(){
    wx.navigateTo({
      url:"/pages/event/inviting/inviting-friend/inviting-friend"
    })
  }
})