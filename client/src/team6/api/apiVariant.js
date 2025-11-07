// /src/team6/api/apiVariant.js
import { fetchData } from "../../utils/fetchData";

const BASE_URL = "https://todu.mn/bs/lms/v1";

export const VariantAPI = {
  /**
   * 🎯 Бүх вариантуудыг авах (Exam ID-аар)
   * Endpoint: GET /exams/{exam_id}/variants
   * Returns: { items: [ ... ] }
   */
  async getAll(examId) {
    if (!examId) throw new Error("examId шаардлагатай байна");
    const result = await fetchData(
      `${BASE_URL}/exams/${examId}/variants`,
      "GET"
    );
    return result?.items || [];
  },

  /**
   * 🧠 Вариантын асуултуудыг авах
   * Endpoint: GET /variants/{variant_id}/questions
   * Returns: { items: [ ... ] }
   */
  async getQuestions(variantId) {
    if (!variantId) throw new Error("variantId шаардлагатай байна");
    const result = await fetchData(
      `${BASE_URL}/variants/${variantId}/questions`,
      "GET"
    );
    return result?.items || [];
  },

  /**
   * 🧾 Нэг шалгалтын мэдээлэл авах
   * Endpoint: GET /exams/{exam_id}
   */
  async getExam(examId) {
    if (!examId) throw new Error("examId шаардлагатай байна");
    return await fetchData(`${BASE_URL}/exams/${examId}`, "GET");
  },

  /**
   * 🧩 Нэг вариантийн ID-аар бүх мэдээлэл (exam + questions) авах
   * Combines both getExam + getQuestions
   */
  async getFullVariantData(examId, variantId) {
    if (!examId || !variantId)
      throw new Error("examId болон variantId шаардлагатай байна");

    const [exam, questions] = await Promise.all([
      this.getExam(examId),
      this.getQuestions(variantId),
    ]);

    return { exam, questions };
  },
};
