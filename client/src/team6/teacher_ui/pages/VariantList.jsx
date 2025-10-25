import { Link, useParams } from 'react-router-dom';
import { mockExams, mockVariants, mockQuestionBank } from '../../data/mockData';

const VariantList = () => {
  const { course_id, exam_id } = useParams();
  
  const exam = mockExams.find(e => e.id === parseInt(exam_id));
  const variants = mockVariants.filter(v => v.examId === parseInt(exam_id));

  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Шалгалт олдсонгүй</h2>
          <Link to={`/team6/teacher/courses/${course_id}/exams`} className="text-black hover:underline">
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/team6/teacher/courses/${course_id}/exams/${exam_id}`}
            className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
          >
            ← Буцах
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Хувилбарууд</h1>
              <p className="text-gray-600">{exam.title}</p>
            </div>
            <Link
              to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants/create`}
              className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              + Хувилбар нэмэх
            </Link>
          </div>
        </div>

        {/* Variants Grid */}
        {variants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Хувилбар байхгүй</h3>
            <p className="text-gray-600 mb-6">Эхний хувилбараа үүсгэнэ үү</p>
            <Link
              to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants/create`}
              className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              + Хувилбар нэмэх
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map(variant => {
              const questions = variant.questionIds?.map(id => mockQuestionBank.find(q => q.id === id)).filter(Boolean) || [];
              const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

              return (
                <div key={variant.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* Variant Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{variant.name}</h3>

                    {/* Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Асуултын тоо:</span>
                        <span className="font-semibold text-gray-900">{questions.length}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Нийт оноо:</span>
                        <span className="font-semibold text-gray-900">{totalMarks}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Үүсгэсэн:</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(variant.createdAt).toLocaleDateString('mn-MN')}
                        </span>
                      </div>
                    </div>

                    {/* Question Types Breakdown */}
                    <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-600 mb-2">Асуултын төрөл:</div>
                      <div className="flex flex-wrap gap-2">
                        {questions.filter(q => q.questionType === 'multiple_choice').length > 0 && (
                          <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
                            Сонгох: {questions.filter(q => q.questionType === 'multiple_choice').length}
                          </span>
                        )}
                        {questions.filter(q => q.questionType === 'text').length > 0 && (
                          <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">
                            Бичгээр: {questions.filter(q => q.questionType === 'text').length}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants/${variant.id}`}
                        className="flex-1 px-4 py-2 bg-black text-white text-center rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        Харах
                      </Link>
                      <Link
                        to={`/team6/teacher/courses/${course_id}/exams/${exam_id}/variants/${variant.id}/edit`}
                        className="flex-1 px-4 py-2 bg-white border-2 border-gray-200 text-gray-900 text-center rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Засах
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VariantList;
