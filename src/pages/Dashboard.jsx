import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaChartBar,
} from "react-icons/fa";

import "../styles/Dashboard.css";

import { getRevenue } from "../api/revenueApi";
import { getExpenses } from "../api/expenseApi";

export default function Dashboard() {

  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);

  const [transactions, setTransactions] =
    useState(0);

   useEffect(() => {

    loadDashboard();

    }, []);

    const loadDashboard = async () => {

      try {

        const revenueResponse =
          await getRevenue();

        const expenseResponse =
          await getExpenses();

        const revenueEntries =
          revenueResponse.data;

        const expenseEntries =
          expenseResponse.data;

        const currentMonth =
          new Date().getMonth();

        const currentYear =
          new Date().getFullYear();

        const monthlyRevenue =
          revenueEntries
            .filter((item) => {

              const date =
                new Date(item.date);

              return (
                date.getMonth() ===
                  currentMonth &&
                date.getFullYear() ===
                  currentYear
              );

            })
            .reduce(
              (sum, item) =>
                sum +
                Number(item.amount),
              0
            );

        const monthlyExpenses =
          expenseEntries
            .filter((item) => {

              const date =
                new Date(item.date);

              return (
                date.getMonth() ===
                  currentMonth &&
                date.getFullYear() ===
                  currentYear
              );

            })
            .reduce(
              (sum, item) =>
                sum +
                Number(item.amount),
              0
            );

        setRevenue(monthlyRevenue);

        setExpenses(monthlyExpenses);

        setProfit(
          monthlyRevenue -
          monthlyExpenses
        );

        setTransactions(
          revenueEntries.length +
          expenseEntries.length
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">

        <h1>
          Business Dashboard
        </h1>

        <p>
          Current Month Overview
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card revenue">

          <FaArrowUp />

          <h3>
            Monthly Revenue
          </h3>

          <h2>
            ₹
            {revenue.toLocaleString()}
          </h2>

        </div>

        <div className="stat-card expense">

          <FaArrowDown />

          <h3>
            Monthly Expenses
          </h3>

          <h2>
            ₹
            {expenses.toLocaleString()}
          </h2>

        </div>

        <div className="stat-card profit">

          <FaWallet />

          <h3>
            Net Profit
          </h3>

          <h2>
            ₹
            {profit.toLocaleString()}
          </h2>

        </div>

        <div className="stat-card transactions">

          <FaChartBar />

          <h3>
            Transactions
          </h3>

          <h2>
            {transactions}
          </h2>

        </div>

      </div>

    </div>
  );
}