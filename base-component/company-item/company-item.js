let app = getApp()
Component({
  attached(){
    if (!this.data.companyItem.viewCompanyLogo) { //没头像给默认头像
      let _logo = 'companyItem.viewCompanyLogo'
      this.setData({
        [_logo]:"/img/default-c.png"
      })
    };
  },
  properties: {
    hasBottom:{
      type:Boolean,
      value:true
    },
    companyItem:{
      type:Object,
      value:{}
    }
  },
  data: {

  },
  methods: {
    toDetail(){
      wx.navigateTo({
        url:"/pages/job/personal-companydetail/personal-companydetail?cid=" + this.data.companyItem.viewCid
      })
    }
  },
})