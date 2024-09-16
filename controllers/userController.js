const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.tagId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
        res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


async updateUser(req, res) {
    try {
        const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
        );
    
        if (!updatedUser) {
        return res.status(404).json({ message: 'No user with this ID' });
        }
    
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
    },
    // delete a user by its _id value
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
    
            if (!deletedUser) {
            return res.status(404).json({ message: 'No user with this ID' });
            }
    
            res.json(deletedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add a friend to a user's friend list
    async addFriend(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
            );
    
            if (!updatedUser) {
            return res.status(404).json({ message: 'No user with this ID' });
            }
    
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
            );
    
            if (!updatedUser) {
            return res.status(404).json({ message: 'No user with this ID' });
            }
    
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
