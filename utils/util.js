const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const shareFunction = (options,title,url,...args) => {
  var shareObj = {
    title: "转发的标题",
　　path: url,
　　imgUrl: img,
    success: function(res){
　　　console.log('分享成功')
　　},
　　fail:function(){
      console.log('分享失败')
　　}
  }
  if( options.from == 'button' ){
    let _data = options.target.dataset;
　　console.log( _data);
    shareObj.path = path+'?a=1&b=2'
　}
　return shareObj
}

module.exports = {
  formatTime,
  shareFunction
}
