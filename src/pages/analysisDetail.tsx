import React, { useEffect } from "react";
import {
  AiOutlineDownload,
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
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <section className="max-w-4xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Resume Analysis Report
          </h1>
          {/* <p className="text-gray-600">
            AI-powered insights to improve your resume
          </p> */}
        </header>

        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Candidate Info
          </h2>
          <p className="text-gray-800">
            <span className="font-medium">Name:</span> {analysis?.name}
          </p>
          <p className="text-gray-800">
            <span className="font-medium">Target Role:</span> {analysis?.role}
          </p>
          <p className="mt-3 text-lg font-bold text-blue-600">
            Overall Score: {analysis?.overallScore}%
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Summary</h2>
          <p className="text-gray-700">{analysis?.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 border border-green-200">
            <h2 className="flex items-center text-lg font-semibold text-green-700 mb-3">
              <AiOutlineCheckCircle className="w-5 h-5 mr-2" /> Strengths
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {analysis?.strengths.map((s: any, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border border-red-200">
            <h2 className="flex items-center text-lg font-semibold text-red-700 mb-3">
              <AiOutlineExclamationCircle className="w-5 h-5 mr-2" /> Weaknesses
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {analysis?.weaknesses.map((w: any, i: number) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Grammar & Language Suggestions
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {analysis?.grammarIssues.map((g: any, i: number) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>

        {/* <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md flex items-center">
            <AiOutlineDownload className="w-5 h-5 mr-2" />
            Download Full Report
          </button>
        </div> */}
      </section>
    </main>
  );
};

export default AnalysisDetail;
