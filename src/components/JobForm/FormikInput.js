import { Field, ErrorMessage } from "formik";

const FormikInput = (props) => {
  const { fieldLabel, fieldType, fieldId, errors, touched } = props;
  return (
    <>
      <div className="mb-4">
        <label htmlFor={fieldId} className="block text-gray-700 font-bold mb-2">
          {fieldLabel}
        </label>
        <Field
          type={fieldType}
          name={fieldId}
          id={fieldId}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors[fieldId] && touched[fieldId] ? "border-red-500" : ""
          }`}
        />
        <ErrorMessage
          name={fieldId}
          component="div"
          className="text-red-500 mt-1"
        />
      </div>
    </>
  );
};

export { FormikInput };
