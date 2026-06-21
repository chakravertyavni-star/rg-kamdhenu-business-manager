import { useEffect, useState } from "react";
import "../styles/Expenses.css";
import {
  getExpenses,
  createExpense,
  deleteExpense as deleteExpenseApi,
} from "../api/expenseApi";


export default function Expenses() {

  const [saved, setSaved] = useState(false);

  const [entries, setEntries] = useState([]);

  const [form, setForm] = useState({
    date: "",
    expenseName: "",
    category: "Cow Food",
    amount: "",
    paymentMode: "Cash",
    notes: "",
  });

  /* LOAD DATA */

   useEffect(() => {

  fetchExpenses();

}, []);

const fetchExpenses = async () => {

  try {

    const response =
      await getExpenses();

    setEntries(response.data);

  } catch (error) {

    console.error(error);

  }

};

 

  /* SAVE EXPENSE */

   const handleSave = async () => {

  if (
    !form.date ||
    !form.expenseName ||
    !form.amount
  ) {
    alert(
      "Please fill all required fields."
    );
    return;
  }

  const newExpense = {
    ...form,
  };

  try {

    await createExpense(
      newExpense
    );

    await fetchExpenses();

    setSaved(true);

    setForm({
      date: "",
      expenseName: "",
      category: "Cow Food",
      amount: "",
      paymentMode: "Cash",
      notes: "",
    });

    setTimeout(() => {

      setSaved(false);

    }, 3000);

  } catch (error) {

    console.error(
      "Expense Save Error:",
      error
    );

    alert(
      "Failed to save expense."
    );

  }

};

  /* DELETE */

    const deleteExpense = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this expense entry?"
    );

  if (!confirmDelete) return;

  try {

    await deleteExpenseApi(id);

    await fetchExpenses();

  } catch (error) {

    console.error(
      "Delete Error:",
      error
    );

  }

};
  

  return (
    <div className="expense-page">

      <div className="page-header">

        <h1>
          Expense Management
        </h1>

        <p>
          Track and manage business expenses.
        </p>

      </div>

      <div className="expense-card">

        <div className="form-grid">

          <div className="input-group">

            <label>Date</label>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
            />

          </div>

          <div className="input-group">

            <label>
              Expense Name
            </label>

            <input
              type="text"
              placeholder="Expense Name"
              value={form.expenseName}
              onChange={(e) =>
                setForm({
                  ...form,
                  expenseName:
                    e.target.value,
                })
              }
            />

          </div>

          <div className="input-group">

            <label>
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category:
                    e.target.value,
                })
              }
            >
              <option>
                Cow Food
              </option>

              <option>
                Fuel
              </option>

              <option>
                Electricity
              </option>

              <option>
                Salary
              </option>

              <option>
                Transport
              </option>

              <option>
                Maintenance
              </option>

              <option>
                Equipment
              </option>

              <option>
                Farm Supplies
              </option>

              <option>
                Marketing
              </option>

              <option>
                Office
              </option>

              <option>
                Other
              </option>

            </select>

          </div>

          <div className="input-group">

            <label>
              Amount
            </label>

            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount:
                    e.target.value,
                })
              }
            />

          </div>

          <div className="input-group">

            <label>
              Payment Mode
            </label>

            <select
              value={form.paymentMode}
              onChange={(e) =>
                setForm({
                  ...form,
                  paymentMode:
                    e.target.value,
                })
              }
            >
              <option>
                Cash
              </option>

              <option>
                UPI
              </option>

              <option>
                Bank Transfer
              </option>

              <option>
                Cheque
              </option>

            </select>

          </div>

        </div>

        <div className="input-group full-width">

          <label>
            Notes
          </label>

          <textarea
            placeholder="Additional details"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes:
                  e.target.value,
              })
            }
          />

        </div>

        <div className="amount-box">

          Expense Amount:
          ₹
          {Number(
            form.amount || 0
          ).toLocaleString()}

        </div>

        {saved && (

          <div className="success-msg">

            ✓ Expense Saved Successfully

          </div>

        )}

        <button
          className="save-btn"
          onClick={handleSave}
        >
          Save Expense
        </button>

      </div>

      <div className="entries-section">

        <div className="table-header">

          <h2>
            Expense Entries
          </h2>

           

        </div>

        <table>

          <thead>

            <tr>

              <th>Date</th>

              <th>Expense</th>

              <th>Category</th>

              <th>Amount</th>

              <th>Payment</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {entries.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "20px",
                  }}
                >
                  No Expense Entries Yet
                </td>

              </tr>

            ) : (

              entries.map(
                (entry) => (

                  <tr
                    key={entry._id}
                  >

                    <td>
                      {entry.date}
                    </td>

                    <td>
                      {entry.expenseName}
                    </td>

                    <td>
                      {entry.category}
                    </td>

                    <td>
                      ₹
                      {Number(
                        entry.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      {entry.paymentMode}
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteExpense(
                            entry._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}