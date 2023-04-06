import React, { useState, useRef, createElement } from "react";
import { Formik, Form } from "formik";
import jobSchema from "@/utility/Schema/jobSchema";
import { FormikInput } from "./FormikInput";
import { NumericCaptcha } from "./NumericCaptcha";
import { postJob, updateJobById } from "@/firebase";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const JobForm = (props) => {
  const router = useRouter();

  const { jobData, updateRequired } = props;

  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const captchaRef = useRef();

  // const initialValues = {
  //   jobTitle: "FrontEnd Developer",
  //   jobFunction: "Developing UI with ReactJs",
  //   jobType: "Full-Time",
  //   experience: "4",
  //   salary: "15",
  //   jobExpiresIn: "60",
  //   skills: "reactjs,javascript,html,css",
  //   companyLogo:
  //     "https://thumbs.dreamstime.com/b/letter-v-orange-red-rectangles-business-logo-placeholder-name-company-name-geometric-vector-logo-design-elements-169170579.jpg",
  //   location: "Hyderabad, Telangana",
  // };

  let initialValues;

  if (updateRequired && jobData) {
    initialValues = {
      jobTitle: jobData.jobTitle,
      jobFunction: jobData.jobFunction,
      jobType: jobData.jobType,
      experience: jobData.experience,
      salary: jobData.salary,
      jobExpiresIn: jobData.jobExpiresIn,
      skills: jobData.skills,
      companyLogo: jobData.companyLogo,
      location: jobData.location,
    };
  } else {
    initialValues = {
      jobTitle: "",
      jobFunction: "",
      jobType: "",
      experience: "",
      salary: "",
      jobExpiresIn: "",
      skills: "",
      companyLogo: "",
      location: "",
    };
  }

  const captchaChangeHandler = (status) => {
    setCaptchaError("");
    setCaptchaSuccess(status);
  };

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    //checking captcha success
    if (!captchaSuccess) {
      setCaptchaError("Captcha not filled or incorrect");
      setSubmitting(false);
      return;
    }

    //for updating the job
    if (updateRequired && jobData) {
      updateJobById(jobData.jobId, {
        ...values,
      });
      router.push("/jobs");
      return;
    }

    //for new form entry
    try {
      const createdDate = dayjs();
      const formattedCreatedDate = createdDate.format("DD-MM-YYYY");
      const expiryDate = createdDate.add(values.jobExpiresIn, "days");
      const formattedExpiryDate = expiryDate.format("DD-MM-YYYY");
      const formValues = {
        ...values,
        createdAt: formattedCreatedDate,
        expiringAt: formattedExpiryDate,
      };
      postJob(formValues);
      toast.success("job added successfully");
      resetForm();
    } catch (error) {
      toast.error("something went wrong, try again later");
      setSubmitting(false);
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
              fieldLabel="Experience (Years)"
              fieldId="experience"
              errors={errors}
              touched={touched}
            />
            <FormikInput
              fieldType="number"
              fieldLabel="Salary (LPA)"
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
              {updateRequired ? "Update" : "Submit"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export { JobForm };
