import * as yup from "yup";

const jobSchema = yup.object().shape({
  jobTitle: yup.string().required("Title of job is required"),
  jobFunction: yup.string().required("Function of job is required"),
  jobType: yup.string().required("Type of job is required"),
  experience: yup
    .number()
    .required("Experience of job is required")
    .positive()
    .integer(),
  salary: yup
    .number()
    .required("Salary of job is required")
    .positive()
    .integer(),
  jobExpiresIn: yup.string().required("Expiry of job is required"),
  skills: yup.string().required("Skills of job is required"),
  companyLogo: yup.string().required("Company logo is required"),
  location: yup.string().required("Location of job is required"),
  // createdAt: yup.date().min(new Date()).required(),
  // expiringAt: yup.date().required(),
  //   captcha: yup.string().required(),
});

export default jobSchema;
