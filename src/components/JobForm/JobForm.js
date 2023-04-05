import React, { useState, useRef } from "react";
import { Formik, Form } from "formik";
import jobSchema from "@/utility/Schema/jobSchema";
import { FormikInput } from "./FormikInput";
import { NumericCaptcha } from "./NumericCaptcha";
import { postJob } from "@/firebase";
import { toast } from "react-toastify";

const JobForm = (props) => {
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const captchaRef = useRef();

  const initialValues = {
    jobTitle: "sdfg",
    jobFunction: "sdfg",
    jobType: "sdfg",
    experience: "2",
    salary: "2",
    jobExpiresIn: "2",
    skills: "sdfg",
    companyLogo: "sdfg",
    location: "sdfg",
  };

  // const initialValues = {
  //   jobTitle: "",
  //   jobFunction: "",
  //   jobType: "",
  //   experience: "",
  //   salary: "",
  //   jobExpiresIn: "",
  //   skills: "",
  //   companyLogo: "",
  //   location: "",
  // };

  const captchaChangeHandler = (status) => {
    setCaptchaError("");
    setCaptchaSuccess(status);
  };

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    if (!captchaSuccess) {
      setCaptchaError("Captcha not filled or incorrect");
      setSubmitting(false);
      return;
    }
    console.log("form values", values);
    try {
      postJob(values);
      toast.success("job added successfully");
      resetForm();
    } catch (error) {
      toast.error("something went wrong, try again later");
    } finally {
      captchaRef.current.refresh();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={jobSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => {
        return (
          <Form className="w-full">
            <FormikInput
              fieldType="text"
              fieldTitle="JobTitle"
              fieldId="jobTitle"
              fieldLabel="Job Title"
              errors={errors}
              touched={touched}
            />
            <FormikInput
              fieldType="text"
              fieldLabel="Job Function"
              fieldId="jobFunction"
              errors={errors}
              touched={touched}
            />
            <FormikInput
              fieldType="text"
              fieldLabel="Job Type"
              fieldId="jobType"
              errors={errors}
              touched={touched}
            />
            <FormikInput
              fieldType="number"
              fieldLabel="Experience"
              fieldId="experience"
              errors={errors}
              touched={touched}
            />
            <FormikInput
              fieldType="number"
              fieldLabel="Salary"
              fieldId="salary"
              errors={errors}
              touched={touched}
            />
            <FormikInput
              fieldType="number"
              fieldLabel="Job Expires In (days)"
              fieldId="jobExpiresIn"
              errors={errors}
              touched={touched}
            />
            <FormikInput
              fieldType="text"
              fieldLabel="Skills"
              fieldId="skills"
              errors={errors}
              touched={touched}
            />
            <FormikInput
              fieldType="text"
              fieldLabel="Company Logo"
              fieldId="companyLogo"
              errors={errors}
              touched={touched}
            />
            <FormikInput
              fieldType="text"
              fieldLabel="Location"
              fieldId="location"
              errors={errors}
              touched={touched}
            />
            <div className="mb-4">
              <NumericCaptcha
                ref={captchaRef}
                captchaChangeHandler={captchaChangeHandler}
              />
              {captchaError && (
                <div className="text-red-500 mt-1">{captchaError}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-100"
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export { JobForm };
