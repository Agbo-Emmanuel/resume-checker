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
      <main className="w-full min-h-[100vh] bg-gray-100">
        {showLoader ? (
          <section className="w-full h-[100vh] flex flex-col items-center justify-center p-5">
            <div className="relative rounded-md flex items-center justify-center shadow-lg overflow-hidden p-2">
              <img
                src={analyze_loading_image}
                alt="PDF Icon"
                className="w-70 h-70 object-cover"
              />

              {/* <div className="absolute left-1/2 transform -translate-x-1/2 animate-scan">
              <FaSearch className="text-gray-700 text-6xl opacity-80" />
            </div> */}
              <div className="w-full h-[10px] bg-purple-500 absolute left-1/2 transform -translate-x-1/2 animate-scan"></div>
            </div>
            <p className="mt-6 text-gray-600 text-lg animate-pulse">
              Analyzing your resume...
            </p>
          </section>
        ) : (
          <>
            <section className="w-full flex flex-col items-center py-10 px-2">
              <article className="flex flex-col items-center gap-4">
                <h3 className="text-2xl font-medium text-gray-900">
                  Upload Your Resume
                </h3>
                <div className="w-[400px] h-[300px] border-3 border-dotted border-purple-500 rounded-md flex flex-col items-center justify-center gap-3">
                  <div className="w-[60px] h-[60px] bg-purple-300 rounded-full flex justify-center items-center">
                    <FaFileUpload className="text-3xl text-purple-800" />
                  </div>
                  <p className="text-lg font-medium text-gray-900">
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
                    className="w-max px-6 py-1 bg-purple-800 text-gray-50 rounded-full text-lg cursor-pointer"
                  >
                    Browse
                  </label>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  Files we can read: DOC, DOCX, PDF
                </p>
              </article>
            </section>

            <section className="w-full flex items-center justify-center gap-4 px-10">
              <button
                onClick={() => window.history.back()}
                className="w-max px-10 py-2 border-2 border-purple-500 text-gray-900 font-medium rounded-full text-lg cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={analyzeResume}
                className="w-max px-10 py-2 bg-purple-800 text-gray-50 font-medium rounded-full text-lg cursor-pointer"
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
