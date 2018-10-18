const fetch = require('../../utils/fetch.js')

Page({
  data: {
    slides: [],
    categories: []
  },
  onLoad: function (options) {
    fetch('slides').then(res => {
      this.setData({
        slides: res.data
      })
    })
    fetch('categories').then(res => {
      this.setData({
        categories: res.data
      })
    })
  },
  onReady: function () {
    //Do some when page ready.

  },
  onShow: function () {
    //Do some when page show.

  },
  onHide: function () {
    //Do some when page hide.

  },
  onUnload: function () {
    //Do some when page unload.

  },
  onPullDownRefresh: function () {
    //Do some when page pull down.

  }
})