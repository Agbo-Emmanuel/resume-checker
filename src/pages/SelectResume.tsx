import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import * as pdfjsLib from "pdfjs-dist";
import pdfToText from "react-pdftotext";
import { FaFilePdf, FaSearch } from "react-icons/fa";
import analyze_loading_image from "../assets/analyze_loading_image.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

declare global {
  interface Window {
    puter: any;
  }
}

const SelectResume = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  // const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [animationLoading, setAnimationLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const extractText = async () => {
    if (!file) {
      console.error("No file uploaded");
      toast.error("No file uploaded");
      return;
    }
    try {
      const text = await pdfToText(file);

      return text;
    } catch (err) {
      console.error("Failed to extract text", err);
    }
  };

  const analyzeResume = async () => {
    if (!file) {
      console.error("No file uploaded");
      toast.error("No file uploaded");
      return;
    }
    setAnimationLoading(true);
    setLoading(true);

    setTimeout(() => {
      setAnimationLoading(false);
    }, 10000);

    const text = await extractText();

    if (!window.puter) {
      alert("Puter.js not loaded");
      return;
    }

    try {
      const response = await window.puter.ai.chat(`
        Analyze the following resume and provide feedback. 

        Return the result strictly in valid JSON format with the following structure:

        {
          name: "the Candidate's name",
          role: "the Candidate's target role",
          overallScore: "an overall score out of 100",
          "summary": "A concise summary of the overall resume analysis",
          "strengths": [
            "List of strengths..."
          ],
          "weaknesses": [
            "List of weaknesses..."
          ],
          "suggestions": [
            "List of suggestions for improvement..."
          ],
          grammarIssues: [
            "list of grammar issues...",
          ]
        }

        Resume Content: ${text}

      `);
      setLoading(false);
      sessionStorage.setItem("analysis", response);
      navigate("/analysis-result");

      // console.log("AI Analysis:", response);
    } catch (err) {
      console.error("AI analysis failed", err);
      setAnalysis("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  const showLoader = animationLoading || loading;

  return (
    <>
      <main className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-10">
        {showLoader ? (
          <section className="w-full h-screen flex flex-col items-center justify-center p-5">
            <div className="relative rounded-xl flex items-center justify-center bg-white shadow-md overflow-hidden p-6 w-[280px] h-[280px]">
              <img
                src={analyze_loading_image}
                alt="Analyzing..."
                className="w-64 h-64 object-contain opacity-90"
              />
              <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 animate-scan"></div>
            </div>
            <p className="mt-8 text-gray-700 text-lg font-medium animate-pulse">
              Analyzing your resume...
            </p>
          </section>
        ) : (
          <>
            <section className="w-full flex flex-col items-center py-12 px-6">
              <article className="flex flex-col items-center gap-6 bg-white shadow-sm rounded-2xl p-10 max-w-md w-full border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Upload Your Resume
                </h3>

                <div className="w-full h-[250px] border-2 border-dashed border-gray-300 hover:border-purple-500 rounded-xl flex flex-col items-center justify-center gap-4 transition-colors duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex justify-center items-center">
                    <FaFileUpload className="text-3xl text-purple-700" />
                  </div>

                  <p className="text-base text-gray-700 font-medium">
                    {file ? file.name : "No file selected"}
                  </p>

                  <input
                    id="fileUploadInput"
                    type="file"
                    hidden
                    onChange={onFileChange}
                  />
                  <label
                    htmlFor="fileUploadInput"
                    className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-full text-base font-medium cursor-pointer transition-all duration-200"
                  >
                    Browse
                  </label>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: PDF
                </p>
              </article>
            </section>

            <section className="w-full flex items-center justify-center gap-6 mt-1 px-4">
              <button
                onClick={() => window.history.back()}
                className="px-8 py-2 cursor-pointer border border-gray-400 hover:border-purple-500 text-gray-700 font-medium rounded-full text-base transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={analyzeResume}
                className="px-8 py-2 cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-full text-base shadow-sm transition-all duration-300"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default SelectResume;
