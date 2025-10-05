import { useEffect } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AnalysisDetail = () => {
  const navigate = useNavigate();

  const stored = sessionStorage.getItem("analysis");
  const analysis = stored ? JSON.parse(stored) : null;

  useEffect(() => {
    !analysis ? navigate("/select-resume") : null;
  }, []);

  // const analysis = {
  //   name: "John Doe",
  //   role: "Frontend Developer",
  //   overallScore: 82,
  //   summary:
  //     "Strong technical background with solid React skills. Needs improvement in ATS keywords and resume formatting.",
  //   strengths: [
  //     "Good use of action verbs",
  //     "Relevant technical skills listed",
  //     "Strong experience section",
  //   ],
  //   weaknesses: [
  //     "Missing some industry keywords",
  //     "Formatting could be more ATS-friendly",
  //     "Limited detail in education section",
  //   ],
  //   grammarIssues: [
  //     "Consider rephrasing long sentences in work experience",
  //     "Minor punctuation inconsistencies",
  //   ],
  // };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <section className="max-w-5xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Resume Analysis Report
          </h1>
        </header>

        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Candidate Information
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Name:</span> {analysis?.name}
            </p>
            <p>
              <span className="font-medium">Target Role:</span> {analysis?.role}
            </p>
            <p className="mt-4 text-lg font-semibold text-indigo-600">
              Overall Score: {analysis?.overallScore}%
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{analysis?.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
              <AiOutlineCheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Strengths
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {analysis?.strengths?.map((s: any, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
              <AiOutlineExclamationCircle className="w-5 h-5 mr-2 text-red-600" />
              Weaknesses
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {analysis?.weaknesses?.map((w: any, i: number) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Grammar & Language Suggestions
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {analysis?.grammarIssues?.map((g: any, i: number) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 cursor-pointer border border-gray-400 text-gray-700 font-medium rounded-full hover:border-gray-600 hover:text-gray-900 transition-all duration-300"
          >
            Back
          </button>
        </div>
      </section>
    </main>
  );
};

export default AnalysisDetail;
