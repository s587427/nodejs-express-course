# Express

## Install 

1. npm init
2. npm i express ejs
3. npm i nodemon -g
4. to package.json  write  "start": "nodemon server.js" in new line in scripts  

## simpe-webServer

```javascript
// server.js
const express = require('express')
const app = express()
app.get('/', (res, req) => {
   res.send('ok')
})
app.listen(3000)
```

## 路由route

### 通常建立在routes資料夾裡面

```javascript
// users.js
const express = require('express')
// 創建路由
const router = express.Router()
router.get('/', (req, res) => {
    // 得到query string查詢字串
    console.log(req.query.name)
    res.send('user list')
})
module.exports = router

// sever.js
const usersRouter = require('./routes/users')
// 路由匹配都會自動添加 /users
app.use('/users', usersRouter)
```

### req

1. req.body: 接收post data
2. req.query: 接收querystring eg:/users?name=jhon
3. req.param: 接收動態路由 eg: /users/1, /users/2, ...

### res

1. send: 回傳字串
2. json: 回傳json格式
3. donload: 回傳檔案
4. render: 載入view eg: res.render('index', { text2: '你好' })
5. sendStatus: 設定http狀態
6. res.status(500).send('text'): 設定http狀態後回傳字符串


## 中間件middleware
1. 實質是一個方法 fn(req, res, next)
2. 在request 與 respond 之間發生的
3. 需調用next程序才會往下走
4. 常用的中間件
 ```javascript
    // server.js
    // 靜態資源
    app.use(express.static('public'))
    // 表單處理
    app.use(express.urlencoded({ extended: true }))
    // json處理
    app.use(express.json())
    // 路由使用
    app.use('/users', usersRouter)
```
1. 單獨路由使用中間件
```javascript
app.get('/', middleware(可多個用逗點隔開), (req, res) => {})
```

## 靜態資源

1. 通常放在public資料夾
2. 新增public資料夾
3. 在public放入如css、html、javascript等資料...
4. 設定靜態資源位置 app.use([url], express.static('public'))

## view-ejs

1. 預設為自動尋找views資料夾
2. 建立views資料夾
3. 在views資料夾建立index.ejs

```javascript
// server.js
// 設定渲染view 引擎
app.set('view engine', 'ejs')

// index.ejs
// 使用locals 可預防變數undefine顯示錯誤
// <body>
//    hello
//   <%= locals.text %>
// </body>
```