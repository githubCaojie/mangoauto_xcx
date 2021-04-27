// pages/oldAndNew/oldAndNew.js
var config = require("../../utils/config.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
    userInfo: {},
    userPhone: '',
    oldUserId: '',
    isOldUser: false,
    newUserList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },
  loadData:function(){
    var that = this;
    app.getOpenId(function (openid) {
      if(openid){
        config.httpPost(app.getUrl(app.globalData.CheckMemberOldInfo),{
          openId: openid
        },function(isOld){
          if(isOld.data){
            config.httpGet(app.getUrl('UserCenter/GetUser'), {
              openId: openid
            }, function (res) {
              var data = res.data,
               phone = data.CellPhone,
               UserId = data.UserId
              that.setData({
                openId: openid,
                userInfo: data,
                userPhone: phone,
                oldUserId: UserId
              })
            })
            config.httpGet(app.getUrl(app.globalData.getMemberOldNewInfo),{
              openId: openid
            },function(newList){
              that.setData({
                newUserList: newList.data
              })
            })

          }
        })
      }
    })
  },
  bindUserTap: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
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
    var that = this,
      path;
    return {
      title: '我是芒果车主,我为芒果汽车代言',
      path: `/pages/oldAndNew/getNewUser?olduserid=${that.data.oldUserId}&oldopenid=${that.data.openId}`
    }
  }
})