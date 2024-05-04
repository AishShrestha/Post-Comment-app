const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

const {
  getAllPosts,
  addPost,
  searchPost,
  paginatePost,
  updatePost,
  deletePost,
  getPost,
} = require("../controllers/postController");

router.route("/").get(getAllPosts).post(postController.addPost);
router.route("/search").get(postController.searchPost);
router.route("/paginate").get(postController.paginatePost);
router
  .route("/:id")
  .patch(postController.updatePost)
  .delete(postController.deletePost)
  .get(postController.getPost);

module.exports = router;
