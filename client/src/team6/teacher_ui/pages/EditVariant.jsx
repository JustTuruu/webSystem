import { useEffect, useState } from "react";
import { VariantAPI } from "../../api/apiVariant";

export default function EditVariant({ examId = 1, variantId = 1 }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    VariantAPI.getOne(examId, variantId)
      .then((data) => setForm(data))
      .catch((err) => console.error("Алдаа:", err));
  }, [examId, variantId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await VariantAPI.update(examId, variantId, form);
      setMessage("Амжилттай шинэчлэгдлээ!");
    } catch (err) {
      console.error(err);
      setMessage("Шинэчлэхэд алдаа гарлаа!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Вариант засах</h2>
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
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Хадгалах
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
