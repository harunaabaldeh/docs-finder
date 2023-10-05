import { useEffect, useState } from "react";
import axios from "axios";
import DocumentCard from "./components/DocumentCard";
import Cards from "./components/Cards";

export interface Document {
  id: number;
  owner: string;
  placeFound: string;
  documentType: string;
  dateFound: string;
  isFound: boolean;
}

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getDocuments = () => {
      axios
        .get<Document[]>("http://localhost:5000/api/document/documents")
        .then((res) => {
          setDocuments(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
          setError(err);
          setLoading(false);
        });
    };

    getDocuments();
  }, []);

  if (isLoading) return <p>Loading documents...</p>;

  if (error) return <p>Problem fetching documents. Try agin</p>;

  return (
    <>
      <Cards />
      <DocumentCard documents={documents} />
    </>
  );
}

export default App;
