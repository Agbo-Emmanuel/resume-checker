const SelectResume = () => {
  return (
    <>
      <main className="w-full min-h-[100vh] bg-gray-100">
        <section className="w-full flex flex-col items-center py-10 px-2">
          <article className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-medium text-gray-900">
              Upload Your Resume
            </h3>
            <div className="w-[400px] h-[300px] border-3 border-dotted border-purple-500 rounded-md flex flex-col items-center justify-center gap-3">
              <div className="w-[60px] h-[60px] bg-purple-300 rounded-full flex justify-center items-center"></div>
              <p className="text-lg font-medium text-gray-900">
                Upload file here
              </p>
              <button className="w-max px-6 py-1 bg-purple-800 text-gray-50 rounded-full text-lg cursor-pointer">
                Browse
              </button>
            </div>
            <p className="text-lg font-medium text-gray-900">
              Files we can read: DOC, DOCX, PDF
            </p>
          </article>
        </section>

        <section className="w-full flex items-center justify-between px-10">
          <button className="w-max px-10 py-2 border-2 border-purple-500 text-gray-900 font-medium rounded-full text-lg cursor-pointer">
            Back
          </button>
          <button className="w-max px-10 py-2 bg-purple-800 text-gray-50 font-medium rounded-full text-lg cursor-pointer">
            Next
          </button>
        </section>
      </main>
    </>
  );
};

export default SelectResume;
