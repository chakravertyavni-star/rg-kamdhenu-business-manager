import { useState } from "react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

import "../styles/Exports.css";

export default function Exports() {

  const [selectedMonth, setSelectedMonth] =
    useState(
      new Date().toISOString().slice(0, 7)
    );

  const getReportData = () => {

    const revenueEntries =
      JSON.parse(
        localStorage.getItem(
          "revenueEntries"
        )
      ) || [];

    const expenseEntries =
      JSON.parse(
        localStorage.getItem(
          "expenseEntries"
        )
      ) || [];

    const revenue =
      revenueEntries.filter(
        (item) =>
          item.date?.startsWith(
            selectedMonth
          )
      );

    const expenses =
      expenseEntries.filter(
        (item) =>
          item.date?.startsWith(
            selectedMonth
          )
      );

    return {
      revenue,
      expenses,
    };
  };

  const downloadPDF = () => {

    const { revenue, expenses } =
      getReportData();

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);

    doc.text(
      "RG Kamdhenu Dairy",
      20,
      y
    );

    y += 10;

    doc.setFontSize(12);

    doc.text(
      `Month: ${selectedMonth}`,
      20,
      y
    );

    y += 20;

    doc.text(
      "Revenue Entries",
      20,
      y
    );

    y += 10;

    revenue.forEach((item) => {

      doc.text(
        `${item.date} | ${item.product} | ₹${item.amount}`,
        20,
        y
      );

      y += 8;

    });

    y += 10;

    doc.text(
      "Expense Entries",
      20,
      y
    );

    y += 10;

    expenses.forEach((item) => {

      doc.text(
        `${item.date} | ${item.expenseName} | ₹${item.amount}`,
        20,
        y
      );

      y += 8;

    });

    doc.save(
      `RG-Kamdhenu-${selectedMonth}.pdf`
    );
  };

  const downloadExcel = () => {

    const { revenue, expenses } =
      getReportData();

    const workbook =
      XLSX.utils.book_new();

    const revenueSheet =
      XLSX.utils.json_to_sheet(
        revenue
      );

    const expenseSheet =
      XLSX.utils.json_to_sheet(
        expenses
      );

    XLSX.utils.book_append_sheet(
      workbook,
      revenueSheet,
      "Revenue"
    );

    XLSX.utils.book_append_sheet(
      workbook,
      expenseSheet,
      "Expenses"
    );

    XLSX.writeFile(
      workbook,
      `RG-Kamdhenu-${selectedMonth}.xlsx`
    );
  };

  return (
    <div className="exports-page">

      <div className="exports-header">

        <h1>
          Export Reports
        </h1>

        <p>
          Download monthly reports.
        </p>

      </div>

      <div className="exports-card">

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

        <button
          className="pdf-btn"
          onClick={downloadPDF}
        >
          Download PDF
        </button>

        <button
          className="excel-btn"
          onClick={downloadExcel}
        >
          Download Excel
        </button>

      </div>

    </div>
  );
}