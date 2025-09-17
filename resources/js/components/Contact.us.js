import React, { useEffect, useState } from "react";
import "../../sass/Contact.us.scss";


function Contact() {
  const API_URL = "http://127.0.0.1:8000/api/contacts";

  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  // Fetch contacts on page load
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error saving contact");

      setStatus(editingId ? "Contact updated!" : "Contact added!");
      setForm({ name: "", email: "", message: "" });
      setEditingId(null);
      fetchContacts();
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error: " + error.message);
    }
  };

  const handleEdit = (contact) => {
    setForm({
      name: contact.name,
      email: contact.email,
      message: contact.message,
    });
    setEditingId(contact.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setStatus("Contact deleted!");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />{" "}
        <br />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />{" "}
        <br />
        <button type="submit">{editingId ? "Update" : "Add"} Contact</button>
      </form>

      {status && <p>{status}</p>}

      {/* Contact List */}
      <h3>All Contacts</h3>
      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.message}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No contacts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Contact;
