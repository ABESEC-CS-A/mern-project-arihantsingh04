const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: { type: String, default: "Anonymous" },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  votes: { type: Number, default: 0 },
  voters: [String],
  status: { 
    type: String, 
    enum: ['Submitted', 'In Review', 'Approved', 'Rejected'], 
    default: 'Submitted' 
  },
  comments: [CommentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Idea', IdeaSchema);
