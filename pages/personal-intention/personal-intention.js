Page({
  data: {
    city:'上海',
    tipArr:['产品','设计师','产品','程序员','产品','销售专员',],
    canNext:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  next(){
    if(this.data.canNext){
      wx.redirectTo({
        url: '/pages/personal-index/personal-index'
      })
    }
  },
  changeActiveTip(e){
    this.setData({
      "activeTip":e.currentTarget.dataset.index,
      "canNext":true
    })
  },
  hasContent(e){
    console.log(e.detail)
    if (e.detail.value.trim().length>0) {
      this.setData({"canNext":true})
    }else{
      this.setData({"canNext":false})
    }

  }
})