export const getRandomQuestions = () => {
  // Тодорхой бүтэцтэй 7 асуулт сонгох:
  // 1 олон зөв хариулттай + 1 зураг бүхий + 1 нөхөх + 1 текст + 3 энгийн олон сонголт

  const multipleCorrectQuestions = [17]; // олон зөв хариулттай
  const imageQuestion = [42]; // 1 зураг бүхий (multiple_choice with image)
  const fillBlankQuestions = [16]; // 3 нөхөх асуулт
  const textQuestion = [47]; // 1 текст хариулт
  // Зөвхөн энгийн multiple_choice асуултууд (зураггүй, fill_blank биш)
  const multipleChoiceQuestions = [
    14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
    34, 35, 36, 37, 38, 39, 40, 41,
  ]; // энгийн олон сонголт

  // Олон зөв хариулттайгаас 1-ийг санамсаргүй сонгох
  const selectedMultipleCorrect = multipleCorrectQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 1);

  // Зураг бүхий асуулт (заавал)
  const selectedImage = imageQuestion;

  // Нөхөх асуултаас 1-ийг санамсаргүй сонгох
  const selectedFillBlank = fillBlankQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  // Текст хариулт (заавал)
  const selectedText = textQuestion;

  // Энгийн олон сонголтоос 3-ыг санамсаргүй сонгох
  const selectedMultipleChoice = multipleChoiceQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  // Бүх асуултуудыг нэгтгээд холих
  const allSelected = [
    ...selectedMultipleCorrect,
    ...selectedImage,
    ...selectedFillBlank,
    ...selectedText,
    ...selectedMultipleChoice,
  ].sort(() => 0.5 - Math.random()); // Эцсийн дарааллыг холих

  return allSelected;
};

// Categories (Хичээлийн ангилал)
export const mockCategories = [
  { id: 1, name: "Математик", description: "Математикийн хичээлүүд" },
  { id: 2, name: "Физик", description: "Физикийн хичээлүүд" },
  {
    id: 3,
    name: "Компьютер шинжлэх ухаан",
    description: "Програм хангамж, систем шинжилгээ",
  },
  { id: 4, name: "Инженер", description: "Инженерийн хичээлүүд" },
];

// Subjects
export const mockCourses = [
  {
    id: 1,
    categoryId: 3,
    name: "Компьютерын архитектур",
    code: "F.CS301",
    description: "CPU, RAM, ROM, санах ойн бүтэц",
  },
  {
    id: 2,
    categoryId: 1,
    name: "Математик I",
    code: "MATH101",
    description: "Дифференциал тооцоолол",
  },
  {
    id: 3,
    categoryId: 2,
    name: "Физик I",
    code: "PHYS101",
    description: "Механик, хөдөлгөөн",
  },
];

export const mockTopics = [
  {
    id: 13,
    courseId: 1,
    name: "Үндсэн санах ой (RAM)",
    description: "DRAM, SRAM, SDRAM",
  },
  {
    id: 14,
    courseId: 1,
    name: "ROM санах ой",
    description: "MASK ROM, PROM, EPROM, EEPROM",
  },
  {
    id: 15,
    courseId: 1,
    name: "CPU ба RAM урсгал",
    description: "Data flow, Control flow",
  },
  {
    id: 16,
    courseId: 1,
    name: "Санах ойн хаяглалт",
    description: "Хаяглалтын аргууд",
  },
];

export const mockExams = [
  {
    id: 1,
    courseId: 1,
    title: "Үйлдлийн систем шалгалт",
    description: "RAM, ROM, CPU, санах ойн хаяглалт",
    startDate: "2025-02-15T09:00:00",
    endDate: "2025-02-15T11:00:00",
    duration: 10,
    totalMarks: 35,
    passingMarks: 20,
    status: "active",
    createdBy: "Багш А",
    createdAt: "2025-02-01T10:00:00",
    selectedTopics: [
      { topicId: 13, questionCount: 2 }, // RAM - 2 асуулт
      { topicId: 14, questionCount: 2 }, // ROM - 2 асуулт
      { topicId: 15, questionCount: 2 }, // CPU - 2 асуулт
      { topicId: 16, questionCount: 1 }, // Memory addressing - 1 асуулт
    ],
    totalQuestions: 7,
  },
];

export const mockVariants = [
  {
    id: 1,
    examId: 1,
    name: "Вариант A",
    description: "Үйлдлийн систем 7 асуулт",
    // Санамсаргүй сонгогдсон асуултуудын ID-ууд
    questionIds: [42, 14, 18, 22, 28, 35, 39], // RAM, ROM, CPU, Addressing холимог
    totalQuestions: 7,
    createdAt: "2025-02-01T10:00:00",
  },
  {
    id: 2,
    examId: 1,
    name: "Вариант B",
    description: "Үйлдлийн систем санамсаргүй 7 асуулт",
    questionIds: [15, 20, 24, 27, 33, 36, 41, 42], // Өөр 7 асуулт
    totalQuestions: 7,
    createdAt: "2025-02-01T10:00:00",
  },
  {
    id: 3,
    examId: 1,
    name: "Вариант C",
    description: "Үйлдлийн систем санамсаргүй 7 асуулт",
    questionIds: [17, 19, 23, 29, 32, 37, 40, 42], // Дахиад өөр 7 асуулт
    totalQuestions: 7,
    createdAt: "2025-02-01T10:00:00",
  },
];

// Question Bank (Асуултын банк) - Олон төрлийн асуултууд
export const mockQuestionBank = [
  // ============================================
  // Компьютерын архитектур - Үндсэн санах ой (RAM)
  // ============================================

  // 1. DRAM төрөл
  {
    id: 14,
    courseId: 1,
    topicId: 13,
    question: "DRAM ямар төрлийн санах ой вэ?",
    type: "multiple_choice",
    options: [
      "Тогтмол сэргээх шаардлагатай.",
      "Сэргээх шаардлагагүй",
      "ROM төрөл",
      "Flash санах ой",
    ],
    correctAnswers: ["Тогтмол сэргээх шаардлагатай."],
    marks: 5,
    difficulty: "easy",
    tags: ["DRAM", "RAM"],
  },

  // 2. Fill in the blank (ганц үгтэй)
  {
    id: 15,
    courseId: 1,
    topicId: 13,
    question: "SRAM нь ______ шаардлагагүй санах ой юм.",
    type: "fill_blank",
    correctAnswers: ["сэргээх."],
    acceptableAnswers: ["refresh", "сэргээлт"],
    marks: 5,
    difficulty: "easy",
    tags: ["SRAM", "RAM"],
  },

  // 3. Text answer
  {
    id: 16,
    courseId: 1,
    topicId: 13,
    question:
      "___ нь системийн үндсэн шинжлэх (bus) цагтай уялдаж, өгөгдөл унших, бичих үйлдлийг яг цагийн дохионд нийцүүлэн хийдэг. Энэ нь хурд, тогтвортой ажиллагааг сайжруулдаг.",
    type: "text_answer",
    correctAnswers: ["SDRAM"],
    acceptableAnswers: ["Synchronous DRAM", "synchronous dram"],
    marks: 5,
    difficulty: "medium",
    tags: ["SDRAM", "RAM"],
  },

  // 4. Multiple correct
  {
    id: 17,
    courseId: 1,
    topicId: 13,
    question: "SDRAM нь DRAM-аас ямар онцлогтой вэ? (Олон хариулт сонгоно уу)",
    type: "multiple_correct",
    options: [
      "Илүү хурдан ажилладаг.",
      "Илүү удаан ажилладаг",
      "CPU-ийн цагтай синхрон.",
      "Илүү их сэргээлт шаардлагатай",
    ],
    correctAnswers: ["Илүү хурдан ажилладаг.", "CPU-ийн цагтай синхрон."],
    marks: 5,
    difficulty: "medium",
    tags: ["SDRAM", "DRAM"],
  },

  // 5. SRAM ашиглалт
  {
    id: 18,
    courseId: 5,
    topicId: 13,
    question: "SRAM ихэвчлэн хаана ашиглагддаг вэ?",
    type: "multiple_choice",
    options: ["Хатуу диск", "Кэш санах ой.", "Тогтмол санах ой", "Flash диск"],
    correctAnswers: ["Кэш санах ой."],
    marks: 5,
    difficulty: "easy",
    tags: ["SRAM", "кэш", "ашиглалт"],
  },

  // 6. RAM төрөл
  {
    id: 19,
    courseId: 5,
    topicId: 13,
    question: "RAM нь ямар төрлийн санах ой вэ?",
    type: "multiple_choice",
    options: ["Байнгын", "Түр зуурын.", "Програм хангамж", "Input төхөөрөмж"],
    correctAnswers: ["Түр зуурын."],
    marks: 5,
    difficulty: "easy",
    tags: ["RAM", "түр санах ой"],
  },

  // 7. SDRAM vs DRAM
  {
    id: 20,
    courseId: 5,
    topicId: 13,
    question: "SDRAM нь DRAM-аас юугаараа ялгаатай вэ?",
    type: "multiple_choice",
    options: [
      "Илүү хурдан.",
      "Илүү удаан",
      "Илүү хямд",
      "Илүү их сэргээх шаардлагатай",
    ],
    correctAnswers: ["Илүү хурдан."],
    marks: 5,
    difficulty: "medium",
    tags: ["SDRAM", "DRAM", "харьцуулалт"],
  },

  // ============================================
  // Компьютерын архитектур - ROM санах ой
  // ============================================

  // 8. MASK ROM
  {
    id: 21,
    courseId: 5,
    topicId: 14,
    question: "MASK ROM ямар онцлогтой вэ?",
    type: "multiple_choice",
    options: [
      "Хэрэглэгч бичдэг",
      "Үйлдвэрт бичигддэг.",
      "Цахилгаанаар арилдаг",
      "RAM-той адил",
    ],
    correctAnswers: ["Үйлдвэрт бичигддэг."],
    marks: 5,
    difficulty: "easy",
    tags: ["MASK ROM", "ROM"],
  },

  // 9. PROM удаа
  {
    id: 22,
    courseId: 5,
    topicId: 14,
    question: "PROM-д хэдэн удаа мэдээлэл бичиж болдог вэ?",
    type: "multiple_choice",
    options: ["Хязгааргүй", "Нэг удаа.", "Хоёр удаа", "10 удаа"],
    correctAnswers: ["Нэг удаа."],
    marks: 5,
    difficulty: "easy",
    tags: ["PROM", "ROM", "бичих"],
  },

  // 10. EPROM арилгах
  {
    id: 23,
    courseId: 5,
    topicId: 14,
    question: "EPROM дахин бичихийн тулд яаж арилгах вэ?",
    type: "multiple_choice",
    options: [
      "Цахилгаанаар",
      "Хэт ягаан туяагаар.",
      "Дулаанаар",
      "Гараар устгах",
    ],
    correctAnswers: ["Хэт ягаан туяагаар."],
    marks: 5,
    difficulty: "medium",
    tags: ["EPROM", "UV", "арилгах"],
  },

  // 11. EEPROM арилгах
  {
    id: 24,
    courseId: 5,
    topicId: 14,
    question: "EEPROM ямар аргаар арилгаж бичдэг вэ?",
    type: "multiple_choice",
    options: ["Цахилгаанаар.", "Лазераар", "Механикаар", "Гараар"],
    correctAnswers: ["Цахилгаанаар."],
    marks: 5,
    difficulty: "easy",
    tags: ["EEPROM", "цахилгаан", "арилгах"],
  },

  // 12. ROM зорилго
  {
    id: 25,
    courseId: 5,
    topicId: 14,
    question: "ROM-ийн үндсэн зорилго юу вэ?",
    type: "multiple_choice",
    options: [
      "Түр өгөгдөл хадгалах",
      "Байнгын өгөгдөл хадгалах.",
      "CPU ажиллагааг зогсоох",
      "Програм устгах",
    ],
    correctAnswers: ["Байнгын өгөгдөл хадгалах."],
    marks: 5,
    difficulty: "easy",
    tags: ["ROM", "зорилго"],
  },

  // 13. BIOS ROM
  {
    id: 26,
    courseId: 5,
    topicId: 14,
    question: "BIOS ихэвчлэн ямар ROM төрөлд хадгалагддаг вэ?",
    type: "multiple_choice",
    options: ["DRAM", "EEPROM.", "PROM", "SDRAM"],
    correctAnswers: ["EEPROM."],
    marks: 5,
    difficulty: "medium",
    tags: ["BIOS", "EEPROM", "ROM"],
  },

  // 14. PROM товчлол
  {
    id: 27,
    courseId: 5,
    topicId: 14,
    question: "PROM гэдэг үгийн бүрэн хэлбэр юу вэ?",
    type: "multiple_choice",
    options: [
      "Permanent RAM",
      "Programmable ROM.",
      "Processed ROM",
      "Parallel RAM",
    ],
    correctAnswers: ["Programmable ROM."],
    marks: 5,
    difficulty: "easy",
    tags: ["PROM", "товчлол"],
  },

  // 15. CPU-RAM урсгал
  {
    id: 28,
    courseId: 5,
    topicId: 15,
    question: "CPU ба RAM хооронд ямар 2 төрлийн урсгал явагддаг вэ?",
    type: "multiple_choice",
    options: [
      "Command, data",
      "Control, data.",
      "Input, output",
      "Power, signal",
    ],
    correctAnswers: ["Control, data."],
    marks: 5,
    difficulty: "medium",
    tags: ["CPU", "RAM", "урсгал"],
  },

  // 16. Data flow
  {
    id: 29,
    courseId: 5,
    topicId: 15,
    question: "Data flow гэж юу вэ?",
    type: "multiple_choice",
    options: [
      "CPU-аас RAM руу өгөгдөл дамжих.",
      "RAM-аас CPU руу хяналт дамжих",
      "Keyboard → CPU урсгал",
      "Screen → RAM урсгал",
    ],
    correctAnswers: ["CPU-аас RAM руу өгөгдөл дамжих."],
    marks: 5,
    difficulty: "easy",
    tags: ["data flow", "өгөгдөл"],
  },

  // 17. Control flow
  {
    id: 30,
    courseId: 5,
    topicId: 15,
    question: "Control flow гэж юу вэ?",
    type: "multiple_choice",
    options: [
      "Өгөгдөл солилцох",
      "CPU-ийн удирдлага, команд дамжих урсгал.",
      "Хяналтгүй өгөгдөл урсгал",
      "Keyboard дохио",
    ],
    correctAnswers: ["CPU-ийн удирдлага, команд дамжих урсгал."],
    marks: 5,
    difficulty: "medium",
    tags: ["control flow", "хяналт"],
  },

  // 18. ALU үүрэг
  {
    id: 31,
    courseId: 5,
    topicId: 15,
    question: "ALU-ийн үндсэн үүрэг юу вэ?",
    type: "multiple_choice",
    options: [
      "Хяналт",
      "Тооцоолол ба логик үйлдэл.",
      "Өгөгдөл хадгалах",
      "Оролт авах",
    ],
    correctAnswers: ["Тооцоолол ба логик үйлдэл."],
    marks: 5,
    difficulty: "easy",
    tags: ["ALU", "тооцоолол"],
  },

  // 19. Control Unit
  {
    id: 32,
    courseId: 5,
    topicId: 15,
    question: "Control Unit ямар үүрэгтэй вэ?",
    type: "multiple_choice",
    options: [
      "Тооцоолол хийх",
      "Команд удирдах.",
      "Дэлгэцийн өгөгдөл хадгалах",
      "Кэшийн хурдыг тохируулах",
    ],
    correctAnswers: ["Команд удирдах."],
    marks: 5,
    difficulty: "easy",
    tags: ["Control Unit", "удирдлага"],
  },

  // 20. Үндсэн санах ой үүрэг
  {
    id: 33,
    courseId: 5,
    topicId: 15,
    question: "Үндсэн санах ой ямар үүрэгтэй вэ?",
    type: "multiple_choice",
    options: [
      "Програм болон өгөгдөл түр хадгалах.",
      "Байнгын хадгалалт",
      "CPU хяналт",
      "Дэлгэцийн дүрс гаргах",
    ],
    correctAnswers: ["Програм болон өгөгдөл түр хадгалах."],
    marks: 5,
    difficulty: "easy",
    tags: ["RAM", "үүрэг"],
  },

  // 21. Bus холбоо
  {
    id: 34,
    courseId: 5,
    topicId: 15,
    question: "CPU ба RAM-ийн холбоо ямар шугамаар дамждаг вэ?",
    type: "multiple_choice",
    options: [
      "Data bus, address bus, control bus.",
      "Cable bus",
      "Network bus",
      "Sound bus",
    ],
    correctAnswers: ["Data bus, address bus, control bus."],
    marks: 5,
    difficulty: "medium",
    tags: ["bus", "холбоо"],
  },

  // ============================================
  // Компьютерын архитектур - Санах ойн хаяглалт
  // ============================================

  // 22. Түргэн хаяглалт
  {
    id: 35,
    courseId: 5,
    topicId: 16,
    question: "Түргэн хаяглалтын аргад өгөгдөл хаана байрладаг вэ?",
    type: "multiple_choice",
    options: ["Команд дотор.", "RAM дотор", "Регистр дотор", "Шууд бус хаягт"],
    correctAnswers: ["Команд дотор."],
    marks: 5,
    difficulty: "medium",
    tags: ["түргэн хаяглалт", "immediate"],
  },

  {
    id: 36,
    courseId: 5,
    topicId: 16,
    question: "Шууд хаяглалтын аргад санах ойн хаяг нь хаана байдаг вэ?",
    type: "multiple_choice",
    options: [
      "Регистрийн дугаарт",
      "Зааврын хаягт.",
      "Програмын тоолуурт",
      "ALU дотор",
    ],
    correctAnswers: ["Зааврын хаягт."],
    marks: 5,
    difficulty: "easy",
    tags: ["шууд хаяглалт", "direct"],
  },

  // 24. Индексэн хаяглалт
  {
    id: 37,
    courseId: 5,
    topicId: 16,
    question: "Индексэн хаяглалтын бодит хаяг хэрхэн тодорхойлогддог вэ?",
    type: "multiple_choice",
    options: [
      "Суурь хаяг + индексийн утгаар.",
      "Програмын тоолуур + хаягаар",
      "Шууд командын дотор",
      "RAM-ийн эхний байрлалаар",
    ],
    correctAnswers: ["Суурь хаяг + индексийн утгаар."],
    marks: 5,
    difficulty: "medium",
    tags: ["индексэн хаяглалт", "indexed"],
  },

  // 25. Регистрэн хаяглалт
  {
    id: 38,
    courseId: 5,
    topicId: 16,
    question: "Регистрэн хаяглалтын өгөгдөл хаана хадгалагддаг вэ?",
    type: "multiple_choice",
    options: [
      "CPU-ийн регистр дотор.",
      "Санах ойд",
      "Туслах дискэнд",
      "BIOS дотор",
    ],
    correctAnswers: ["CPU-ийн регистр дотор."],
    marks: 5,
    difficulty: "easy",
    tags: ["регистрэн хаяглалт", "register"],
  },

  // 26. Үндсэн хаяглалт
  {
    id: 39,
    courseId: 5,
    topicId: 16,
    question: "Үндсэн хаяглалтын арга ямар регистр ашигладаг вэ?",
    type: "multiple_choice",
    options: ["Индекс", "Суурь регистр.", "PC", "ALU"],
    correctAnswers: ["Суурь регистр."],
    marks: 5,
    difficulty: "medium",
    tags: ["үндсэн хаяглалт", "base"],
  },

  // 27. Харьцангуй хаяглалт
  {
    id: 40,
    courseId: 5,
    topicId: 16,
    question: "Харьцангуй хаяглалтын арга ямар регистртэй харьцуулдаг вэ?",
    type: "multiple_choice",
    options: ["ALU", "Суурь", "Програмын тоолуур.", "Кэш"],
    correctAnswers: ["Програмын тоолуур."],
    marks: 5,
    difficulty: "medium",
    tags: ["харьцангуй хаяглалт", "relative"],
  },

  // 28. Шууд бус хаяглалт
  {
    id: 41,
    courseId: 5,
    topicId: 16,
    question: "Шууд бус хаяглалтын бодит хаяг хаана хадгалагддаг вэ?",
    type: "multiple_choice",
    options: ["Санах ойд.", "CPU дотор", "Регистрийн дотор", "Команд дотор"],
    correctAnswers: ["Санах ойд."],
    marks: 5,
    difficulty: "hard",
    tags: ["шууд бус хаяглалт", "indirect"],
  },
  // 29. Зураг бүхий олон сонголттой
  {
    id: 42,
    courseId: 1,
    topicId: 16,
    question:
      "Зурганд харуулсан компьютерын бүрэлдэхүүн хэсгүүдээс аль нь санах ой вэ?",
    image: "/src/team6/data/test1.png",
    type: "multiple_choice",
    options: ["A", "B", "C"],
    correctAnswers: ["A"],
    marks: 5,
    difficulty: "medium",
    tags: ["санах ой", "зураг", "architecture"],
  },
];

export const mockStudentExams = [
  {
    id: 1,
    examId: 1,
    studentId: 1,
    studentName: "Б.Болд",
    variantId: 1, // Санамсаргүй 7 асуулттай вариант
    status: "not_started",
    startTime: null,
    endTime: null,
    score: null,
    answers: [],
  },
];

export const mockExamStats = {
  1: {
    examId: 1,
    totalStudents: 30,
    completedStudents: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    passRate: 0,
  },
};
