"use client";
import React, { useState } from "react";

const defaultFormState = {
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  message: {
    value: "",
    error: "",
  },
};

export const Contact = () => {
  const [formData, setFormData] = useState(defaultFormState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newFormData = { ...formData };

    if (formData.name.value.trim() === "") {
      newFormData.name.error = "Name is required";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email.value)) {
      newFormData.email.error = "Email is invalid";
      isValid = false;
    }

    if (formData.message.value.trim() === "") {
      newFormData.message.error = "Message is required";
      isValid = false;
    }

    setFormData(newFormData);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Example submit logic
    const submissionData = {
      name: formData.name.value,
      email: formData.email.value,
      message: formData.message.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        console.log("Form submitted successfully:", submissionData);
        setFormSubmitted(true);
        setSubmissionError("");
        // Reset the form
        setFormData(defaultFormState);
      } else {
        console.error("Form submission failed:", response.statusText);
        setSubmissionError("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionError("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {formSubmitted && <p className="text-green-500">Form submitted successfully!</p>}
      {submissionError && <p className="text-red-500">{submissionError}</p>}
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="w-full">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
            value={formData.name.value}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: {
                  value: e.target.value,
                  error: "",
                },
              });
            }}
          />
          {formData.name.error && <p className="text-red-500 text-sm">{formData.name.error}</p>}
        </div>
        <div className="w-full">
          <input
            type="email"
            placeholder="Your email address"
            className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
            value={formData.email.value}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: {
                  value: e.target.value,
                  error: "",
                },
              });
            }}
          />
          {formData.email.error && <p className="text-red-500 text-sm">{formData.email.error}</p>}
        </div>
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={10}
          className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 mt-4 py-2 rounded-md text-sm text-neutral-700 w-full"
          value={formData.message.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              message: {
                value: e.target.value,
                error: "",
              },
            });
          }}
        />
        {formData.message.error && <p className="text-red-500 text-sm">{formData.message.error}</p>}
      </div>
      <button
        className="w-full px-2 py-2 mt-4 bg-neutral-100 rounded-md font-bold text-neutral-500"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
