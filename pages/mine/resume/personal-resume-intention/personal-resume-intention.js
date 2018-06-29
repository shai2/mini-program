let api = require("../../../../utils/api")
Page({
  data: {
    jobIntension:{},
    companyScaleOption:[],
    salaryOption:[],
    jobStateOption:[],
    workStartOption:[],
    industryArr:[],
    industryValue:[0,0],
    positionArr:[],
    positionValue:[0,0],
    positionSelectShow:false
  },
  onReady: function () {
    this.getIntention()
    this.getBaseDate()
    this.setIndustryArr() //初始化行业
    this.setPositionArr() //初始化职位
  },
  setIndustryArr(){
    let _arr = []
    _arr.push(this.data.industryListLevel1)
    _arr.push(this.data.industryListLevel2[0])
    this.setData({
      industryArr:_arr
    })
    // console.log(this.data.industryArr)
  },
  setPositionArr(){
    let _arr = []
    _arr.push(this.data.positionListLevel1)
    _arr.push(this.data.positionListLevel2[0])
    this.setData({
      positionArr:_arr
    })
    console.log(this.data.positionArr)
  },
  workPlaceChange(e){
    let _prov = 'jobIntension.prov'  //省
    let _city = 'jobIntension.city'  //市
    let _area = 'jobIntension.area'  //区
    this.setData({
      [_prov]:e.detail.value[0],
      [_city]:e.detail.value[1],
      [_area]:e.detail.value[2]
    })
  },
  companyScaleChange(e){
    let _scale = 'jobIntension.companyScale' //公司规模
    this.setData({
      [_scale]:this.data.companyScaleOption[e.detail.value],
    })
  },
  salaryChange(e){
    let _salary = 'jobIntension.expSalary' //薪资
    this.setData({
      [_salary]:this.data.salaryOption[e.detail.value],
    })
  },
  jobStateChange(e){
    let _status = 'jobIntension.curentStatus' //求职状态
    this.setData({
      [_status]:this.data.jobStateOption[e.detail.value],
    })
  },
  workStartChange(e){
    console.log(e.detail.value)
    let _onBoardDate = 'jobIntension.onBoardDate' //公司规模
    this.setData({
      [_onBoardDate]:this.data.workStartOption[e.detail.value],
    })
  },
  industryChange(e){ //选择时触发联动
    if (e.detail.column === 0) {
      this.data.industryArr.splice(1,1,this.data.industryListLevel2[e.detail.value])
      this.data.industryValue[0] = e.detail.value
      this.setData({
        industryArr:this.data.industryArr,
        industryValue:this.data.industryValue
      })
    };
  },
  industrySelect(){ //确定时触发
    let _industry = 'jobIntension.industry'
    let _industryShow = this.data.industryArr[0][this.data.industryValue[0]]+"-"+this.data.industryArr[1][this.data.industryValue[1]]
    this.setData({
      [_industry]:_industryShow
    })
  },
  getBaseDate(){
    // console.log(wx.getStorageSync('positionListLevel2'))
    this.setData({
      companyScaleOption:wx.getStorageSync('companyScale'),
      salaryOption:wx.getStorageSync('salaryList'),
      jobStateOption:wx.getStorageSync('jobState'),
      workStartOption:wx.getStorageSync('workStart'),
      industryListLevel1:wx.getStorageSync('industryListLevel1'),
      industryListLevel2:wx.getStorageSync('industryListLevel2'),
      positionListLevel1:wx.getStorageSync('positionListLevel1'),
      positionListLevel2:wx.getStorageSync('positionListLevel2'),
    })
  },
  openSelect(){
    this.setData({
      positionSelectShow:true
    })
  },
  hideSelect(){
    this.setData({
      positionSelectShow:false
    })
  },
  setPositionLevel2(e){
    let _index = e.currentTarget.dataset.position
    this.data.positionArr.splice(1,1,this.data.positionListLevel2[_index])
    this.setData({
      positionArr:this.data.positionArr
    })
    this.setData({
      positionValue:[_index,0]
    })
  },
  getPositionLevel2(e){
    console.log(e.currentTarget.dataset.job)
    let _job = 'jobIntension.jobTradeId'
    this.setData({
      [_job]:e.currentTarget.dataset.job
    })
    this.setData({
      positionSelectShow:false
    })
  },
  save(){
    var _this = this
    wx.request({
      url: api.intentionUpdate,
      method:"POST",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data:JSON.stringify(this.data.jobIntension),
      success(res){
        if (res.data.code === 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(()=>{
            wx.navigateBack({delta:1})
          },1000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail(res){
        console.log(res)
      }
    })
  },
  getIntention(){
    var _this = this
     
  }
})