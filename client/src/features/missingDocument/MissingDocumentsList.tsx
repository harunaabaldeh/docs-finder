import { useState } from "react";
import { MissingDocument } from "../../app/models/missingDocument";
import DocumentCard from "./DocumentCard";

interface Props {
  documents: MissingDocument[];
}

const MissingDocumentsList = ({ documents }: Props) => {
  const documentsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray- py-6 sm:py-12 mt-4">
        <div className="mx-auto max-w-screen-xl px-4 w-full">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Missing Documents List
          </h1>

          <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {currentDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from(
              { length: Math.ceil(documents.length / documentsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-2 px-3 py-2 rounded-md focus:outline-none ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MissingDocumentsList;
