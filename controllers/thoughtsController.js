const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const oneThought = await Thought.findOne({
        _id: req.params.postId,
      });

      if (!oneThought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(oneThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new post
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  },
  // update a post by its _id value
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.postId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a post
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.postId,
      });

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }
      const updatedUser = await User.findOneAndUpdate(
        { thoughts: req.params.postId },
        { $pull: { thoughts: req.params.postId } },
        { new: true }
      );
      res.json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a reaction to a thought
  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.postId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  },
  // remove a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
