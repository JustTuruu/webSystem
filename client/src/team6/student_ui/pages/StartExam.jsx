import { Link, useParams, useNavigate } from 'react-router-dom';
import { mockExams, mockStudentExams, mockQuestionBank, getRandomQuestions } from '../../data/mockData';
import { useState } from 'react';

const StartExam = () => {
  const { exam_id, student_id } = useParams();
  const navigate = useNavigate();
  const [randomQuestions, setRandomQuestions] = useState(null);
  
  const exam = mockExams.find(e => e.id === parseInt(exam_id));
  const studentExam = mockStudentExams.find(
    se => se.examId === parseInt(exam_id) && se.studentId === parseInt(student_id)
  ); 

  if (!exam || !studentExam) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Шалгалт олдсонгүй</h2>
          <Link to="/team6/student" className="text-black hover:underline">
            Буцах
          </Link>
        </div>
      </div>
    );
  }

  const handleStartExam = () => {
    // Санамсаргүй 7 асуулт сонгох
    const selectedQuestions = getRandomQuestions();
    console.log('✅ Selected 7 questions:', selectedQuestions);
    
    // Асуултуудын төрлийг шалгах
    const questionDetails = selectedQuestions.map(id => {
      const q = mockQuestionBank.find(question => question.id === id);
      return { 
        id, 
        type: q?.type, 
        hasImage: !!q?.image,
        question: q?.question?.substring(0, 30) + '...'
      };
    });
    console.log('📊 Question types:', questionDetails);
    
    // SessionStorage-д хадгалах
    sessionStorage.setItem(`exam_${exam_id}_questions`, JSON.stringify(selectedQuestions));
    console.log('💾 Saved to sessionStorage:', `exam_${exam_id}_questions`);
    
    // TakeExam хуудас руу шилжих
    navigate(`/team6/student/exams/${exam_id}/students/${student_id}/edit`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <div className="mb-4 text-center">
          <Link
            to="/team6/student"
            className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
          >
            ← Нүүр хуудас руу буцах
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-8 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
            <p className="text-gray-300">{exam.description}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Эхлэх цаг:</span>
                <span className="font-semibold text-gray-900">{formatDate(exam.startDate)}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Үргэлжлэх хугацаа:</span>
                <span className="font-semibold text-gray-900">{exam.duration} минут</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Нийт оноо:</span>
                <span className="font-semibold text-gray-900">{exam.totalMarks}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Тэнцэх оноо:</span>
                <span className="font-semibold text-gray-900">{exam.passingMarks}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-3">📌 Анхаарах зүйлс:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>Шалгалт эхэлсний дараа тогтоосон хугацаанд дуусгах шаардлагатай</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>Хариултаа оруулсны дараа "Дараагийнх" товчийг дарна уу</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>Бүх асуултад хариулсны дараа "Дуусгах" товчийг дарна уу</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>Шалгалт дууссаны дараа өөрчлөлт хийх боломжгүй</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            {studentExam.status === 'not_started' ? (
              <div className="flex gap-4">
                <Link
                  to="/team6/student"
                  className="flex-1 px-6 py-4 text-center border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Буцах
                </Link>
                <button
                  onClick={handleStartExam}
                  className="flex-1 px-6 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Шалгалт эхлүүлэх
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-yellow-600 mb-4">
                  ⚠️ Та энэ шалгалтыг аль хэдийн эхлүүлсэн байна
                </div>
                <Link
                  to={`/team6/student/exams/${exam_id}/students/${student_id}/result`}
                  className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Үр дүн харах
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartExam;
