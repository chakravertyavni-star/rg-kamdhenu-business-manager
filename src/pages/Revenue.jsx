import { useEffect, useState } from "react";
import "../styles/Revenue.css";
import {
  getRevenue,
  createRevenue,
  deleteRevenue,
} from "../api/revenueApi";


export default function Revenue() {
  const [saved, setSaved] = useState(false);

  const [entries, setEntries] = useState([]);

  const [form, setForm] = useState({
    date: "",
    product: "Milk",
    quantity: "",
    unit: "Liter",
    rate: "",
    paymentMode: "Cash",
    customer: "",
    notes: "",
  });

  /* LOAD DATA */

   useEffect(() => {

  fetchRevenue();

}, []);

const fetchRevenue = async () => {

  try {

    const response =
      await getRevenue();

    setEntries(response.data);

  } catch (error) {

    console.error(error);

  }

};

 

  /* AUTO CALCULATE */

  const amount =
    Number(form.quantity || 0) *
    Number(form.rate || 0);

  /* SAVE */

   const handleSave = async () => {

  if (
    !form.date ||
    !form.quantity ||
    !form.rate
  ) {
    alert(
      "Please fill all required fields."
    );
    return;
  }

  const newEntry = {
    ...form,
    amount,
  };

  try {

    await createRevenue(
      newEntry
    );

    await fetchRevenue();

    setSaved(true);

    setTimeout(() => {
  setSaved(false);
}, 3000);

        setForm({
      date: "",
      product: "Milk",
      quantity: "",
      unit: "Liter",
      rate: "",
      paymentMode: "Cash",
      customer: "",
      notes: "",
    });

  } catch (error) {

    console.error(error);

  }

};

  /* DELETE */

   const deleteEntry = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this revenue entry?"
    );

  if (!confirmDelete) return;

  try {

    await deleteRevenue(id);

    await fetchRevenue();

  } catch (error) {

    console.error(error);

  }

};

 

  return (
    <div className="revenue-page">

      <div className="page-header">
        <h1>Revenue Management</h1>

        <p>
          Add and track company revenue.
        </p>
      </div>

      <div className="revenue-card">

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
            <label>Product</label>

            <select
              value={form.product}
              onChange={(e) =>
                setForm({
                  ...form,
                  product:
                    e.target.value,
                })
              }
            >
              <option>Milk</option>
              <option>Ghee</option>
              <option>Paneer</option>
              <option>Curd</option>
              <option>Butter</option>
              <option>Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Quantity</label>

            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <label>Unit</label>

            <select
              value={form.unit}
              onChange={(e) =>
                setForm({
                  ...form,
                  unit:
                    e.target.value,
                })
              }
            >
              <option>Liter</option>
              <option>Kg</option>
              <option>Piece</option>
            </select>
          </div>

          <div className="input-group">
            <label>Rate</label>

            <input
              type="number"
              placeholder="Rate"
              value={form.rate}
              onChange={(e) =>
                setForm({
                  ...form,
                  rate:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <label>Payment Mode</label>

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
              <option>Cash</option>
              <option>UPI</option>
              <option>
                Bank Transfer
              </option>
            </select>
          </div>

        </div>

        <div className="input-group full-width">
          <label>
            Customer Name
          </label>

          <input
            type="text"
            placeholder="Optional"
            value={form.customer}
            onChange={(e) =>
              setForm({
                ...form,
                customer:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="input-group full-width">
          <label>Notes</label>

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
          Total Revenue:
          ₹{amount.toLocaleString()}
        </div>

        {saved && (
          <div className="success-msg">
            ✓ Revenue Saved
            Successfully
          </div>
        )}

        <button
          className="save-btn"
          onClick={handleSave}
        >
          Save Revenue
        </button>

      </div>

      <div className="entries-section">

        <div className="table-header">

          <h2>
            Revenue Entries
          </h2>
 

        </div>

        <table>

          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {entries.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "20px",
                  }}
                >
                  No Revenue Entries Yet
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
                      {entry.product}
                    </td>

                    <td>
                      {
                        entry.quantity
                      }{" "}
                      {entry.unit}
                    </td>

                    <td>
                      ₹{entry.rate}
                    </td>

                    <td>
                      ₹
                      {Number(
                        entry.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      {
                        entry.paymentMode
                      }
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteEntry(
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