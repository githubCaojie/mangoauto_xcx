// pages/carOrderList/carOrderList.js
const app = getApp();
Page({
  data: {
    OrderId: 0,
    orderDetails: [],
    carColor: [],
  },
  onLoad: function (options) {
    var carOrderId = wx.getStorageSync('carOrderId');
    var that = this;
    that.setData({
      OrderId: carOrderId
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    var OrderId = that.data.OrderId
    var orderUrl = 'https://api.mangoauto.com.cn/Wx/GetOrderDetailInfo.ashx?orderId=' + OrderId
    wx.request({
      url: orderUrl,
      method: 'POST',
      dataType: 'JSON',
      success(res) {
        that.setData({
          orderDetails: JSON.parse(res.data)
        })
        var propsName = JSON.parse(res.data).data[0].propsName.split(";");
        that.setData({
          carColor: propsName
        })
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