const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  addReaction,
  deleteThought,
  deleteReaction,
  updateThought,

} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:postId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:postId/reactions').post(addReaction);
router.route('/:postId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;