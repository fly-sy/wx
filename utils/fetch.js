const baseURL = getApp()
module.exports = (url, data, methods = 'GET', header = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL.config.apiBase + url,
      methods,
      data,
      header,
      dataType: 'json',
      success: resolve,
      fail: reject
    })
  })
}

