import React, { useEffect, useState } from "react";
import "../../sass/Contact.us.scss";

function Contact() {
  const API_URL = "http://127.0.0.1:8000/api/contacts";

  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

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

      setStatus(editingId ? "✅ Contact updated!" : "✅ Contact added!");
      setForm({ name: "", email: "", message: "" });
      setEditingId(null);
      fetchContacts();
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ " + error.message);
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
      setStatus("🗑️ Contact deleted!");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="contact-page">
      <h2>📇 Contact Manager</h2>

      {/* Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">
          {editingId ? "💾 Update Contact" : "➕ Add Contact"}
        </button>
      </form>

      {status && <p className="status">{status}</p>}

      {/* Contact List */}
      <h3>All Contacts</h3>
      <div className="contact-list">
        {contacts.length > 0 ? (
          contacts.map((c) => (
            <div key={c.id} className="contact-card">
              <div className="info">
                <h4>{c.name}</h4>
                <p>{c.email}</p>
                <small>{c.message}</small>
              </div>
              <div className="actions">
                <button className="btn-edit" onClick={() => handleEdit(c)}>
                  ✏️ Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(c.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty">No contacts found. Add one above!</p>
        )}
      </div>
    </div>
  );
}

export default Contact;
