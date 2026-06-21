import { useEffect, useState } from "react";
import "../styles/Analytics.css";
import { getRevenue } from "../api/revenueApi";
import { getExpenses } from "../api/expenseApi";

export default function Analytics() {

  const [analytics, setAnalytics] =
    useState({
      totalRevenue: 0,
      totalExpenses: 0,
      totalProfit: 0,
      bestProduct: "N/A",
      topExpense: "N/A",
      revenueCount: 0,
      expenseCount: 0,
    });

   useEffect(() => {

  loadAnalytics();

}, []);

const loadAnalytics = async () => {

  try {

    const revenueResponse =
      await getRevenue();

    const expenseResponse =
      await getExpenses();

    const revenueEntries =
      revenueResponse.data;

    const expenseEntries =
      expenseResponse.data;

    const totalRevenue =
      revenueEntries.reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

    const totalExpenses =
      expenseEntries.reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

    const productMap = {};

    revenueEntries.forEach((item) => {

      productMap[item.product] =
        (productMap[item.product] || 0) +
        Number(item.amount);

    });

    const expenseMap = {};

    expenseEntries.forEach((item) => {

      expenseMap[item.category] =
        (expenseMap[item.category] || 0) +
        Number(item.amount);

    });

    const bestProduct =
      Object.keys(productMap).length
        ? Object.keys(productMap).reduce(
            (a, b) =>
              productMap[a] >
              productMap[b]
                ? a
                : b
          )
        : "N/A";

    const topExpense =
      Object.keys(expenseMap).length
        ? Object.keys(expenseMap).reduce(
            (a, b) =>
              expenseMap[a] >
              expenseMap[b]
                ? a
                : b
          )
        : "N/A";

    setAnalytics({
      totalRevenue,
      totalExpenses,
      totalProfit:
        totalRevenue -
        totalExpenses,
      bestProduct,
      topExpense,
      revenueCount:
        revenueEntries.length,
      expenseCount:
        expenseEntries.length,
    });

  } catch (error) {

    console.error(error);

  }

};

  return (
    <div className="analytics-page">

      <div className="analytics-header">

        <h1>
          Business Analytics
        </h1>

        <p>
          Overall company insights.
        </p>

      </div>

      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>
            Lifetime Revenue
          </h3>
          <h2>
            ₹
            {analytics.totalRevenue.toLocaleString()}
          </h2>
        </div>

        <div className="analytics-card">
          <h3>
            Lifetime Expenses
          </h3>
          <h2>
            ₹
            {analytics.totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="analytics-card">
          <h3>
            Lifetime Profit
          </h3>
          <h2>
            ₹
            {analytics.totalProfit.toLocaleString()}
          </h2>
        </div>

        <div className="analytics-card">
          <h3>
            Best Selling Product
          </h3>
          <h2>
            {analytics.bestProduct}
          </h2>
        </div>

        <div className="analytics-card">
          <h3>
            Highest Expense Category
          </h3>
          <h2>
            {analytics.topExpense}
          </h2>
        </div>

        <div className="analytics-card">
          <h3>
            Revenue Entries
          </h3>
          <h2>
            {analytics.revenueCount}
          </h2>



        </div>

        <div className="analytics-card">
          <h3>
            Expense Entries
          </h3>
          <h2>
            {analytics.expenseCount}
          </h2>
        </div>

      </div>

    </div>
  );
}