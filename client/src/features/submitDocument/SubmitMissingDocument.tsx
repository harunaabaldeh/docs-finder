import { useState } from "react";
import { router } from "../../app/router/Router";
import agent from "../../app/api/agent";
import { DocumentType } from "../../app/models/documentType";

const SubmitMissingDocument = () => {
  const [owner, setOwner] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>(
    DocumentType.Passport
  );
  const [placeFound, setPlaceFound] = useState("");

  const handleSubmitMissingDocument = async (e: any) => {
    e.preventDefault();

    try {
      agent.Document.addDocument({
        owner,
        documentType,
        placeFound,
      });
      router.navigate("/documents");
    } catch (error) {}
  };

  return (
    <>
      <h1 className="text-center justify-center mt-10">
        Submit form goes here
      </h1>

      <form
        onSubmit={handleSubmitMissingDocument}
        className="max-w-md mx-auto mt-14"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setOwner(e.target.value)}
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Owner Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <select
            value={documentType}
            onChange={(e) => setDocumentType(parseInt(e.target.value, 10))}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value={DocumentType.Passport}>Passport</option>
            <option value={DocumentType.IdCard}>ID Card</option>
            <option value={DocumentType.DriverLicense}>Driver's License</option>
            <option value={DocumentType.BirthCertificate}>
              Birth Certificate
            </option>
            <option value={DocumentType.Insurance}>Insurance</option>
            <option value={DocumentType.Other}>Other</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setPlaceFound(e.target.value)}
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Place Found
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SubmitMissingDocument;
