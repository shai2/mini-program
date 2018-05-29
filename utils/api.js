const baseUrl = "http://wxapitest.wnzx.com/credit"
module.exports = {
  login : baseUrl + "/wx/v1/login", //登录
  getAreaList : baseUrl + "/app/dict/getAreaList", //地区字典
  bindMobile : baseUrl + "/wx/v1/bindMobile",  //手机绑定
  authorize : baseUrl + "/wx/v1/authorize",  //用户授权
  getJobListByType : baseUrl + "/app/job/getJobListByType" //查询职位
}