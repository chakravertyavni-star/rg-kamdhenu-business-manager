import { useEffect, useState } from "react";
import "../styles/Reports.css";
import { getRevenue } from "../api/revenueApi";
import { getExpenses } from "../api/expenseApi";



export default function Reports() {

  const [selectedMonth, setSelectedMonth] =
    useState(
      new Date().toISOString().slice(0, 7)
    );

  const [report, setReport] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
    revenueBreakdown: {},
    expenseBreakdown: {},
  });

  useEffect(() => {

  loadReport();

}, [selectedMonth]);

const loadReport = async () => {

  try {

    const revenueResponse =
      await getRevenue();

    const expenseResponse =
      await getExpenses();

    const revenueEntries =
      revenueResponse.data;

    const expenseEntries =
      expenseResponse.data;

    const filteredRevenue =
      revenueEntries.filter(
        (item) =>
          item.date?.startsWith(
            selectedMonth
          )
      );

    const filteredExpenses =
      expenseEntries.filter(
        (item) =>
          item.date?.startsWith(
            selectedMonth
          )
      );

    const totalRevenue =
      filteredRevenue.reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

    const totalExpenses =
      filteredExpenses.reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );

    const revenueBreakdown = {};

    filteredRevenue.forEach((item) => {

      revenueBreakdown[item.product] =
        (revenueBreakdown[
          item.product
        ] || 0) +
        Number(item.amount);

    });

    const expenseBreakdown = {};

    filteredExpenses.forEach((item) => {

      expenseBreakdown[item.category] =
        (expenseBreakdown[
          item.category
        ] || 0) +
        Number(item.amount);

    });

    setReport({
      revenue: totalRevenue,
      expenses: totalExpenses,
      profit:
        totalRevenue -
        totalExpenses,
      revenueBreakdown,
      expenseBreakdown,
    });

  } catch (error) {

    console.error(error);

  }

};

  return (
    <div className="reports-page">

      <div className="reports-header">

        <h1>
          Monthly Reports
        </h1>

        <p>
          View financial history
          by month.
        </p>

      </div>

      <div className="month-box">

        <label>
          Select Month
        </label>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              e.target.value
            )
          }
        />

      </div>

      <div className="stats-grid">

        <div className="report-card">

          <h3>Revenue</h3>

          <h2>
            ₹
            {report.revenue.toLocaleString()}
          </h2>

        </div>

        <div className="report-card">

          <h3>Expenses</h3>

          <h2>
            ₹
            {report.expenses.toLocaleString()}
          </h2>

        </div>

        <div className="report-card">

          <h3>Profit</h3>

          <h2>
            ₹
            {report.profit.toLocaleString()}
          </h2>

        </div>

      </div>

      <div className="breakdown-grid">

        <div className="breakdown-card">

          <h2>
            Revenue Breakdown
          </h2>

          {Object.keys(
            report.revenueBreakdown
          ).length === 0 ? (
            <p>
              No Revenue Data
            </p>
          ) : (
            Object.entries(
              report.revenueBreakdown
            ).map(
              ([name, amount]) => (
                <div
                  className="breakdown-row"
                  key={name}
                >
                  <span>{name}</span>

                  <span>
                    ₹
                    {amount.toLocaleString()}
                  </span>
                </div>
              )
            )
          )}

        </div>

        <div className="breakdown-card">

          <h2>
            Expense Breakdown
          </h2>

          {Object.keys(
            report.expenseBreakdown
          ).length === 0 ? (
            <p>
              No Expense Data
            </p>
          ) : (
            Object.entries(
              report.expenseBreakdown
            ).map(
              ([name, amount]) => (
                <div
                  className="breakdown-row"
                  key={name}
                >
                  <span>{name}</span>

                  <span>
                    ₹
                    {amount.toLocaleString()}
                  </span>
                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}