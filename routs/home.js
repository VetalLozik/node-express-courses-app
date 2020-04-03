const {Router} = require('express')

const router = Router();

router.get('/', (req, res)=>{
    res.render('index', {
        title: 'Courses shop',
        isMain: true
    })
});

module.exports = router;