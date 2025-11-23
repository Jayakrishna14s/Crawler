import { useState } from "react";
import axios from "axios";

export default function Test() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const URL = import.meta.env.VITE_BACKEND_URL;

  const handleTest = async () => {
    setLoading(true);
    setStatus("");

    try {
      const res = await axios.get(`${URL}/test`);
      setStatus(`Success: ${res.data.message}`);
    } catch (err) {
      setStatus(
        `Error: ${
          err.response
            ? `Backend responded with ${err.response.status}`
            : err.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Backend Connectivity Check
        </h1>

        <button
          onClick={handleTest}
          disabled={loading}
          className="w-full py-3 text-lg font-semibold rounded-xl border border-gray-700
            hover:bg-gray-800 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Pinging Backend…" : "Run Backend Test"}
        </button>

        {status && (
          <p className="mt-6 text-center text-lg font-medium">{status}</p>
        )}
      </div>
    </div>
  );
}
