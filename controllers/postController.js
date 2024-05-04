const prisma = require("../database/db.config.js");

exports.getAllPosts = async (req, res) => {
  try {
    const getAllPosts = await prisma.post.findMany({
      include: {
        comment: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      // where: {
      //   title: {
      //     startsWith: "First",
      //   },
      // },
    });
    res.status(200).json({
      status: "success",
      data: {
        users: getAllPosts,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch posts",
    });
  }
};
exports.addPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        user_id: Number(user_id),
        title,
        description,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create post",
    });
  }
};
exports.updatePost = async (req, res) => {
  const id = req.params.id * 1;
  const { title, description } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        user: updatedPost,
      },
    });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to update post",
    });
  }
};
exports.deletePost = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        user: null,
      },
    });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to delete post",
    });
  }
};
exports.getPost = async (req, res) => {
  console.log(req.params.id);
  const id = Number(req.params.id); // Convert id to a number
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id, // Pass the id as an object property
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        post: post,
      },
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch post",
    });
  }
};

exports.searchPost = async (req, res) => {
  const query = req.query.q;
  console.log(req);
  try {
    const searchPost = await prisma.post.findMany({
      where: {
        description: {
          search: query,
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        posts: searchPost,
      },
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch post",
    });
  }
};

exports.paginatePost = async (req, res) => {
  try {
    const result = await prisma.post.findMany({
      skip: Number(req.query.offset),
      take: Number(req.query.limit),
    });
    res.status(200).json({
      status: "success",
      data: {
        posts: result,
      },
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch post",
    });
  }
};
