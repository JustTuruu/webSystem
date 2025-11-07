import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

// Login Selection
import LoginSelection from "./LoginSelection";

// Teacher Pages
import TeacherHome from "./teacher_ui/pages/TeacherHome";
import TeacherExamList from "./teacher_ui/pages/ExamList";
import TeacherCreateExam from "./teacher_ui/pages/CreateExam";
import TeacherEditExam from "./teacher_ui/pages/EditExam";
import TeacherExamDetail from "./teacher_ui/pages/ExamDetail";
import TeacherExamReport from "./teacher_ui/pages/ExamReport";
import TeacherVariantList from "./teacher_ui/pages/VariantList";
import TeacherCreateVariant from "./teacher_ui/pages/CreateVariant";
import TeacherVariantDetail from "./teacher_ui/pages/VariantDetail";
import TeacherEditVariant from "./teacher_ui/pages/EditVariant";
import QuestionBank from "./teacher_ui/pages/QuestionBank";

// Student Pages
import StudentHome from "./student_ui/pages/StudentHome";
import StudentStartExam from "./student_ui/pages/StartExam";
import StudentTakeExam from "./student_ui/pages/TakeExam";
import StudentExamResult from "./student_ui/pages/ExamResult";
import StudentCheckExam from "./student_ui/pages/CheckExam";

const Index = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      {/* ✅ Fix: This makes LoginSelection show at /team6 */}
      <Route index element={<LoginSelection />} />

      {/* Teacher Routes */}
      <Route path="teacher">
        <Route index element={<TeacherHome />} />
        <Route path="question-bank" element={<QuestionBank />} />
        <Route path="courses/:course_id/exams" element={<TeacherExamList />} />
        <Route
          path="courses/:course_id/exams/create"
          element={<TeacherCreateExam />}
        />
        <Route
          path="courses/:course_id/exams/:exam_id"
          element={<TeacherExamDetail />}
        />
        <Route
          path="courses/:course_id/exams/:exam_id/edit"
          element={<TeacherEditExam />}
        />
        <Route path="exams/:exam_id/report" element={<TeacherExamReport />} />
        <Route
          path="exams/:exam_id/variants"
          element={<TeacherVariantList />}
        />
        <Route
          path="courses/:course_id/exams/:exam_id/variants"
          element={<TeacherVariantList />}
        />
        <Route
          path="courses/:course_id/exams/:exam_id/variants/create"
          element={<TeacherCreateVariant />}
        />
        <Route
          path="exams/:exam_id/variants/:variant_id"
          element={<TeacherVariantDetail />}
        />
        <Route
          path="courses/:course_id/exams/:exam_id/variants/:variant_id"
          element={<TeacherVariantDetail />}
        />
        <Route
          path="courses/:course_id/exams/:exam_id/variants/:variant_id/edit"
          element={<TeacherEditVariant />}
        />
      </Route>

      {/* Student Routes */}
      <Route path="student">
        <Route index element={<StudentHome />} />
        <Route
          path="exams/:exam_id/students/:student_id/start"
          element={<StudentStartExam />}
        />
        <Route
          path="exams/:exam_id/students/:student_id/edit"
          element={<StudentTakeExam />}
        />
        <Route
          path="exams/:exam_id/students/:student_id/result"
          element={<StudentExamResult />}
        />
        <Route
          path="exams/:exam_id/students/:student_id/check"
          element={<StudentCheckExam />}
        />
      </Route>

      {/* ✅ Fallback */}
      <Route path="*" element={<Navigate to="/team6" replace />} />
    </Routes>
  );
};

export default Index;
