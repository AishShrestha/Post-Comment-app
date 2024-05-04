const prisma = require("../database/db.config.js");

exports.getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await prisma.user.findMany({
      include: {
        post: {
          select: {
            title: true,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        users: getAllUsers,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
    });
  }
};
exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create user",
    });
  }
};
exports.updateUser = async (req, res) => {
  const id = req.params.id * 1;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
    });
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const deletedUser = await prisma.user.delete({
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
    console.error("Error deleting user:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to delete user",
    });
  }
};
exports.getUser = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user",
    });
  }
};
