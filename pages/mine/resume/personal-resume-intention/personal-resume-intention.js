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
    industryListLevel1:[],
    industryListLevel2:[],
  },
  onReady: function () {
    this.getIntention()
    this.getBaseDate()
    this.setIndustryArr()
  },
  setIndustryArr(){
    let _arr = []
    _arr.push(this.data.industryListLevel1)
    _arr.push(this.data.industryListLevel2[0])
    this.setData({
      industryArr:_arr
    })
    console.log(this.data.industryArr)
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
    console.log(wx.getStorageSync('workStart'))
    this.setData({
      companyScaleOption:wx.getStorageSync('companyScale'),
      salaryOption:wx.getStorageSync('salaryList'),
      jobStateOption:wx.getStorageSync('jobState'),
      workStartOption:wx.getStorageSync('workStart'),
      industryListLevel1:wx.getStorageSync('industryListLevel1'),
      industryListLevel2:wx.getStorageSync('industryListLevel2'),
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
    wx.request({
      url: api.getIntention,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data: {},
      success(res){
        _this.setData({
          jobIntension:res.data.data
        })
        let _jobTradeId = 'jobIntension.jobTradeId'
        _this.setData({
          [_jobTradeId]:"java"
        })
      },
      fail(res){
        console.log(res)
      }
    })
  }
})