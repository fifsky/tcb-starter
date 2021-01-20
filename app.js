const Waline = require('@waline/cloudbase');
const request = require('request-promise-native');
const { htmlToText } = require('html-to-text');

module.exports = Waline({
  async postSave(comment) {
    const {DINGDINGBOT} = process.env;
    if(DINGDINGBOT){
      const text = htmlToText(comment.comment, {
        wordwrap: false
      });
      await request({
        uri: DINGDINGBOT,
        method: 'POST',
        body: {
          "msgtype": "markdown",
          "markdown": {
            "title":"你有新的评论",
            "text": `${comment.nick}(${comment.mail})评论了你的文章 \n>${text} \n\n [点击查看](https://blog.fifsky.com${comment.url})`,
          }
        },
        json: true
      });
    }
  }
});