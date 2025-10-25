import { Link, useParams } from 'react-router-dom';
import { mockExams, mockVariants, mockQuestionBank } from '../../data/mockData';

const VariantDetail = () => {
  const { course_id, exam_id, variant_id } = useParams();
  
  const exam = mockExams.find(e => e.id === parseInt(exam_id));
  const variant = mockVariants.find(v => v.id === parseInt(variant_id));
  const questions = variant?.questionIds?.map(id => mockQuestionBank.find(q => q.id === id)).filter(Boolean) || [];

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

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants`}
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Хувилбарууд руу буцах
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{variant.name}</h1>
              <p className="text-gray-600">{exam.title}</p>
            </div>
            <Link
              to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants/${variant_id}/edit`}
              className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Засах
            </Link>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ерөнхий мэдээлэл</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Асуултын тоо</div>
              <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Нийт оноо</div>
              <div className="text-2xl font-bold text-gray-900">{totalMarks}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Сонгох</div>
              <div className="text-2xl font-bold text-gray-900">
                {questions.filter(q => q.type === 'multiple_choice' || q.type === 'multiple_correct').length}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Бичгээр</div>
              <div className="text-2xl font-bold text-gray-900">
                {questions.filter(q => q.type === 'fill_blank' || q.type === 'text_answer').length}
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Асуултууд</h2>
          
          {questions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Асуулт байхгүй</h3>
              <p className="text-gray-600 mb-6">Хувилбарт асуулт нэмэх хэрэгтэй байна</p>
              <Link
                to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants/${variant_id}/edit`}
                className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Засах
              </Link>
            </div>
          ) : (
            questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-black text-white px-3 py-1 rounded-lg font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {question.question}
                    </h3>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Төрөл:</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded">
                          {question.type === 'multiple_choice' ? 'Нэг сонголт' : 
                           question.type === 'multiple_correct' ? 'Олон сонголт' :
                           question.type === 'fill_blank' ? 'Нөхөх' : 'Текст'}
                        </span>
                      </span> 
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Оноо:</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded">{question.marks}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Options (for multiple choice) */}
                {question.type === 'multiple_choice' && question.options && (
                  <div className="ml-11 space-y-2">
                    {question.options.map((option, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border-2 ${
                          question.correctAnswers?.includes(option)
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {question.correctAnswers?.includes(option) && (
                            <span className="text-green-600 font-bold">✓</span>
                          )}
                          <span className={`${
                            question.correctAnswers?.includes(option) ? 'font-semibold text-green-800' : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Correct Answer (for text type) */}
                {(question.type === 'fill_blank' || question.type === 'text_answer') && (
                  <div className="ml-11 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-sm text-green-700 mb-1 font-medium">✓ Зөв хариулт:</div>
                    <div className="font-semibold text-green-800">{question.correctAnswers?.join(', ')}</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants`}
            className="block w-full px-6 py-4 text-center bg-white border-2 border-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Буцах
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VariantDetail;
