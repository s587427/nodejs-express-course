const express = require('express')
const app = express()

// 設定渲染view 引擎
app.set('view engine', 'ejs')

// 靜態資源
app.use(express.static('public'))
// 表單處理
app.use(express.urlencoded({ extended: true }))
// json處理
app.use(express.json())


// 路由使用
// 參數1: 所有路由都是由/users開始
// 參數2: 自己定義的路由對象
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(3000)