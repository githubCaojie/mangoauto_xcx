// pages/getmobile/getmobile.js
var config = require("../../utils/config.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    app_id: app.globalData.appId,
    app_secret: app.globalData.secret,
    open_id: '',
    session_key: '',
    encrypte_data:'',
    iv: '',
    login_code: '',
    u_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    that.wxlogin();
    wx.checkSession({
      success(){
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail(){
        // session_key 已经失效，需要重新执行登录流程
        that.wxlogin()  //重新登录
      }
    })
  },
  wxlogin:function(){
    var that = this;
    wx.login({
      success(res){
        that.setData({
          login_code:res.code
        })
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid: that.data.app_id,
            secret: that.data.app_secret,
            js_code: that.data.login_code,
          },
          method: 'GET',
          success(obj){
            that.setData({
              open_id: obj.data.openid,
              session_key: obj.data.session_key,
              u_id: obj.data.unionid
            })
            console.log(that.data)
          }
        })
      }
    })
  },
  getPhoneNumber: function (e) {
    var that = this;
    that.setData({
      encrypte_data: e.detail.encryptedData,
      iv:e.detail.iv
    })
    wx.request({
      url: app.getUrl('Login/GetWxMobile'),
      data: {
        encryptedData: that.data.encrypte_data,
        session_key: that.data.session_key,
        iv: that.data.iv
      },
      success(res){
        console.log(res)
      }
    })
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

  }
})