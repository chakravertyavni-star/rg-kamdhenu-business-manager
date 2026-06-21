const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {

  try {

    const expenses =
      await Expense.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: expenses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const createExpense = async (req, res) => {

  try {

    const expense =
      await Expense.create(req.body);

    res.status(201).json({
      success: true,
      data: expense,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const deleteExpense = async (req, res) => {

  try {

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Expense Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getExpenses,
  createExpense,
  deleteExpense,
};