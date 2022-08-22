const router =          require('express').Router()

router.use('/auth',     require('../controllers/auth'))
router.use('/',         require('../controllers/users'))

module.exports = router;
