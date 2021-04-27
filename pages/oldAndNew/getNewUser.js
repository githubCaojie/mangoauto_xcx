// pages/oldAndNew/getNewUser.js
var config = require("../../utils/config.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldUserId: '',
    oldUserOpenId: '',
    newUserOpenId: '',
    isMe: false,
    isBindingType: true,
    isBinding: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      oldUserId: options.olduserid,
      oldUserOpenId: options.openid
    })
    that.onloadIng()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onloadIng: function() {
    var that = this;
    app.getOpenId(function (openid) {
      if (openid) {
        that.setData({
          newUserOpenId: openid
        })
        if (that.data.newUserOpenId == that.data.oldUserOpenId) {
          that.setData({
            isMe: true,
            isBindingType: false,
            isBinding: false
          })
        } else {
          wx.request({
            url: `${app.getUrl(app.globalData.GetMemberOldNewInfoByNewMemberId)}?openId=${openid}`,
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log(res)
              if (res.data.data != 'null' && res.data.data != 'undefined') {
                that.setData({
                  isMe: false,
                  isBindingType: true,
                  isBinding: false
                })
              } else {
                that.setData({
                  isMe: false,
                  isBindingType: false,
                  isBinding: true
                })
              }
            }
          })
        }
      }
    })
  },
  // 绑定
  bindingTop: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认绑定',
      success(res) {
        if (res.confirm) {
          app.getOpenId(function (openid) {
            if (openid) {
              wx.request({
                url: `${app.getUrl(app.globalData.SaveMemberOldNewInfo)}?openId=${openid}&oldMemberId=${that.data.oldUserId}`,
                header: {},
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: function (res) {
                  if(res.data.success){
                    wx.showToast({
                      title: '绑定成功',
                      icon: 'none',
                      duration: 3000
                    })
                  }else{
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 3000
                    })
                  }
                }
              })
            }
          })
        }
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