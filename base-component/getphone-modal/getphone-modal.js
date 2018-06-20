let api = require("../../utils/api")
Component({
  attached(){

  },
  properties: {

  },
  data: {
    modalShow:false,
    isRegister:true,
    phone:0,
    code:0,
    codeTxt:'发送验证码'
  },
  methods: {
    getPhoneNumber(e){  //绑定手机请求
      let _this = this
      wx.request({
        url: api.bindMobile,
        method:"POST",
        header:{
          "sessionId":wx.getStorageSync('sessionId')
        },
        data:e.detail,
        success(res){
          if(res.data.code===0){
            console.log("绑定手机成功")
            wx.setStorageSync('hasPhone',true)
            _this.triggerEvent('getPhoneSuccess') //抛出事件
            _this.hide()
          }else{
            console.log(res.data.msg)
          }
        },
        fail(res){
          console.log(res)
        }
      })
    },
    changePhone(e){
      this.setData({
        phone:e.detail.value
      })
    },
    changeCode(e){
      this.setData({
        code:e.detail.value
      })
    },
    sendCode(){
      if(this.data.codeTxt.indexOf('s')>0) return //防止重复点击
      console.log('发送验证码')
      const _regExp = /^1\d{10}$/
      if(!_regExp.test(this.data.phone)){ //验证手机号
        wx.showToast({
          title: '清输入正确的手机号',
          icon: 'none',
          duration: 1000
        })
        return
      }
      if(timer) clearInterval(timer) //防止重复计算
      let _time = 120 //初始值
      this.setData({
        codeTxt:_time+'s'
      })
      let timer = setInterval(()=>{ //倒计时
        _time--
        if(_time===0){
          this.setData({
            codeTxt:'重新发送'
          })
          clearInterval(timer)
        }else{
          this.setData({
            codeTxt:_time+'s'
          })
        }
      },1000)
      // 发送验证码
      this.sendVerifyCode()
    },
    sendVerifyCode(){
      let _this = this
      wx.request({ //热门职位
        url: api.sendVerifyCode,
        method:"GET",
        data: {
          'mobile':_this.data.phone
        },
        success(res){
          console.log(res)
        },
        fail(res){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      })
    },
    openRegist(){
      this.setData({
        'isRegister':true
      })
    },
    closeRegist(){
      this.setData({
        'isRegister':false
      })
    },
    show(){
      this.setData({
        modalShow:true
      })
    },
    hide(){
      this.setData({
        modalShow:false
      })
    }
  }
})