import { useEffect, useState } from "react";
import MissingDocumentsList from "./MissingDocumentsList";
import { MissingDocument } from "../../app/models/missingDocument";
import LoadingComponent from "../../app/layout/LoadingComponent";
import agent from "../../app/api/agent";

const MissingDocuments = () => {
  const [missingDocument, setMissingDocument] = useState<MissingDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Document.list()
      .then((documents: any) => setMissingDocument(documents))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading documents" />;

  return (
    <>
      <MissingDocumentsList documents={missingDocument} />
    </>
  );
};

export default MissingDocuments;
