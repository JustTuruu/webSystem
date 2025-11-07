import { useState } from "react";
import { VariantAPI } from "../../api/apiVariant";

export default function CreateVariant({ examId = 1 }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await VariantAPI.create(examId, form);
      setMessage("Амжилттай нэмэгдлээ!");
      setForm({ name: "", description: "" });
    } catch (err) {
      console.error(err);
      setMessage("Вариант үүсгэхэд алдаа гарлаа!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Шинэ вариант нэмэх</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Вариантын нэр"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Тайлбар"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Нэмэх
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
