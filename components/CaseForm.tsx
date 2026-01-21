
import React, { useState, useEffect } from 'react';
import { type Case, type CaseStatus } from '../types';

interface CaseFormProps {
  initialData: Case | null;
  onSave: (caseData: Omit<Case, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

const emptyCase: Omit<Case, 'id'> = {
  caseNumber: '',
  filingDate: '',
  section: '',
  caseStatus: 'लंबित',
  incidentPlace: '',
  complainantNameAddress: '',
  caseSummary: '',
  investigatingOfficer: '',
  policeResult: '',
  accusedNameAddress: '',
  seizure: '',
  casePropertyDetails: '',
  stolenProperty: '',
  seizedPropertyAgain: '',
  courtSubmissionDate: '',
  fslDetails: '',
};

const FormInput: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; required?: boolean; error?: string }> = 
({ label, id, value, onChange, type = 'text', required = false, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className={`w-full px-3 py-2 bg-white dark:bg-slate-800 border rounded-md shadow-sm transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
);

const FormTextarea: React.FC<{ label:string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows?: number; error?: string }> = 
({ label, id, value, onChange, rows = 3, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
        </label>
        <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            rows={rows}
            className={`w-full px-3 py-2 bg-white dark:bg-slate-800 border rounded-md shadow-sm transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
        ></textarea>
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
);

const FormSelect: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; required?: boolean; error?: string; children: React.ReactNode }> =
({ label, id, value, onChange, required = false, error, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className={`w-full px-3 py-2 bg-white dark:bg-slate-800 border rounded-md shadow-sm transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
        >
            {children}
        </select>
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
);

const CaseForm: React.FC<CaseFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || emptyCase);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(initialData || emptyCase);
  }, [initialData]);

  const caseStatusOptions: CaseStatus[] = ['लंबित', 'बंद', 'अनुसंधान में'];

  const fieldGroups = [
    {
      title: "मूलभूत जानकारी",
      fields: [
        { id: 'caseNumber', label: 'प्रकरण संख्या', required: true, type: 'text' },
        { id: 'filingDate', label: 'दर्ज दिनांक', required: true, type: 'date' },
        { id: 'section', label: 'धारा', required: true, type: 'text' },
        { id: 'caseStatus', label: 'प्रकरण स्थिति', required: true, type: 'select', options: caseStatusOptions },
        { id: 'incidentPlace', label: 'घटना स्थल', type: 'text', colSpan: 2 },
      ]
    },
    {
        title: "व्यक्तिगत विवरण",
        fields: [
            { id: 'complainantNameAddress', label: 'परिवादी का नाम व पता', type: 'textarea', colSpan: 2 },
            { id: 'accusedNameAddress', label: 'अपराधी का नाम व पता', type: 'textarea', colSpan: 2 },
            { id: 'investigatingOfficer', label: 'अनुसंधान अधिकारी का नाम', type: 'text', colSpan: 2 },
        ]
    },
    {
      title: "प्रकरण का विवरण",
      fields: [
          { id: 'caseSummary', label: 'प्रकरण का संक्षिप्त विवरण', type: 'textarea', rows: 4, colSpan: 2 },
          { id: 'casePropertyDetails', label: 'प्रकरण से संबंधित माल का विवरण', type: 'textarea', colSpan: 2 },
          { id: 'seizure', label: 'जब्ती', type: 'textarea' },
          { id: 'stolenProperty', label: 'मालमसरूखा', type: 'textarea' },
          { id: 'seizedPropertyAgain', label: 'माल व्याजाप्ता', type: 'textarea', colSpan: 2 },
      ]
    },
    {
      title: "आधिकारिक कार्यवाही",
      fields: [
          { id: 'policeResult', label: 'पुलिस नतिजा चालान/एफआर नम्बर व दिनांक', type: 'text' },
          { id: 'courtSubmissionDate', label: 'कोर्ट में चालान व एफआर पेश करने की दिनांक', type: 'date' },
          { id: 'fslDetails', label: 'एफएसएल का विवरण', type: 'textarea', colSpan: 2 },
      ]
    }
];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    fieldGroups.forEach(group => {
        group.fields.forEach(field => {
            if (field.required && !formData[field.id as keyof typeof formData]?.toString().trim()) {
                newErrors[field.id] = `${field.label} आवश्यक है।`;
            }
        });
    });
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    setErrors({});
    onSave(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{initialData ? 'प्रकरण संपादित करें' : 'नया प्रकरण बनाएं'}</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg space-y-8" noValidate>
        {fieldGroups.map((group, groupIndex) => (
            <fieldset key={groupIndex} className="border border-slate-300 dark:border-slate-600 rounded-md p-6">
                <legend className="text-lg font-semibold px-2 text-blue-600 dark:text-blue-400">{group.title}</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {group.fields.map(field => {
                        const wrapperClassName = field.colSpan === 2 ? 'md:col-span-2' : '';
                        
                        let fieldComponent;
                        switch(field.type) {
                            case 'textarea':
                                fieldComponent = <FormTextarea 
                                    label={field.label}
                                    id={field.id}
                                    value={formData[field.id as keyof typeof formData] || ''}
                                    onChange={handleChange}
                                    rows={field.rows || 3}
                                    error={errors[field.id]}
                                />;
                                break;
                            case 'select':
                                fieldComponent = <FormSelect
                                    label={field.label}
                                    id={field.id}
                                    value={formData[field.id as keyof typeof formData] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                    error={errors[field.id]}
                                >
                                    {field.options?.map(option => <option key={option} value={option}>{option}</option>)}
                                </FormSelect>;
                                break;
                            default:
                                fieldComponent = <FormInput 
                                    label={field.label}
                                    id={field.id}
                                    // FIX: Changed 'key of' to 'keyof' to fix TypeScript syntax error.
                                    value={formData[field.id as keyof typeof formData] || ''}
                                    onChange={handleChange}
                                    type={field.type}
                                    required={field.required}
                                    error={errors[field.id]}
                                />;
                        }

                        return <div key={field.id} className={wrapperClassName}>{fieldComponent}</div>;
                    })}
                </div>
            </fieldset>
        ))}

        <div className="flex justify-end space-x-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button type="button" onClick={onCancel} className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            रद्द करें
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors">
            {initialData ? 'अपडेट करें' : 'सहेजें'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseForm;
