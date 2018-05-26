var app = getApp()
Component({
  attached(){

  },
  properties: {
    url:{ //跳转的url
      type:String,
      value:''
    },
    icon:{  //左边的icon地址
      type:String,
      value:'default'
    },
    title:{ //左边的标题
      type:String,
      value:'default'
    },
    hasTopBorder:{ //上边线条 第一个需要加false
      type:Boolean,
      value:true
    },
    showLeftIcon:{ //左边的icon
      type:Boolean,
      value:true
    },
    showRightIcon:{ //是否显示右边的icon 默认箭头
      type:Boolean,
      value:"true"
    },
    rightIcon:{  //右边的icon地址
      type:String,
      value:'/img/arrow-right.png'
    },
  },
  data: {

  },
  methods: {
    gotoUrl(){
      if(this.data.url.length>0){  //有链接才跳转
        wx.navigateTo({
          url: this.data.url
        })
      }
    }
  },
})