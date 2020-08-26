(function() {
  const d = document
  const w = window
  const p = parseInt
  const dd = d.documentElement
  const db = d.body
  const dc = d.compatMode == 'CSS1Compat'
  const dx = dc ? dd : db
  const ec = encodeURIComponent

  w.CHAT = {
    msgObj: d.getElementById('message'),
    screenheight: w.innerHeight ? w.innerHeight : dx.clientHeight,
    username: null,
    userid: null,
    socket: null,
    // 让浏览器滚动条保持在最底部
    scrollToBottom: function() {
      w.scrollTo(0, this.msgObj.clientHeight)
    },
    // 退出，本例只是一个简单的刷新
    logout: function() {
      // this.socket.disconnect()
      location.reload()
    },
    submit: function() {
      console.log('啊啊啊', this)
      const content = d.getElementById('content').value
      if(content !== '') {
        const obj = {
          userid: this.userid,
          username: this.username,
          content: content,
        }
        this.socket.emit('message', obj)
        d.getElementById('content').value = ''
      }
      return false
    },
    genUid: function() {
      return `${new Date().getTime()}${Math.floor(Math.random()*899 + 100)}`
    },
    // 更新系统消息，本例中在用户加入，退出的时候调用
    updateSysMsg: function(obj, action) {
      // 当前在线用户列表
      const onlineUsers = obj.onlineUsers
      // 当前在线人数
      const onlineCount = obj.onlineCount
      // 新加入用户的信息
      const user = obj.user

      // 更新在线人数
      let userhtml = ''
      let separator = ''
      for(key in onlineUsers) {
        if(onlineUsers.hasOwnProperty(key)) {
          userhtml += separator + onlineUsers[key]
          separator = '、 '
        }
      }
      d.getElementById('onlinecount').innerHTML = `当前共用${onlineCount}人在线，在线列表：${userhtml}`

      // 添加系统消息
      const html = `
        <div class="msg-system">
          ${user.username}
          ${action === 'login' ? '加入了聊天室': '退出了聊天室'}
        </div>
      `
      let section = d.createElement('section')
      section.className = 'system J-mjrlinkWrap J-cutMsg'
      section.innerHTML = html
      this.msgObj.appendChild(section)
      this.scrollToBottom()
    },

    // 第一个界面用户提交用户名
    usernameSubmit: function() {
      const username = d.getElementById("username").value
			if(username !== "") {
				d.getElementById("username").value = ''
				d.getElementById("loginbox").style.display = 'none'
				d.getElementById("chatbox").style.display = 'block'
				this.init(username)
			}
			return false
    },
    init: function(username) {
      /**
       * 客户端根据时间和随机数生成uid，这样使得聊天室用户名称可以重复
       * 实际项目中，如果是需要用户登录，直接采用用户的uid来做标识即可
       */
      this.userid = this.genUid()
      this.username = username

      d.getElementById('showusername').innerHTML = this.username
      // this.msgObj.style.minHeight = (this.screenheight - db.clientHeight + this.msgObj.clientHeight) + "px"
      this.scrollToBottom()

      // 连接webscoket后端服务器
      this.socket = io.connect('http://localhost:8900')

      // 告诉服务器有用户登录
      this.socket.emit('login', {
        userid: this.userid,
        username: this.username,
      })

      // 监听新用户登录
      this.socket.on('login', function(obj) {
        CHAT.updateSysMsg(obj, 'login')
      })

      // 监听用户退出
      this.socket.on('logout', function(obj) {
        CHAT.updateSysMsg(obj, 'logout')
      })

      // 监听消息发送
      this.socket.on('message', function(obj) {
        const isme = (obj.userid === CHAT.userid) ? true : false
        const contentDiv = `<div>${obj.content}</div>`
        const usernameDiv = `<span>${obj.username}</span>`

        const section = d.createElement('section')
        if(isme) {
          section.className = 'user'
					section.innerHTML = contentDiv + usernameDiv
        } else {
          section.className = 'service'
					section.innerHTML = usernameDiv + contentDiv
        }
        CHAT.msgObj.appendChild(section)
				CHAT.scrollToBottom()
      })
    }
  }

  // 通过“回车”提交用户名
  d.getElementById('username').onkeydown = function(e) {
    e = e || event
    if(e.keyCode === 13) {
      CHAT.usernameSubmit()
    }
  }

  // 通过“回车”提交信息
  d.getElementById('content').onkeydown = function(e) {
    e = e || event
    if(e.keyCode === 13) {
      CHAT.submit()
    }
  }
})()