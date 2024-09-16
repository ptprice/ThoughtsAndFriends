const router = require('express').Router();
const {
  getSingleUser,
  getUsers,
  createUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:postId').get(getSingleUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;