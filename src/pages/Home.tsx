import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="w-full min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-indigo-900 flex items-center justify-center px-6 py-12">
        <section className="w-full max-w-5xl flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            ATS Resume Checker <br />
            <span className="text-purple-200">Score Your Resume Online</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl leading-relaxed">
            Boost your chances of landing your dream job with our smart ATS
            resume checker.
            <br className="hidden sm:block" />
            Get instant feedback, a personalized score, and actionable tips to
            make your resume stand out.
          </p>

          <button
            onClick={() => navigate("/select-resume")}
            className="mt-8 px-8 py-4 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Check Your Resume
          </button>
        </section>
      </main>
    </>
  );
};

export default Home;
