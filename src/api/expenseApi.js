import API from "./axios";

/* GET ALL EXPENSES */

export const getExpenses =
  async () => {

    const response =
      await API.get("/expense");

    return response.data;
  };

/* CREATE EXPENSE */

export const createExpense =
  async (expenseData) => {

    const response =
      await API.post(
        "/expense",
        expenseData
      );

    return response.data;
  };

/* DELETE EXPENSE */

export const deleteExpense =
  async (id) => {

    const response =
      await API.delete(
        `/expense/${id}`
      );

    return response.data;
  };