import API from "./axios";

/* GET ALL REVENUE */

export const getRevenue =
  async () => {

    const response =
      await API.get("/revenue");

    return response.data;
  };

/* CREATE REVENUE */

export const createRevenue =
  async (revenueData) => {

    const response =
      await API.post(
        "/revenue",
        revenueData
      );

    return response.data;
  };

/* DELETE REVENUE */

export const deleteRevenue =
  async (id) => {

    const response =
      await API.delete(
        `/revenue/${id}`
      );

    return response.data;
  };