import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (data.success) {
      alert("Mensaje enviado correctamente!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Error al enviar el email :(");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Tu nombre"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Tu correo"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
        required
      />

      <textarea
        name="message"
        rows="5"
        placeholder="Tu mensaje..."
        value={formData.message}
        onChange={handleChange}
        className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
        required
      />

      <button
        type="submit"
        className="w-full p-3 bg-white text-black font-bold rounded hover:bg-gray-300 transition"
      >
        Enviar mensaje
      </button>
    </form>
  );
}
