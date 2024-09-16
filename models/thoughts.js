const { Schema, model } = require('mongoose');
reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },

    },
 
  {
    toJSON: {
      getters: true,
    },
    id: false,
    timestamps: true,
  }
);

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
        minlength: 1,
        maxlength: 280,
    },
 
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        
      },
    ],
    reactions: [
        reactionSchema
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

thoughtsSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `reactionCount: ${this.reactions.length}`;
  });

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;