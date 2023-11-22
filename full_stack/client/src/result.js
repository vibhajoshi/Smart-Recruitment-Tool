import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./App.css";
import "./LoginRegisterPage.css";

function Result() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handlePromptClick = async (prompt) => {
    setInputText(prompt);
    try {
      const response = await axios.post("http://localhost:5000/process_text", {
        text: prompt,
      });
      const { result, total_length } = response.data;
      setResult(result.split(", "));
    } catch (error) {
      console.error("Error sending request to the backend:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/process_text", {
        text: inputText,
      });
      setResult(response.data.split(", "));
      console.log(response.data);
    } catch (error) {
      console.error("Error sending request to the backend:", error);
    }
  };

  const prompts = [
    "Give me names of employees from bangalore.",
    "Give me names of employees whose role is AI/ML architect with 3 years experience",
    "Give me number of employees whose stay in Jaipur",
  ];

  return (
    <div className="login-register-page">
      <Row>
        <div>
          <div style={{ marginBottom: "0.5rem" }}>
            <Label>Recommended Prompts:</Label>
          </div>
          <Row>
            {prompts.map((prompt, index) => (
              <Col
                xs="4"
                key={index}
                style={{ marginBottom: "0.5rem", cursor: "pointer" }}
                onClick={() => {
                  handlePromptClick(prompt);
                  document.getElementById("submitForm").click();
                }}
              >
                <div
                  style={{
                    width: "400px",
                    height: "40px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                  }}
                >
                  {prompt}
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <Form id="submitForm" onSubmit={handleFormSubmit}>
          <FormGroup>
            <div style={{ marginBottom: "0.5rem" }}>
              <Label>Enter you prompt:</Label>
            </div>
            <Input
              style={{ width: "400px", height: "40px" }}
              type="textarea"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text"
            />
          </FormGroup>
          <div style={{ marginBottom: "0.5rem" }}>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </Form>
        {/* Display the result in a textarea only if results exist */}
        {result && (
          <div>
            <div style={{ marginBottom: "0.5rem" }}>
              <Label>Result</Label>
            </div>
            <textarea
              style={{ width: "400px" }}
              readOnly
              rows="10"
              value={result
                .map((item, index) => `${index + 1}. ${item}`)
                .join("\n")}
            />
          </div>
        )}
      </Row>
    </div>
  );
}

export default Result;
