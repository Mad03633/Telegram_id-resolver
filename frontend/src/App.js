import React, { useState } from "react";
import TelegramResolver from "./TelegramResolver";

function App() {
  const [resolvedIds, setResolvedIds] = useState([]);

  const handleResolved = (data) => {
    setResolvedIds((prev) => [...prev, data]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Telegram ID Resolver</h1>

        <TelegramResolver onIdResolved={handleResolved} />

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          {resolvedIds.length === 0 ? (
            <p className="text-gray-400">Still have not data</p>
          ) : (
            <ul className="list-disc list-inside text-gray-700">
              {resolvedIds.map((item, index) => (
                <li key={index}>
                  <span className="font-medium">{item.username}</span> → Telegram ID:{" "}
                  <code className="bg-gray-100 px-2 py-0.5 rounded">{item.user_id}</code>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
