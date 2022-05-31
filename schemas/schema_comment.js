const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  foodId: String,
  userId: String,
  nickname: String,
  comment: String,
  commentTime: { type: Date, default:Date.now },
});
CommentSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});
CommentSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Comment", CommentSchema);