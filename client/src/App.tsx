import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/api/entries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmM1ODU5Njg5MjYxOWMwMjVmYmUwNCIsImlhdCI6MTc1MTkzMDk2OX0.cJLcYNyJd92JzGM7QhTC1B3fz6Hg3ASmBxsBx6ZSS-o`, // 👈 include the JWT here
          },
        });

        const data = await res.json();
        console.log("data", data);
      } catch (err: any) {
        console.error("Failed to fetch diaries:", err);
      }
    };

    fetchDiaries();
  }, []);
  return <div>Test</div>;
}

export default App;
