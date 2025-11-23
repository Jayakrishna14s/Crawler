import React from "react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-black-800 mb-6 ">
          Crawler
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Your AI-powered research companion that analyzes companies, extracts
          insights, and generates strategic account plans.
        </p>

        <a
          href="/chat"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Start Researching
        </a>
      </div>
    </div>
  );
};

export default Index;
