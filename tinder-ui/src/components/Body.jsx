import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const [searchTextValue, setSearchTextValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const searchHandler = async (value) => {
    if (!value.trim()) return;
    try {
      setLoading(true);
      const result = await axios.post(`${BASE_URL}/search`, {
        params: { query: value }
      }, { withCredentials: true });
      setAnswer(result.data.answer);
      setSearchTextValue("");
    //   console.log("Search results:", result.data);
    } catch (error) {
      console.error("Error searching feed:", error);
    }finally {
        setLoading(false);
      }
  };

  return (
    <>
      <NavBar />
      <div className="d-flex justify-items-center">
        <h2 className="text-3xl font-bold my-10">Type your query below</h2>
        
        <div className="flex items-center justify-center w-1/2">
        <input
          type="text"
          name="search"
          className="border w-full rounded border-gray-600 focus:outline-none p-2 mx-4"
          placeholder="Type your query here..."
          value={searchTextValue}
          data-testid="search-input"
          onChange={(e) => {
            setSearchTextValue(e.target.value);
          }}
        />
        <button
          className="border border-gray-600 my-4 rounded p-2"
          onClick={() => searchHandler(searchTextValue)}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        </div>

        {answer && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg w-full max-w-md text-gray-800">
          <h2 className="text-lg font-semibold mb-2">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
      </div>

      <Footer />
    </>
  );
};

export default Body;
