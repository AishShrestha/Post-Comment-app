const prisma = require("../database/db.config.js");

exports.getAllComments = async (req, res) => {
  try {
    const getAllComments = await prisma.comment.findMany();

    res.status(200).json({
      status: "success",
      data: {
        users: getAllComments,
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch comments",
    });
  }
};
exports.addComment = async (req, res) => {
  const { post_id, user_id, comment } = req.body;

  try {
    await prisma.post.update({
      where: {
        id: Number(post_id),
      },
      data: {
        comment_count: {
          increment: 1,
        },
      },
    });
    const newComment = await prisma.comment.create({
      data: {
        post_id: Number(post_id),
        user_id: Number(user_id),
        comment: comment,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        post: newComment,
      },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create comment",
    });
  }
};
exports.updateComment = async (req, res) => {
  const id = req.params.id * 1;
  const { comment } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        comment,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        user: updatedComment,
      },
    });
  } catch (err) {
    console.error("Error updating comment:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to update comment",
    });
  }
};
exports.deleteComment = async (req, res) => {
  const id = req.params.id * 1;
  try {
    await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        comment_count: {
          decrement: 1,
        },
      },
    });
    const deletedComment = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        comment: null,
      },
    });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to delete comment",
    });
  }
};
exports.getComment = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        comment: comment,
      },
    });
  } catch (err) {
    console.error("Error fetching comment:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch comment",
    });
  }
};
