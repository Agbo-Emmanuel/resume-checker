import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="w-full bg-gray-100">
        <section className="w-full min-h-[100vh] flex flex-col gap-4 justify-center items-center py-4 px-6">
          <h1 className="text-5xl font-bold text-gray-900 text-center leading-15">
            ATS Resume Checker: <br /> Score Your Resume OnlineATS Resume
            Checker: Score Your Resume Online
          </h1>
          <p className="text-xl font-medium text-gray-600 text-center">
            Boost your chances of landing the job with our ATS resume checker.
            Scan your resume, get a personalized score,
            <br /> and receive actionable suggestions to make your application
            stand out.
          </p>
          <button
            onClick={() => navigate("/select-resume")}
            className="w-max px-6 py-4 bg-purple-800 text-gray-50 rounded-full mt-6 text-xl cursor-pointer"
          >
            Check You Resume
          </button>
        </section>
      </main>
    </>
  );
};

export default Home;
