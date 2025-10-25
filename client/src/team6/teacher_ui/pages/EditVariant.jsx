import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mockExams, mockVariants, mockQuestionBank } from '../../data/mockData';

const EditVariant = () => {
  const { course_id, exam_id, variant_id } = useParams();
  const navigate = useNavigate();
  
  const exam = mockExams.find(e => e.id === parseInt(exam_id));
  const variant = mockVariants.find(v => v.id === parseInt(variant_id));
  const existingQuestions = variant?.questionIds?.map(id => mockQuestionBank.find(q => q.id === id)).filter(Boolean) || [];
  
  const [variantName, setVariantName] = useState(variant?.name || '');
  const [questions, setQuestions] = useState(
    existingQuestions.length > 0 
      ? existingQuestions.map(q => ({
          id: q.id,
          questionText: q.question,
          questionType: q.type,
          options: q.options || ['', '', '', ''],
          correctAnswer: q.correctAnswers?.[0] || '',
          marks: q.marks
        }))
      : [{
          id: Date.now(),
          questionText: '',
          questionType: 'multiple_choice',
          options: ['', '', '', ''],
          correctAnswer: '',
          marks: 5
        }]
  );

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        questionText: '',
        questionType: 'multiple_choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: 5
      }
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated variant:', { name: variantName, questions });
    alert('Хувилбар амжилттай шинэчлэгдлээ!');
    navigate(`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants/${variant_id}`);
  };

  if (!exam || !variant) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Хувилбар олдсонгүй</h2>
          <Link to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants`} className="text-black hover:underline">
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants/${variant_id}`}
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Буцах
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Хувилбар засах</h1>
          <p className="text-gray-600">{exam.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Variant Name */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Хувилбарын нэр *
            </label>
            <input
              type="text"
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
              placeholder="Жишээ: Хувилбар A"
            />
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((question, qIndex) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Асуулт {qIndex + 1}</h3>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Устгах
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Question Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Асуулт *
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) => updateQuestion(question.id, 'questionText', e.target.value)}
                      required
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                      placeholder="Асуултын текст..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Question Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Төрөл *
                      </label>
                      <select
                        value={question.questionType}
                        onChange={(e) => updateQuestion(question.id, 'questionType', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                      >
                        <option value="multiple_choice">Сонгох</option>
                        <option value="text">Бичгээр</option>
                      </select>
                    </div>

                    {/* Marks */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Оноо *
                      </label>
                      <input
                        type="number"
                        value={question.marks}
                        onChange={(e) => updateQuestion(question.id, 'marks', parseInt(e.target.value))}
                        required
                        min="1"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Options for multiple choice */}
                  {question.questionType === 'multiple_choice' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Хариултууд *
                      </label>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <input
                            key={optIndex}
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                            placeholder={`Хариулт ${optIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Correct Answer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Зөв хариулт *
                    </label>
                    {question.questionType === 'multiple_choice' ? (
                      <select
                        value={question.correctAnswer}
                        onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                      >
                        <option value="">Сонгох...</option>
                        {question.options.filter(opt => opt).map((option, idx) => (
                          <option key={idx} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={question.correctAnswer}
                        onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        placeholder="Зөв хариулт"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Question Button */}
          <button
            type="button"
            onClick={addQuestion}
            className="w-full px-6 py-3 bg-white border-2 border-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            + Асуулт нэмэх
          </button>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Хадгалах
            </button>
            <Link
              to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants/${variant_id}`}
              className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-lg font-medium text-center hover:bg-gray-50 transition-colors"
            >
              Болих
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVariant;
