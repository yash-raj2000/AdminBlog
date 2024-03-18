import React, { useState } from "react";

function CreateBlog() {
  const [inputs, setInputs] = useState({
    date: "",
    title: "",
    category: "",
    content: "",
  });

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        date: inputs.date,
        title: inputs.title,
        category: inputs.category,
        content: inputs.content,
      };

      const response = await fetch(
        "https://server-portfolio-rn5j.onrender.com/postBlog",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        console.log("data sent successfully");
        // eslint-disable-next-line
        const responseData = await response.json();
        setInputs({
          date: "",
          title: "",
          category: "",
          content: "",
        });
      } else {
        console.log(
          "Failed to send blog",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className="post-cont"
      style={{ width: "40vw", margin: "auto", background: "pink" }}
    >
      <form action="">
        <div
          className="newBlog"
          style={{ margin: "10px", display: "flex", flexDirection: "column" }}
        >
          Date:{" "}
          <input
            type="Date"
            name="date"
            value={inputs.value}
            onChange={handleChange}
            required
          />
          Title:{" "}
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            style={{ margin: "5px" }}
            required
          />
          Category:{" "}
          <input
            type="text"
            name="category"
            value={inputs.category}
            onChange={handleChange}
          />
          <textarea
            required
            style={{ margin: "5px" }}
            name="content"
            value={inputs.content}
            onChange={handleChange}
            id=""
            cols="30"
            rows="28"
            placeholder="write your content here..."
          ></textarea>
          <button
            style={{ width: "4rem", height: "3rem" }}
            onClick={submitForm}
          >
            POST
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
