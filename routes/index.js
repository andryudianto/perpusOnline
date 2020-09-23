const router = require('express').Router()
const Controller = require('../controllers/Controller')
const auth = require('../middlewares/auth')

router.get('/', Controller.getHomeHandler)
router.get('/register', Controller.getRegisterHandler)
router.post('/register', Controller.postRegisterHandler)
router.get('/profile', auth, Controller.getProfileHandler)
router.post('/profile/:id', auth, Controller.postProfileHandler)
router.get('/delete/:id', auth, Controller.deleteMyAccount)
router.get('/books', auth, Controller.showBookHandler)
router.get('/books/:id', auth, Controller.getBookByIdHandler)
router.get('/login', Controller.getLoginHandler)
router.post('/login', Controller.postLoginHandler)
router.get('/logout', Controller.logoutHandler)
router.get('/password/:id', auth, Controller.getChangePasswordHandler)
router.post('/password/:id', auth, Controller.postChangePasswordHandler)
router.get('/books?', Controller.getSortBookHandler)
router.get('/*', (req, res) => {
    res.send('Not Found 404')
})

module.exports = router