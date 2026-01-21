
import React from 'react';
import { type Case, type CaseStatus } from '../types';
import { PlusIcon, EditIcon, TrashIcon, FileTextIcon, DownloadIcon } from './icons';

// Add type declaration for the global XLSX variable from the script tag
declare var XLSX: any;

interface CaseListProps {
  cases: Case[];
  onAdd: () => void;
  onEdit: (caseToEdit: Case) => void;
  onDelete: (caseId: string) => void;
}

const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
        case 'लंबित':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'बंद':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'अनुसंधान में':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        default:
            return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
};


const CaseList: React.FC<CaseListProps> = ({ cases, onAdd, onEdit, onDelete }) => {
  const handleExport = () => {
    const headerMapping = {
      caseNumber: 'प्रकरण संख्या',
      caseStatus: 'प्रकरण स्थिति',
      filingDate: 'दर्ज दिनांक',
      section: 'धारा',
      incidentPlace: 'घटना स्थल',
      complainantNameAddress: 'परिवादी का नाम व पता',
      caseSummary: 'प्रकरण का संक्षिप्त विवरण',
      investigatingOfficer: 'अनुसंधान अधिकारी का नाम',
      policeResult: 'पुलिस नतिजा चालान/एफआर नम्बर व दिनांक',
      accusedNameAddress: 'अपराधी का नाम व पता',
      seizure: 'जब्ती',
      casePropertyDetails: 'प्रकरण से संबंधित माल का विवरण',
      stolenProperty: 'मालमसरूखा',
      seizedPropertyAgain: 'माल व्याजाप्ता',
      courtSubmissionDate: 'कोर्ट में चालान व एफआर पेश करने की दिनांक',
      fslDetails: 'एफएसएल का विवरण',
    };

    const dataToExport = cases.map(c => {
        let exportedCase: { [key: string]: string } = {};
        for (const key in headerMapping) {
            exportedCase[headerMapping[key as keyof typeof headerMapping]] = c[key as keyof Case];
        }
        return exportedCase;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'प्रकरण');
    XLSX.writeFile(workbook, 'प्रकरण_सूची.xlsx');
  };

  const tableHeaders = [
    'प्रकरण संख्या', 'प्रकरण स्थिति', 'दर्ज दिनांक', 'धारा', 'घटना स्थल', 'परिवादी का नाम व पता', 'अनुसंधान अधिकारी', 'कार्यवाही'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold">सभी प्रकरण</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExport}
            disabled={cases.length === 0}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            <DownloadIcon className="h-5 w-5" />
            <span>एक्सेल में निर्यात करें</span>
          </button>
          <button
            onClick={onAdd}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <PlusIcon className="h-5 w-5" />
            <span>नया प्रकरण जोड़ें</span>
          </button>
        </div>
      </div>

      {cases.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-lg shadow">
          <FileTextIcon className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500" />
          <h3 className="mt-4 text-xl font-semibold">कोई प्रकरण नहीं मिला</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">शुरू करने के लिए एक नया प्रकरण जोड़ें।</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            {tableHeaders.map(header => (
                                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {cases.map(caseItem => (
                            <tr key={caseItem.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">{caseItem.caseNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(caseItem.caseStatus)}`}>
                                        {caseItem.caseStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{caseItem.filingDate ? new Date(caseItem.filingDate).toLocaleDateString('hi-IN') : ''}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{caseItem.section}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{caseItem.incidentPlace}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm max-w-xs truncate">{caseItem.complainantNameAddress}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{caseItem.investigatingOfficer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-3">
                                        <button onClick={() => onEdit(caseItem)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                            <EditIcon className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => onDelete(caseItem.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default CaseList;
