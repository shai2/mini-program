let api = require("../../../utils/api")
let info = getApp().globalData
Page({
  data: {
    userInfo:{},
    name:'',
    avatar:'',
    resumePercent:0,
    countJobStatus:[0,0,0],
    canTap:false
  },
  onLoad(){
    if (this.chekPhone()) {
      this.getSalaryList()
      this.getScaleList()
      this.getJobStateList()
      this.getIndustryList()
      this.getWorkStartList()
      this.countJobStatus()
      this.getCvDegree()
      this.getUserInfo()
    };
  },
  onShow(options) {
    if (this.chekPhone()) {
      this.countJobStatus()
      this.getCvDegree()
      this.getUserInfo()
    };
    this.setData({
      name:info.userInfo.nickName,
      avatar:info.userInfo.avatarPhoto
    })
  },
  chekPhone(){
    if (!wx.getStorageSync('hasPhone')) {
      console.log('未登陆手机号')
      this.setData({
        canTap:false
      })
      return false
    }else{
      console.log('已登陆手机号')
      this.setData({
        canTap:true
      })
      return true
    }
  },
  getCvDegree(){
    let _this = this
    wx.request({
      url: api.getCvDegree,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        _this.setData({
          resumePercent:res.data.data
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  countJobStatus(){
    let _this = this
    wx.request({
      url: api.countJobStatus,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        _this.setData({
          countJobStatus:res.data.data
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getSalaryList(){  //存薪资
    if (wx.getStorageSync('salaryList')) return
    let _this = this
    wx.request({
      url: api.getSalaryList,
      method:"GET",
      success(res){
        let _arr = []
        res.data.data.salaryList.map((e,i)=>{
          _arr.push(e.value)
        })
        wx.setStorageSync('salaryList',_arr)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getScaleList(){ //存规模
    if (wx.getStorageSync('companyScale')) return
    let _this = this
    wx.request({
      url: api.getScaleList,
      method:"GET",
      success(res){
        let _arr = []
        res.data.data.scaleList.map((e,i)=>{
          _arr.push(e.value)
        })
        wx.setStorageSync('companyScale',_arr)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getJobStateList(){ //存状态
    if (wx.getStorageSync('jobState')) return
    let _this = this
    wx.request({
      url: api.getJobStateList,
      method:"GET",
      success(res){
        let _arr = []
        res.data.data.targetcurrList.map((e,i)=>{
          _arr.push(e.value)
        })
        wx.setStorageSync('jobState',_arr)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getWorkStartList(){ //存到岗时间
    if (wx.getStorageSync('workStart')) return
    let _this = this
    wx.request({
      url: api.getWorkStartList,
      method:"GET",
      success(res){
        let _arr = []
        res.data.data.workStartList.map((e,i)=>{
          _arr.push(e.value)
        })
        wx.setStorageSync('workStart',_arr)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getIndustryList(){ //存行业
    if (wx.getStorageSync('industryListLevel1')) return
    let _this = this
    wx.request({
      url: api.getIndustryList,
      method:"GET",
      success(res){
        let _arrLevel1 = []
        let _arrLevel2 = []
        res.data.data.industryList.map((e,i)=>{
          _arrLevel1.push(e.value)
          let _arr = []
          e.son.map((m,n)=>{
            _arr.push(m.value)
          })
          _arrLevel2.push(_arr)
        })
        wx.setStorageSync('industryListLevel1',_arrLevel1)
        wx.setStorageSync('industryListLevel2',_arrLevel2)
        console.log(_arrLevel1,_arrLevel2)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getPositionList(){ //存职位 先不做 之后改成2联
    if (wx.getStorageSync('positionListLevel1')) return
    let _this = this
    wx.request({
      url: api.getPositionList,
      method:"GET",
      success(res){
        let _arrLevel1 = []
        let _arrLevel2 = []
        let _arrLevel3 = []
        res.data.data.positionList.map((e,i)=>{
          _arrLevel1.push(e.value)
          let _arr = []
          e.son.map((m,n)=>{
            _arr.push(m.value)
          })
        })
        wx.setStorageSync('positionListLevel1',_arrLevel1)
        wx.setStorageSync('positionListLevel2',_arrLevel2)
        console.log(_arrLevel1,_arrLevel2)
      },
      fail(res){
        console.log(res)
      }
    })
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
        if (res.data.data.scoreVO.totalScore==-1) {
          res.data.data.scoreVO.totalScore = 0
        };
        _this.setData({
          userInfo:res.data.data
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },
  toJobIndex(){
    wx.switchTab({
      url:"/pages/job/personal-jobindex/personal-jobindex"
    })
  },
  toResume(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume/personal-resume"
    })
  },
  toDeliver(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-hasdeliver/personal-hasdeliver"
    })
  },
  toCommunicate(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-hascommunicate/personal-hascommunicate"
    })
  },
  toInterview(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-waitinterview/personal-waitinterview"
    })
  },
  toWhoFocus(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-whofocus/personal-whofocus"
    })
  },
  toMore(){
    wx.navigateTo({
      url:"/pages/mine/service/personal-service/personal-service"
    })
  },
  toJobSave(){
    wx.navigateTo({
      url:"/pages/mine/job/personal-jobsave/personal-jobsave"
    })
  },
  toIntention(){
    wx.navigateTo({
      url:"/pages/mine/resume/personal-resume-intention/personal-resume-intention"
    })
  },
  toInvitingReward(){
    wx.navigateTo({
      url:"/pages/event/inviting/inviting-friend/inviting-friend"
    })
  }
})