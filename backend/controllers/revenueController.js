const Revenue = require("../models/Revenue");

const getRevenue = async (req, res) => {

  try {

    const revenues =
      await Revenue.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: revenues,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const createRevenue = async (req, res) => {

  try {

    const revenue =
      await Revenue.create(req.body);

    res.status(201).json({
      success: true,
      data: revenue,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const deleteRevenue = async (req, res) => {

  try {

    await Revenue.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Revenue Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getRevenue,
  createRevenue,
  deleteRevenue,
};