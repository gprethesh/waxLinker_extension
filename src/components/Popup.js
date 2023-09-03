import React from "react";

const Popup = () => {
  const bindTwitterWithWax = () => {
    // Insert your logic here for binding Twitter with Wax wallet
    console.log("Binding Twitter with Wax wallet...");
    window.open("https://waxlinker.com", "_blank");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-64">
      <h1 className="text-2xl font-bold">WaxLinker</h1>
      <p className="text-gray-700 mt-2">
        This extension allows you to get Wax users on Twitter.
      </p>
      <button
        className="bg-blue-500 text-white p-2 rounded mt-4"
        onClick={bindTwitterWithWax}
      >
        Bind Twitter
      </button>
    </div>
  );
};

export default Popup;
