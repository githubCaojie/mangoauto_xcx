// pages/RemindingPrice/RemindingPrice.js
var util = require('../../utils/util.js'); 
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataCarCode: '',
    dataCarName: '',
    carSerieCode: '',
    carSerieName:'',
    cartypeCode: '',
    cartypeName: '',
    priceVal: '1000',
    userMobile: '',
    price:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var usermobile = wx.getStorageSync('userInfo').CellPhone;
    console.log(usermobile)
    that.setData({
      userMobile: usermobile
    })
  },
  /**
   * 点击事件
   */
  showPopup(){
    this.selectcartype.showPopup()
  },
  numChange(event){
    this.setData({
      dataCarCode: event.detail.carbrandId,
      dataCarName: event.detail.carbrandName,
      carSerieCode: event.detail.carSerieId,
      carSerieName: event.detail.carSerieName,
      cartypeCode: event.detail.carTypeId,
      cartypeName: event.detail.carTypeName,
      price: event.detail.price
    })
    console.log(this.data)
    console.log(event.detail)
  },
  mobileInput: function (e) {
    var that = this;
    var usermobile = e.detail.value;
    that.setData({
      userMobile: usermobile
    })
  },
  slider4change: function (e) {
    //获取滑动后的值
    this.setData({
      priceVal: e.detail.value
    });
  },
  okSubmit: function (e){
    var that = this;
    if (that.data.dataCarCode == '' || that.data.carSerieCode == '' || that.data.cartypeCode == ''){
      return wx.showModal({
        title: '提示',
        content: '请选择您要提醒的车型',
        showCancel: false,
      });
    }
    if (that.data.userMobile == ''){
      return wx.showModal({
        title: '提示',
        content: '请输入您的联系方式',
        showCancel: false,
      });
    } 
    if (that.data.userMobile != '') {
      let check = new RegExp("^0?(13[0-9]|15[0-9]|18[0-9]|17[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$");
      if (!check.test(that.data.userMobile)){
        return wx.showModal({
          title: '提示',
          content: '请输入正确的联系方式',
          showCancel: false,
          success: function () {
            that.setData({
              userMobile: ''
            })
          }
        });
      }
    }
    var getUserInfo = getApp().globalData.users;
    var getData = [];
    var props = "1:" + that.data.dataCarCode + ";2:" + that.data.carSerieCode + ";3:" + that.data.cartypeCode;
    wx.request({
      url: 'https://api.mangoauto.com.cn/Wx/GetPriceInfo.ashx?props=' + props,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        getData.price = res.data.data[0].price;
        getData.product_price = res.data.data[0].product_price;
      }
    })
    getData.carCode = that.data.dataCarCode + ';' + that.data.carSerieCode + ';' + that.data.cartypeCode;
    getData.carType = that.data.dataCarName + ' ' + that.data.carSerieName + ' ' + that.data.cartypeName;
    getData.channel = 0;
    getData.encryptedData = getUserInfo.encryptedData;
    getData.guess_yn = 0;
    getData.is_guess = 0;
    getData.iv = getUserInfo.iv;
    getData.openid = getUserInfo.openId;
    getData.phone = that.data.userMobile;
    getData.price_val = that.data.priceVal;
    getData.session_key = getUserInfo.session_key;
    getData.sex = 0;
    getData.username = getUserInfo.nikeName;
    console.log(getData)
    // wx.request({
    //   url: 'https://api.mangoauto.com.cn/Wx/SavePriceReminder.ashx',
    //   data: getData,
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     wx.showToast({
    //       title: '提交成功',
    //       icon: 'success',
    //       duration: 2000
    //     });
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得popup组件
    this.selectcartype = this.selectComponent("#selectcartype");
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