const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.addComment);
router
  .route("/:id")
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment)
  .get(commentController.getComment);

module.exports = router;
