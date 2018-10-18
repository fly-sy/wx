const fetch = require('../../utils/fetch.js')


// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorie: {},
    shops: [],
    _page: 0,
    _limit: 20,
    hasMore: true
  },
  loadMore() {

    let { _page, _limit } = this.data
    let params = {
      // 请求那一页的数据
      _page: ++_page,
      // 每次显示多少条数据 
      _limit
    }
    // 数据节流
    if (!this.data.hasMore) return;
    // 请求所有的商品信息  return 之后这个函数返回的是一个promise对象 
    return fetch(`categories/${this.data.categorie.id}/shops`, params)
      .then(res => {
        // 直接获取后台返回当前条件的总条数  
        const totalCount = parseInt(res.header['X-Total-Count'])
        // 判断是否超过了总的条数 如果超过为 false 没有超过为true 
        const hasMore = this.data._page * this.data._limit < totalCount
        // 把第一页和下一页的数据进行拼接 
        const shops = this.data.shops.concat(res.data)
        this.setData({
          shops,
          _page,
          hasMore
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 取决于请求的速度   
    fetch(`categories/${options.cat}`)
      .then(res => {
        // 先把请求的数据保存到data中  
        this.setData({
          categorie: res.data
        })
        wx.setNavigationBarTitle({
          title: this.data.categorie.name
        })
        this.loadMore()
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.categorie.name) {
      wx.setNavigationBarTitle({
        title: this.data.categorie.name
      })
    }
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
    this.setData({
      shops: [],
      _page: 0,
      hasMore: true
    })

    this.loadMore().then(() => wx.stopPullDownRefresh())

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('触发到底了')
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})