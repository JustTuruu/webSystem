import { useEffect, useState } from "react";
import { VariantAPI } from "../../api/apiVariant";

export default function VariantList({ examId = 1 }) {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVariants = async () => {
      try {
        const data = await VariantAPI.getAll(examId);
        setVariants(data);
      } catch (err) {
        console.error(err);
        setError("Вариантуудыг дуудахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    };
    loadVariants();
  }, [examId]);

  if (loading) return <p>Түр хүлээнэ үү...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Шалгалтын вариантын жагсаалт
      </h1>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Нэр</th>
            <th className="border p-2">Тайлбар</th>
            <th className="border p-2">Асуултын тоо</th>
            <th className="border p-2">Огноо</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v, i) => (
            <tr key={v.id}>
              <td className="border p-2 text-center">{i + 1}</td>
              <td className="border p-2">{v.name}</td>
              <td className="border p-2">{v.description}</td>
              <td className="border p-2 text-center">
                {v.totalQuestions ?? 0}
              </td>
              <td className="border p-2 text-center">
                {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
