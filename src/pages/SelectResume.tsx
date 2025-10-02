import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import * as pdfjsLib from "pdfjs-dist";
import pdfToText from "react-pdftotext";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

declare global {
  interface Window {
    puter: any;
  }
}

const SelectResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const extractText = async () => {
    if (!file) {
      console.error("No file uploaded");
      return;
    }
    try {
      const text = await pdfToText(file);
      setResumeText(text);
    } catch (err) {
      console.error("Failed to extract text", err);
    }
  };

  const analyzeResume = async () => {
    extractText();

    console.log(resumeText);

    if (!window.puter) {
      alert("Puter.js not loaded");
      return;
    }

    setLoading(true);
    try {
      const response = await window.puter.ai.chat(`
        Analyze this resume and give feedback:
        - Strengths
        - Weaknesses
        - Suggestions to improve
        Resume Content: ${resumeText}
      `);
      setLoading(false);

      setAnalysis(response);
      console.log("AI Analysis:", response);
    } catch (err) {
      console.error("AI analysis failed", err);
      setAnalysis("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="w-full min-h-[100vh] bg-gray-100">
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

        <section className="w-full flex items-center justify-between px-10">
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
            Next
          </button>
        </section>
      </main>
    </>
  );
};

export default SelectResume;
