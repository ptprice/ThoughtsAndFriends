const router = require('express').Router();
const usersRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
