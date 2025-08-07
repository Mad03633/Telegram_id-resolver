import React, { useState } from "react";
import axios from "axios";

const TelegramResolver = ({ onIdResolved }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResolve = async () => {
    setError("");
    if (!username.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/resolve-telegram", {
        params: { username },
      });
      if (response.data && response.data.user_id) {
        onIdResolved({
          user_id: response.data.user_id,
          username: username.trim(),
        });
        setUsername("");
      } else {
        setError("Can not find Telegram ID.");
      }
    } catch (err) {
      const message =
        err.response?.data?.detail || "Error in request Telegram ID.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="@username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleResolve}
        disabled={loading}
        className={`px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Searching..." : "Find Telegram ID"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default TelegramResolver;
