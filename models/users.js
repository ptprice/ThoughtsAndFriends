const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    userName: {
      type: String,
        unique: true,
      required: true,
        trim: true,
    },
    email: {
      type: String,
      required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
        
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true,
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `friendLength: ${this.friends.length}`;
  });

const User = model('User', userSchema);

module.exports = User;
