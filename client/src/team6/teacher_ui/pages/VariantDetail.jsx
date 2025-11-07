import { useEffect, useState } from "react";
import { VariantAPI } from "../../api/apiVariant";

export default function VariantDetail({ examId = 1, variantId = 1 }) {
  const [variant, setVariant] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const v = await VariantAPI.getOne(examId, variantId);
        const q = await VariantAPI.getQuestions(variantId);
        setVariant(v);
        setQuestions(q);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [examId, variantId]);

  if (!variant) return <p>Ачаалж байна...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">{variant.name}</h1>
      <p className="text-gray-600 mb-4">{variant.description}</p>

      <h2 className="text-xl font-semibold mb-2">Асуултууд:</h2>
      <ul className="list-disc ml-6">
        {questions.length > 0 ? (
          questions.map((q) => <li key={q.id}>{q.question}</li>)
        ) : (
          <p>Асуулт олдсонгүй.</p>
        )}
      </ul>
    </div>
  );
}
