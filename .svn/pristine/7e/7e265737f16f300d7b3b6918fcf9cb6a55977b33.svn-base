// pages/financialTool/result.js
Page({

  /**
   * 页面的初始数据
   */data: {
      messarr: [
        {
          color: '#464af8',
          num: '0',
          flownum: '0',
          name:'首付'
        },
        {
          color: '#ff6262',
          num: '0',
          flownum: '0',
          name: '贷款额度'
        },
        {
          color: '#f7c11b',
          num: '0',
          flownum: '0',
          name: '贷款成本'
        },
        {
          color: '#ff8015',
          num: '0',
          flownum: '0',
          name: '必要花费'
        },
        {
          color: '#17d0bc',
          num: '0',
          flownum: '0',
          name: '商业险'
        }
    ],
    bottomArray:[
      {
        type:'首次花费',
        price:0
      },
      {
        type: '月供',
        price: 0
      },
      {
        type: '期数',
        price:0
      }
    ],
    total:0,
    carName:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      data = JSON.parse(options.id);
    that.setData({
      carName: [data.brand_name, data.cars_name, data.car_model_name],
      'messarr[0].num': that.escapeThousands(data.first_payment),
      'messarr[1].num': that.escapeThousands(data.loan_limit),
      'messarr[2].num': that.escapeThousands(data.loan_cost),
      'messarr[3].num': that.escapeThousands(data.must_cost),
      'messarr[4].num': that.escapeThousands(data.business),
      'messarr[0].flownum': data.first_payment.toString(),
      'messarr[1].flownum': data.loan_limit.toString(),
      'messarr[2].flownum': data.loan_cost.toString(),
      'messarr[3].flownum': data.must_cost.toString(),
      'messarr[4].flownum': data.business.toString(),
      'bottomArray[0].price': data.schf+'万',
      'bottomArray[1].price': data.yuegong,
      'bottomArray[2].price': data.datenum,
      total:((data.first_payment + data.loan_limit + data.must_cost + data.business) / 10000).toFixed(2),
    })
  },
  escapeThousands(int){
    let num = (int || 0).toString(), result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return result;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    // 初始化
    const ctx = wx.createCanvasContext('Canvas');
    // 设置圆点 x  y   中心点
    let number = {
      x: 52,
      y: 52
    };
    // 获取数据 各类项的个数
    let term = this.data.messarr;
    let termarr = [];
    for (let t = 0; t < term.length; t++) {
      // flownum
      let thisterm = Number(term[t].flownum)
      let thiscolor = term[t].color
      termarr.push({
        data: thisterm,
        color: thiscolor
      })
    }
    // 设置总数
    let sign = 0;
    for (var s = 0; s < termarr.length; s++) {
      sign += termarr[s].data
    }
    //设置半径 
    let radius = 50;
    for (var i = 0; i < termarr.length; i++) {
      var start = 0;
      // 开始绘制
      ctx.beginPath()
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += termarr[j].data / sign * 2 * Math.PI
        }
      }
      var end = start + termarr[i].data / sign * 2 * Math.PI
      ctx.arc(number.x, number.y, radius, start, end);
      ctx.setLineWidth(1);
      ctx.lineTo(number.x, number.y);
      ctx.setStrokeStyle('#ffffff');
      ctx.setFillStyle(termarr[i].color);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }
    ctx.draw()
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