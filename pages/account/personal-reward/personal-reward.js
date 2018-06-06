// pages/account/personal-reward/personal-reward.js
const api=require("../../../utils/api.js")
Page({
  data: {
    allFlag:"act",
    invationFlag:"",
    recommendFlag:"",
    putFlag:"",
    moneyDetail:{},
    userFlowingWater:{},
    pageNum:2
  },
  onLoad: function (options) {
    var _this=this;
    wx.request({
      url:api.getUserMsg,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data:{

      },
      success(res){
        console.log(res)
        if(res.data.msg=="success"){
          _this.setData({
            moneyDetail:res.data.data
          })
        }
      },
      fail(error){
        console.log(error)
      }
    })
  },
  requestData(type,page,pageSize){
    var _this=this;
    wx.request({
      url:api.userFlowingWater,
      method:"GET",
      header:{
        sessionId: wx.getStorageSync('sessionId')
      },
      data:{
        type:type,
        page:page,
        pageSize:pageSize
      },
      success(res){
        console.log(res)
        if(res.data.msg=="success"){
          _this.setData({
            userFlowingWater:res.data.data
          })
        }
        console.log(_this.data.userFlowingWater)
      },
      fail(error){
        console.log(error)
      }
    })
  },
  all(){
    this.setData({
      allFlag:"act",
      invationFlag:"",
      recommendFlag:"",
      putFlag:"",
    })
    this.requestData(0,this.data.pageNum,10)
  },
  invation(){
    this.setData({
      allFlag:"",
      invationFlag:"act",
      recommendFlag:"",
      putFlag:"",
    })
  },
  recommend(){
    this.setData({
      allFlag:"",
      invationFlag:"",
      recommendFlag:"act",
      putFlag:"",
    })
  },
  put(){
    this.setData({
      allFlag:"",
      invationFlag:"",
      recommendFlag:"",
      putFlag:"act",
    })
  }
})