const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let noteSchema = new Schema({
  content: { type: String, required: true },
  title: { type: String, required: true },
  creator: {type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: new Date() },
  lastSaved: { type: Date, default: new Date() }
});

let Note = mongoose.model('Note', noteSchema);

module.exports = Note;