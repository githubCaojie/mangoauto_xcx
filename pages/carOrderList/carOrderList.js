// pages/carOrderList/carOrderList.js
const app = getApp();
Page({
  data: {
    usermobile: "",
    carOrderListArray: [],
    queryOrderMobile:"",
  },
  onLoad: function (options) {
    var that = this;
    var usermobile = wx.getStorageSync('userInfo').CellPhone;
    console.log(usermobile)
    that.setData({
      usermobile: usermobile
    })
  },
  goToOrderDetail: function (e) {
    var orderid = e.currentTarget.dataset.orderid;
    wx.setStorageSync('carOrderId', orderid);
    wx.navigateTo({
      url: '../carOrderDetails/carOrderDetails'
    })
  },
  queryOrderMobileInput: function (e) {
    var that = this;
    that.setData({
      queryOrderMobile: e.detail.value,
    })
  },
  queryOrderHandle: function (e) {
    var that = this;
    var userMobile = that.data.queryOrderMobile;
    if (userMobile == ""){
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
      })
    } 
    if (userMobile != ""){
      var pattern = "^0?(13[0-9]|15[0-9]|18[0-9]|17[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$";
      let check = new RegExp(pattern);
      if (!check.test(userMobile)) {
        wx.showToast({
          title: '请输入正确的手机号码',
          icon: 'none',
          success(){
            that.setData({
              queryOrderMobile: "",
            })
          }
        })
      }else {
        wx.request({
          url: 'https://api.mangoauto.com.cn/Wx/GetOrderInfoByMobile.ashx',
          data: {
            mobile: that.data.queryOrderMobile
          },
          method: 'POST',
          dataType: 'JSON',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          success(res) {
            wx.setStorageSync('carOrderMobile', that.data.queryOrderMobile);
            that.setData({
              carOrderListArray: JSON.parse(res.data)
            })
          }
        })
      }
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    wx.request({
      url: 'https://api.mangoauto.com.cn/Wx/GetOrderInfoByMobile.ashx',
      data: {
        mobile: that.data.usermobile
      },
      method: 'POST',
      dataType: 'JSON',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        var Array = JSON.parse(res.data)
        if (Array.data.length != 0){
          that.setData({
            carOrderListArray: Array
          })
        }
        if (Array.data.length == 0){
          var carOrderMobile = wx.getStorageSync('carOrderMobile');
          wx.request({
            url: 'https://api.mangoauto.com.cn/Wx/GetOrderInfoByMobile.ashx',
            data: {
              mobile: carOrderMobile
            },
            method: 'POST',
            dataType: 'JSON',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success(res) {
              that.setData({
                carOrderListArray: JSON.parse(res.data)
              })
            }
          })
        }
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})