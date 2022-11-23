const express = require('express')
// 創建路由
const router = express.Router()

// 使用中間件
router.use(logger)

router.get('/', (req, res) => {
    // 得到query string查詢字串
    console.log(req.query.name)
    res.send('user list')
})

router.get('/new', (req, res) => {
    res.render('users/new')
})


router.post('/', (req, res) => {
    const isVaild = true

    if (isVaild) {
        users.push({ firstName: req.body.firstName })
        // 重新導向
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log('Error')
        res.render('users/new', { firstName: req.body.firstName })
    }
})

// 鏈式寫法
router
    .route('/:id')
    .get((req, res) => {
        console.log(req.user)
        res.send(`User Get With ID ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`User Update With ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`User Delete With ID ${req.params.id}`)
    })


const users = [{ name: 'Kyle' }, { name: 'Sally' }]
// 如果找到與你傳入相同的param(第一個參數)會執行, 這邊以id舉例
// 會比路由先執行, 透過next交給路由
// 參數本質是一個中間件
router.param('id', (req, res, next, id) => {
    console.log(`router.param With ID ${id}`)
    // 中間件添加req.xxx的額外屬性, 可以交給下一個路由或中間件使用
    req.user = users[id]
    next()
})

// 中間件
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}



// 普通寫法
// router.get('/:id', (req, res) => {
//     res.send(`User Get With ID ${req.params.id}`)
// })

// router.put('/:id', (req, res) => {
//     res.send(`User Update With ID ${req.params.id}`)
// })

// router.delete('/:id', (req, res) => {
//     res.send(`User Delete With ID ${req.params.id}`)
// })

module.exports = router