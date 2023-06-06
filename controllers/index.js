const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashRoutes');


router.use('/api', apiRoutes);

router.use('/blogs', dashRoutes);

router.use('/', homeRoutes);


module.exports = router;