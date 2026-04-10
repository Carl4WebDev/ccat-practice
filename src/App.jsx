import { useEffect, useMemo, useRef, useState } from "react";
import VisualMatrixQuestion from "./components/VisualMatrixQuestion";
import VisualChoices from "./components/VisualChoices";
const EXAM_TIME = 15 * 60;

const questionBank = [
  // EASY — VERBAL REASONING
  {
    id: 1,
    difficulty: "easy",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most similar in meaning to "brief".',
    choices: ["Short", "Slow", "Heavy", "Sharp"],
    answer: "Short",
  },
  {
    id: 2,
    difficulty: "easy",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most opposite in meaning to "expand".',
    choices: ["Grow", "Increase", "Contract", "Stretch"],
    answer: "Contract",
  },
  {
    id: 3,
    difficulty: "easy",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most similar in meaning to "happy".',
    choices: ["Sad", "Glad", "Weak", "Hard"],
    answer: "Glad",
  },
  {
    id: 4,
    difficulty: "easy",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most opposite in meaning to "early".',
    choices: ["Fast", "Late", "Soon", "Near"],
    answer: "Late",
  },
  {
    id: 5,
    difficulty: "easy",
    category: "Verbal Reasoning",
    question: 'Select the word that best completes the sentence: "The room was very ___."',
    choices: ["quiet", "run", "jump", "drive"],
    answer: "quiet",
  },
  {
    id: 6,
    difficulty: "easy",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most similar in meaning to "begin".',
    choices: ["Start", "Finish", "Break", "Forget"],
    answer: "Start",
  },

  // EASY — NUMERICAL REASONING
  {
    id: 7,
    difficulty: "easy",
    category: "Numerical Reasoning",
    question: "What is 5 + 7?",
    choices: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    id: 8,
    difficulty: "easy",
    category: "Numerical Reasoning",
    question: "What is 15 - 6?",
    choices: ["7", "8", "9", "10"],
    answer: "9",
  },
  {
    id: 9,
    difficulty: "easy",
    category: "Numerical Reasoning",
    question: "What is 4 × 3?",
    choices: ["7", "12", "14", "16"],
    answer: "12",
  },
  {
    id: 10,
    difficulty: "easy",
    category: "Numerical Reasoning",
    question: "What is 20 ÷ 4?",
    choices: ["4", "5", "6", "8"],
    answer: "5",
  },
  {
    id: 11,
    difficulty: "easy",
    category: "Numerical Reasoning",
    question: "What number comes next in the sequence: 2, 4, 6, 8, ?",
    choices: ["9", "10", "11", "12"],
    answer: "10",
  },
  {
    id: 12,
    difficulty: "easy",
    category: "Numerical Reasoning",
    question: "A pen costs 10 pesos. How much do 3 pens cost?",
    choices: ["20 pesos", "25 pesos", "30 pesos", "35 pesos"],
    answer: "30 pesos",
  },

  // EASY — ABSTRACT REASONING
  {
    id: 13,
    difficulty: "easy",
    category: "Abstract Reasoning",
    question: "What number comes next in the pattern: 1, 2, 3, 4, ?",
    choices: ["5", "6", "7", "8"],
    answer: "5",
  },
  {
    id: 14,
    difficulty: "easy",
    category: "Abstract Reasoning",
    question: "Which one does not belong? Circle, Square, Triangle, Banana",
    choices: ["Circle", "Square", "Triangle", "Banana"],
    answer: "Banana",
  },
  {
    id: 15,
    difficulty: "easy",
    category: "Abstract Reasoning",
    question: "If all cats are animals, then cats are definitely:",
    choices: ["Plants", "Animals", "Cars", "Tables"],
    answer: "Animals",
  },
  {
    id: 16,
    difficulty: "easy",
    category: "Abstract Reasoning",
    question: "What comes next in the series: A, B, C, ?",
    choices: ["D", "E", "F", "G"],
    answer: "D",
  },
  {
    id: 17,
    difficulty: "easy",
    category: "Abstract Reasoning",
    question: "Which one does not belong? Dog, Cat, Bird, Chair",
    choices: ["Dog", "Cat", "Bird", "Chair"],
    answer: "Chair",
  },
  {
    id: 18,
    difficulty: "easy",
    category: "Abstract Reasoning",
    question: "If red comes before blue, which color is first?",
    choices: ["Blue", "Red", "Green", "Yellow"],
    answer: "Red",
  },

  // HARD — VERBAL REASONING
  {
    id: 19,
    difficulty: "hard",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most similar in meaning to "reluctant".',
    choices: ["Willing", "Hesitant", "Cheerful", "Certain"],
    answer: "Hesitant",
  },
  {
    id: 20,
    difficulty: "hard",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most opposite in meaning to "scarce".',
    choices: ["Rare", "Limited", "Abundant", "Missing"],
    answer: "Abundant",
  },
  {
    id: 21,
    difficulty: "hard",
    category: "Verbal Reasoning",
    question: 'Select the word that best completes the sentence: "His explanation was so ___ that even beginners understood it."',
    choices: ["obscure", "clear", "careless", "fragile"],
    answer: "clear",
  },
  {
    id: 22,
    difficulty: "hard",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most similar in meaning to "diminish".',
    choices: ["Increase", "Reduce", "Celebrate", "Create"],
    answer: "Reduce",
  },
  {
    id: 23,
    difficulty: "hard",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most opposite in meaning to "transparent".',
    choices: ["Clear", "Visible", "Opaque", "Bright"],
    answer: "Opaque",
  },
  {
    id: 24,
    difficulty: "hard",
    category: "Verbal Reasoning",
    question: 'Select the word that best completes the sentence: "The manager wanted a ___ report, free from unnecessary details."',
    choices: ["lengthy", "concise", "confusing", "careless"],
    answer: "concise",
  },

  // HARD — NUMERICAL REASONING
  {
    id: 25,
    difficulty: "hard",
    category: "Numerical Reasoning",
    question: "What is 15% of 240?",
    choices: ["24", "30", "36", "42"],
    answer: "36",
  },
  {
    id: 26,
    difficulty: "hard",
    category: "Numerical Reasoning",
    question: "A shirt originally costs 800 pesos and is discounted by 25%. What is the sale price?",
    choices: ["500 pesos", "550 pesos", "600 pesos", "650 pesos"],
    answer: "600 pesos",
  },
  {
    id: 27,
    difficulty: "hard",
    category: "Numerical Reasoning",
    question: "What number comes next in the sequence: 3, 6, 12, 24, ?",
    choices: ["30", "36", "48", "60"],
    answer: "48",
  },
  {
    id: 28,
    difficulty: "hard",
    category: "Numerical Reasoning",
    question: "If 5 machines make 5 parts in 5 minutes, how many parts can 100 machines make in 5 minutes?",
    choices: ["20", "25", "100", "500"],
    answer: "100",
  },
  {
    id: 29,
    difficulty: "hard",
    category: "Numerical Reasoning",
    question: "A car travels 180 kilometers in 3 hours. What is its average speed?",
    choices: ["50 km/h", "60 km/h", "70 km/h", "90 km/h"],
    answer: "60 km/h",
  },
  {
    id: 30,
    difficulty: "hard",
    category: "Numerical Reasoning",
    question: "If a product costs 120 pesos after a 20% discount, what was the original price?",
    choices: ["140 pesos", "150 pesos", "160 pesos", "170 pesos"],
    answer: "150 pesos",
  },

  // HARD — ABSTRACT REASONING
  {
    id: 31,
    difficulty: "hard",
    category: "Abstract Reasoning",
    question: "What number comes next in the sequence: 2, 4, 8, 16, ?",
    choices: ["18", "24", "32", "64"],
    answer: "32",
  },
  {
    id: 32,
    difficulty: "hard",
    category: "Abstract Reasoning",
    question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely:",
    choices: ["Bloops", "Lazzies", "Not Razzies", "None of the above"],
    answer: "Lazzies",
  },
  {
    id: 33,
    difficulty: "hard",
    category: "Abstract Reasoning",
    question: "Which number does not belong? 2, 4, 6, 9, 8",
    choices: ["2", "4", "6", "9"],
    answer: "9",
  },
  {
    id: 34,
    difficulty: "hard",
    category: "Abstract Reasoning",
    question: "What comes next in the sequence: Z, X, V, T, ?",
    choices: ["R", "S", "Q", "P"],
    answer: "R",
  },
  {
    id: 35,
    difficulty: "hard",
    category: "Abstract Reasoning",
    question: "If some books are red and all red things are heavy, which statement must be true?",
    choices: ["All books are heavy", "Some books are heavy", "No books are heavy", "All heavy things are books"],
    answer: "Some books are heavy",
  },
  {
    id: 36,
    difficulty: "hard",
    category: "Abstract Reasoning",
    question: "What number comes next in the sequence: 1, 4, 9, 16, ?",
    choices: ["20", "25", "36", "49"],
    answer: "25",
  },

  // EXTREME — VERBAL REASONING
  {
    id: 37,
    difficulty: "extreme",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most similar in meaning to "candid".',
    choices: ["Frank", "Careful", "Shy", "Proud"],
    answer: "Frank",
  },
  {
    id: 38,
    difficulty: "extreme",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most opposite in meaning to "rigid".',
    choices: ["Stiff", "Flexible", "Harsh", "Solid"],
    answer: "Flexible",
  },
  {
    id: 39,
    difficulty: "extreme",
    category: "Verbal Reasoning",
    question: 'Select the word that best completes the sentence: "Because the instructions were ___, several workers made different assumptions."',
    choices: ["precise", "ambiguous", "brief", "logical"],
    answer: "ambiguous",
  },
  {
    id: 40,
    difficulty: "extreme",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most similar in meaning to "elated".',
    choices: ["Exhausted", "Delighted", "Confused", "Concerned"],
    answer: "Delighted",
  },
  {
    id: 41,
    difficulty: "extreme",
    category: "Verbal Reasoning",
    question: 'Choose the word that is most opposite in meaning to "frugal".',
    choices: ["Careful", "Wasteful", "Quiet", "Simple"],
    answer: "Wasteful",
  },
  {
    id: 42,
    difficulty: "extreme",
    category: "Verbal Reasoning",
    question: 'Select the word that best completes the sentence: "The speaker gave a ___ response, avoiding the actual issue."',
    choices: ["direct", "candid", "evasive", "brief"],
    answer: "evasive",
  },

  // EXTREME — NUMERICAL REASONING
  {
    id: 43,
    difficulty: "extreme",
    category: "Numerical Reasoning",
    question: "A store increases the price of an item by 20% and then discounts the new price by 20%. Compared with the original price, the final price is:",
    choices: ["4% lower", "The same", "4% higher", "8% lower"],
    answer: "4% lower",
  },
  {
    id: 44,
    difficulty: "extreme",
    category: "Numerical Reasoning",
    question: "If 8 workers can complete a job in 15 days, how many days would it take 12 workers to complete the same job, assuming equal productivity?",
    choices: ["8", "10", "12", "14"],
    answer: "10",
  },
  {
    id: 45,
    difficulty: "extreme",
    category: "Numerical Reasoning",
    question: "What number comes next in the series: 5, 11, 23, 47, ?",
    choices: ["71", "81", "95", "99"],
    answer: "95",
  },
  {
    id: 46,
    difficulty: "extreme",
    category: "Numerical Reasoning",
    question: "A boat travels 36 kilometers downstream in 3 hours and returns upstream in 4.5 hours. What is the boat's average speed in still water?",
    choices: ["9 km/h", "10 km/h", "11 km/h", "12 km/h"],
    answer: "10 km/h",
  },
  {
    id: 47,
    difficulty: "extreme",
    category: "Numerical Reasoning",
    question: "A number is increased by 40% and then reduced by 25%. The final result is 210. What was the original number?",
    choices: ["180", "190", "200", "220"],
    answer: "200",
  },
  {
    id: 48,
    difficulty: "extreme",
    category: "Numerical Reasoning",
    question: "Three consecutive integers have a sum of 72. What is the largest integer?",
    choices: ["23", "24", "25", "26"],
    answer: "25",
  },

  // EXTREME — ABSTRACT REASONING
  {
    id: 49,
    difficulty: "extreme",
    category: "Abstract Reasoning",
    question: "What number comes next in the sequence: 3, 9, 27, 81, ?",
    choices: ["108", "162", "243", "324"],
    answer: "243",
  },
  {
    id: 50,
    difficulty: "extreme",
    category: "Abstract Reasoning",
    question: "If all Nops are Lats, and no Lats are Fens, which statement must be true?",
    choices: ["No Nops are Fens", "All Fens are Nops", "Some Lats are Fens", "All Nops are Fens"],
    answer: "No Nops are Fens",
  },
  {
    id: 51,
    difficulty: "extreme",
    category: "Abstract Reasoning",
    question: "Which item does not belong? ACE, BDF, CEG, DFH, EGI",
    choices: ["ACE", "BDF", "DFH", "EGI"],
    answer: "EGI",
  },
  {
    id: 52,
    difficulty: "extreme",
    category: "Abstract Reasoning",
    question: "What comes next in the pattern: 1A, 2C, 3E, 4G, ?",
    choices: ["5H", "5I", "6I", "6J"],
    answer: "5I",
  },
  {
    id: 53,
    difficulty: "extreme",
    category: "Abstract Reasoning",
    question: "If every Zim is either a Wex or a Tov, and no Wex is a Tov, which statement must be true?",
    choices: ["Every Zim is both a Wex and a Tov", "No Zim is a Wex", "No Wex is a Tov", "Every Tov is a Zim"],
    answer: "No Wex is a Tov",
  },
  {
    id: 54,
    difficulty: "extreme",
    category: "Abstract Reasoning",
    question: "What number comes next in the sequence: 2, 6, 12, 20, 30, ?",
    choices: ["36", "40", "42", "44"],
    answer: "42",
  },
  {
  id: 1001,
  difficulty: "visual",
  category: "Visual Abstract",
  type: "matrix-arc",
  prompt: "Choose the figure that completes the pattern.",
  grid: [
    "bottomRight", "bottomLeft", "topLeft",
    "topRight", "bottomRight", "bottomLeft",
    "topLeft", "topRight", null
  ],
  choices: [
    { label: "A", corner: "topLeft" },
    { label: "B", corner: "bottomRight" },
    { label: "C", corner: "topRight" },
    { label: "D", corner: "bottomLeft" },
    { label: "E", corner: "bottomRight" }
  ],
  answer: 3
}
];

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);

  const timerRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!started || finished) return undefined;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started, finished]);

  const result = useMemo(() => {
    const attempted = questions.filter((q) => answers[q.id]).length;
    const correct = questions.filter((q) => answers[q.id] === q.answer).length;
    const wrong = questions.filter((q) => answers[q.id] && answers[q.id] !== q.answer).length;
    const skipped = questions.length - attempted;

    const verbalTotal = questions.filter((q) => q.category === "Verbal Reasoning");
    const numericalTotal = questions.filter((q) => q.category === "Numerical Reasoning");
    const abstractTotal = questions.filter((q) => q.category === "Abstract Reasoning");

    const verbalCorrect = verbalTotal.filter((q) => answers[q.id] === q.answer).length;
    const numericalCorrect = numericalTotal.filter((q) => answers[q.id] === q.answer).length;
    const abstractCorrect = abstractTotal.filter((q) => answers[q.id] === q.answer).length;

    return {
      attempted,
      correct,
      wrong,
      skipped,
      verbalCorrect,
      numericalCorrect,
      abstractCorrect,
      verbalCount: verbalTotal.length,
      numericalCount: numericalTotal.length,
      abstractCount: abstractTotal.length,
    };
  }, [answers, questions]);

  const startTest = (difficulty) => {
    const filteredQuestions = questionBank.filter((q) => q.difficulty === difficulty);
    setSelectedDifficulty(difficulty);
    setQuestions(shuffleArray(filteredQuestions));
    setCurrentIndex(0);
    setAnswers({});
    setFlagged({});
    setTimeLeft(EXAM_TIME);
    setFinished(false);
    setStarted(true);
  };

  const submitTest = () => {
    clearInterval(timerRef.current);
    setFinished(true);
  };

  const restartTest = () => {
    clearInterval(timerRef.current);
    setStarted(false);
    setFinished(false);
    setSelectedDifficulty("easy");
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setFlagged({});
    setTimeLeft(EXAM_TIME);
  };

  const handleAnswer = (choice) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: choice,
    }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

if (!started) {
  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold">Cognitive Aptitude Practice</h1>
          <p className="text-slate-300 mt-4 leading-7">
            Practice verbal reasoning, numerical reasoning, and abstract reasoning in a timed test environment designed to feel closer to fast multiple-choice aptitude screening.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-800/60 p-4 rounded-2xl">
              <p className="text-sm text-slate-400">Time</p>
              <p className="text-2xl font-semibold">15:00</p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl">
              <p className="text-sm text-slate-400">Difficulties</p>
              <p className="text-2xl font-semibold">Easy / Hard / Extreme</p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl">
              <p className="text-sm text-slate-400">Question Types</p>
              <p className="text-lg font-semibold">Verbal / Numerical / Abstract</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
              <h2 className="text-2xl font-semibold">Easy Set</h2>
              <button onClick={() => startTest("easy")} className="mt-5 px-6 py-3 bg-white text-slate-950 rounded-2xl">
                Start Easy Test
              </button>
            </div>

            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
              <h2 className="text-2xl font-semibold">Hard Set</h2>
              <button onClick={() => startTest("hard")} className="mt-5 px-6 py-3 bg-white text-slate-950 rounded-2xl">
                Start Hard Test
              </button>
            </div>

            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
              <h2 className="text-2xl font-semibold">Extreme Set</h2>
              <button onClick={() => startTest("extreme")} className="mt-5 px-6 py-3 bg-white text-slate-950 rounded-2xl">
                Start Extreme Test
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 👇 ADD FOOTER HERE */}
      <footer className="w-full border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Cognitive Aptitude Practice
          </p>

          <a
            href="https://github.com/Carl4WebDev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white hover:text-blue-400 transition"
          >
            carl4dev
          </a>

          <p className="text-xs text-slate-500 max-w-md">
            This is an independent practice tool and is not affiliated with any official aptitude testing provider.
          </p>

        </div>
      </footer>
    </>
  );
}

  if (finished) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold">Results</h1>
          <p className="text-slate-300 mt-2 capitalize">Difficulty: {selectedDifficulty}</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-800/60 p-4 rounded-2xl">
              <p className="text-sm text-slate-400">Correct</p>
              <p className="text-2xl font-semibold">{result.correct}</p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl">
              <p className="text-sm text-slate-400">Wrong</p>
              <p className="text-2xl font-semibold">{result.wrong}</p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl">
              <p className="text-sm text-slate-400">Attempted</p>
              <p className="text-2xl font-semibold">{result.attempted}</p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl">
              <p className="text-sm text-slate-400">Skipped</p>
              <p className="text-2xl font-semibold">{result.skipped}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
              <p className="text-sm text-slate-400">Verbal Reasoning</p>
              <p className="text-2xl font-semibold">{result.verbalCorrect} / {result.verbalCount}</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
              <p className="text-sm text-slate-400">Numerical Reasoning</p>
              <p className="text-2xl font-semibold">{result.numericalCorrect} / {result.numericalCount}</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
              <p className="text-sm text-slate-400">Abstract Reasoning</p>
              <p className="text-2xl font-semibold">{result.abstractCorrect} / {result.abstractCount}</p>
            </div>
          </div>

          <div className="mt-8 space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {questions.map((q, index) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.answer;

              return (
                <div key={q.id} className="bg-slate-800/40 border border-slate-700 rounded-2xl p-4">
                  <p className="text-sm text-slate-400">{index + 1}. {q.category}</p>
                  <p className="font-medium mt-1">{q.question}</p>
                  <p className="text-sm mt-2">Your answer: <span className="font-semibold">{userAnswer || "No answer"}</span></p>
                  <p className="text-sm">Correct answer: <span className="font-semibold">{q.answer}</span></p>
                  <p className={`text-sm mt-1 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {userAnswer ? (isCorrect ? "Correct" : "Incorrect") : "Skipped"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-3 flex-wrap">
            <button
              onClick={() => startTest(selectedDifficulty)}
              className="px-6 py-3 bg-white text-slate-950 rounded-2xl font-semibold hover:opacity-90"
            >
              Retry Same Difficulty
            </button>
            <button
              onClick={restartTest}
              className="px-6 py-3 border border-slate-700 rounded-2xl hover:bg-slate-800"
            >
              Back To Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[300px_1fr] gap-6">
        <aside className="bg-slate-900 border border-slate-800 rounded-3xl p-5 h-fit lg:sticky lg:top-6">
          <p className="text-sm text-slate-400">Time Remaining</p>
          <h2 className={`text-3xl font-bold mt-1 ${timeLeft < 60 ? "text-red-400" : ""}`}>{formatTime(timeLeft)}</h2>

          <p className="text-sm text-slate-400 mt-4">Difficulty</p>
          <p className="text-lg font-semibold capitalize">{selectedDifficulty}</p>

          <button
            onClick={submitTest}
            className="w-full mt-4 px-4 py-3 bg-white text-slate-950 rounded-2xl font-semibold hover:opacity-90"
          >
            Submit Test
          </button>

          <div className="mt-6">
            <p className="text-sm text-slate-400 mb-3">Navigator</p>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const answered = !!answers[q.id];
                const isCurrent = index === currentIndex;
                const isFlagged = !!flagged[q.id];

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-11 rounded-xl text-sm font-semibold border transition ${
                      isCurrent
                        ? "bg-white text-slate-950 border-white"
                        : answered
                          ? "bg-slate-700 border-slate-600"
                          : "bg-slate-800 border-slate-700"
                    } ${isFlagged ? "ring-2 ring-amber-400" : ""}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-300 space-y-2">
            <p>Answered: {result.attempted}</p>
            <p>Remaining: {questions.length - result.attempted}</p>
            <p>Flagged: {Object.values(flagged).filter(Boolean).length}</p>
          </div>
        </aside>

        <main className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div>
              <p className="text-sm text-slate-400">Question {currentIndex + 1} of {questions.length}</p>
              <p className="mt-2 inline-block px-3 py-1 bg-slate-800 rounded-full text-sm">{currentQuestion?.category}</p>
            </div>

            <button
              onClick={toggleFlag}
              className="px-4 py-2 border border-slate-700 rounded-xl hover:bg-slate-800"
            >
              {flagged[currentQuestion?.id] ? "Unflag" : "Flag for Review"}
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold mt-8 leading-tight">{currentQuestion?.question}</h1>

          <div className="grid gap-4 mt-8">
            {currentQuestion?.choices.map((choice) => {
              const selected = answers[currentQuestion.id] === choice;

              return (
                <button
                  key={choice}
                  onClick={() => handleAnswer(choice)}
                  className={`w-full text-left p-4 rounded-2xl border transition ${
                    selected
                      ? "bg-white text-slate-950 border-white"
                      : "bg-slate-800/60 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-10 gap-3">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="px-5 py-3 border border-slate-700 rounded-2xl disabled:opacity-40 hover:bg-slate-800"
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
              disabled={currentIndex === questions.length - 1}
              className="px-5 py-3 bg-white text-slate-950 rounded-2xl font-semibold disabled:opacity-40 hover:opacity-90"
            >
              Next
            </button>
          </div>
        </main>
      </div>
      <footer className="w-full mt-10 border-t border-slate-800 bg-slate-950">
  <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
    
    <p className="text-sm text-slate-400">
      © {new Date().getFullYear()} Cognitive Aptitude Practice
    </p>

    <a
      href="https://github.com/Carl4WebDev"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-semibold text-white hover:text-blue-400 transition"
    >
      carl4dev
    </a>

    <p className="text-xs text-slate-500 max-w-md">
      This is an independent practice tool and is not affiliated with any official aptitude testing provider.
    </p>

  </div>
</footer>
    </div>
  );
}
