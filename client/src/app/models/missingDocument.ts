import { DocumentType } from "./documentType";


export interface MissingDocument {
  id: number;
  owner: string;
  placeFound: string;
  documentType: DocumentType;
  isFound: boolean,
  dateFound: string
}
