
export type CaseStatus = 'लंबित' | 'बंद' | 'अनुसंधान में';

export interface Case {
  id: string;
  caseNumber: string;
  filingDate: string;
  section: string;
  caseStatus: CaseStatus;
  incidentPlace: string;
  complainantNameAddress: string;
  caseSummary: string;
  investigatingOfficer: string;
  policeResult: string;
  accusedNameAddress: string;
  seizure: string;
  casePropertyDetails: string;
  stolenProperty: string;
  seizedPropertyAgain: string;
  courtSubmissionDate: string;
  fslDetails: string;
}
