import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Check, 
  Mic, 
  MicOff, 
  Volume2, 
  Info,
  User,
  MapPin,
  AlertTriangle,
  FileText,
  Eye
} from 'lucide-react';

// Types
interface FIRFormData {
  complainantName: string;
  fatherName: string;
  age: number | string;
  gender: 'male' | 'female' | 'other' | '';
  occupation: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  crimeType: string;
  incidentDescription: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical' | '';
  witnessDetails: string;
  evidenceDetails: string;
  previousComplaint: boolean;
  previousComplaintDetails: string;
}

interface FormField {
  name: keyof FIRFormData;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  description: string;
  options?: Array<{ value: string; label: string }>;
}

interface FormStep {
  title: string;
  description: string;
  icon: any;
  fields: FormField[];
}

// Constants
const CRIME_TYPES = [
  { value: 'theft', label: 'Theft' },
  { value: 'robbery', label: 'Robbery' },
  { value: 'assault', label: 'Assault' },
  { value: 'fraud', label: 'Fraud' },
  { value: 'domestic_violence', label: 'Domestic Violence' },
  { value: 'cybercrime', label: 'Cybercrime' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'vandalism', label: 'Vandalism' },
  { value: 'other', label: 'Other' }
];

const FIR_FORM_STEPS: FormStep[] = [
  {
    title: 'Personal Information',
    description: 'Please provide your personal details',
    icon: User,
    fields: [
      {
        name: 'complainantName',
        label: 'Full Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your full name',
        description: 'Your complete legal name as per identity documents'
      },
      {
        name: 'fatherName',
        label: "Father's Name",
        type: 'text',
        required: true,
        placeholder: "Enter your father's name",
        description: "Your father's complete name"
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        required: true,
        placeholder: 'Enter your age',
        description: 'Your current age in years'
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio',
        required: true,
        description: 'Select your gender',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        name: 'occupation',
        label: 'Occupation',
        type: 'text',
        required: true,
        placeholder: 'Enter your occupation',
        description: 'Your current profession or job'
      }
    ]
  },
  {
    title: 'Contact Information',
    description: 'Please provide your contact details',
    icon: MapPin,
    fields: [
      {
        name: 'address',
        label: 'Address',
        type: 'textarea',
        required: true,
        placeholder: 'Enter your complete address',
        description: 'Your complete residential address'
      },
      {
        name: 'city',
        label: 'City',
        type: 'text',
        required: true,
        placeholder: 'Enter your city',
        description: 'City where you reside'
      },
      {
        name: 'state',
        label: 'State',
        type: 'text',
        required: true,
        placeholder: 'Enter your state',
        description: 'State where you reside'
      },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: 'Enter your phone number',
        description: 'Your primary contact number'
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: false,
        placeholder: 'Enter your email address',
        description: 'Your email address for communication'
      }
    ]
  },
  {
    title: 'Incident Details',
    description: 'Please provide details about the incident',
    icon: AlertTriangle,
    fields: [
      {
        name: 'incidentDate',
        label: 'Incident Date',
        type: 'date',
        required: true,
        description: 'Date when the incident occurred'
      },
      {
        name: 'incidentTime',
        label: 'Incident Time',
        type: 'time',
        required: true,
        description: 'Approximate time when the incident occurred'
      },
      {
        name: 'incidentLocation',
        label: 'Incident Location',
        type: 'textarea',
        required: true,
        placeholder: 'Describe where the incident occurred',
        description: 'Complete address or location where the incident happened'
      },
      {
        name: 'crimeType',
        label: 'Type of Crime',
        type: 'select',
        required: true,
        description: 'Select the type of crime that occurred',
        options: CRIME_TYPES
      },
      {
        name: 'incidentDescription',
        label: 'Incident Description',
        type: 'textarea',
        required: true,
        placeholder: 'Provide detailed description of the incident',
        description: 'Detailed description of what happened'
      },
      {
        name: 'urgencyLevel',
        label: 'Urgency Level',
        type: 'radio',
        required: true,
        description: 'How urgent is this matter?',
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'critical', label: 'Critical' }
        ]
      }
    ]
  },
  {
    title: 'Evidence & Witnesses',
    description: 'Please provide information about evidence and witnesses',
    icon: FileText,
    fields: [
      {
        name: 'witnessDetails',
        label: 'Witness Information',
        type: 'textarea',
        required: false,
        placeholder: 'Provide details about witnesses if any',
        description: 'Information about people who witnessed the incident'
      },
      {
        name: 'evidenceDetails',
        label: 'Evidence Details',
        type: 'textarea',
        required: false,
        placeholder: 'Describe any evidence you have',
        description: 'Details about any evidence related to the incident'
      },
      {
        name: 'previousComplaint',
        label: 'Previous Complaint Filed',
        type: 'checkbox',
        required: false,
        description: 'Have you filed a complaint about this matter before?'
      },
      {
        name: 'previousComplaintDetails',
        label: 'Previous Complaint Details',
        type: 'textarea',
        required: false,
        placeholder: 'Provide details about previous complaint',
        description: 'Details about any previous complaint filed'
      }
    ]
  }
];

// Components
const FormProgressBar = ({ currentStep, totalSteps, stepTitles }: any) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        {stepTitles.map((title: string, index: number) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : index === currentStep
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}>
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs mt-2 text-center max-w-20 leading-tight ${
                index <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
              }`}>
                {title}
              </span>
            </div>
            {index < stepTitles.length - 1 && (
              <div className="flex-1 mx-4">
                <div className="h-0.5 bg-gray-200 relative overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: index < currentStep ? '100%' : '0%' }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const InputField = ({ field, value, onChange, error }: any) => {
  const [isRecording, setIsRecording] = useState(false);
  
  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  const renderInput = () => {
    const commonClasses = `w-full px-3 py-2 border rounded-md transition-colors ${
      error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
    } focus:outline-none focus:ring-1 focus:ring-blue-500`;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className={`${commonClasses} resize-none`}
            rows={4}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
          />
        );
      
      case 'select':
        return (
          <select
            className={commonClasses}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map((option: any) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm">{field.label}</span>
          </label>
        );
      
      default:
        return (
          <input
            type={field.type}
            className={commonClasses}
            value={value || ''}
            onChange={(e) => {
              const newValue = field.type === 'number' ? 
                parseFloat(e.target.value) || '' : e.target.value;
              onChange(newValue);
            }}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Play field description"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title={field.description}
          >
            <Info className="w-4 h-4" />
          </button>
          {field.type !== 'checkbox' && (
            <button
              type="button"
              onClick={handleRecord}
              className={`p-1 transition-colors ${
                isRecording 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title={isRecording ? 'Stop recording' : 'Start voice input'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        {renderInput()}
        
        {isRecording && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium animate-pulse">
            Recording...
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

const LivePreview = ({ formData }: { formData: Partial<FIRFormData> }) => {
  const formatValue = (key: string, value: any) => {
    if (!value) return 'Not provided';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (key === 'crimeType') return CRIME_TYPES.find(type => type.value === value)?.label || value;
    return value;
  };

  const sections = [
    {
      title: 'Personal Information',
      fields: ['complainantName', 'fatherName', 'age', 'gender', 'occupation']
    },
    {
      title: 'Contact Information', 
      fields: ['address', 'city', 'state', 'phoneNumber', 'email']
    },
    {
      title: 'Incident Details',
      fields: ['incidentDate', 'incidentTime', 'incidentLocation', 'crimeType', 'incidentDescription', 'urgencyLevel']
    },
    {
      title: 'Evidence & Witnesses',
      fields: ['witnessDetails', 'evidenceDetails', 'previousComplaint', 'previousComplaintDetails']
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
      </div>
      
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="border-b pb-4 last:border-b-0">
            <h4 className="font-medium text-gray-800 mb-3 text-sm">{section.title}</h4>
            <div className="space-y-2">
              {section.fields.map((fieldName) => {
                const field = FIR_FORM_STEPS.flatMap(step => step.fields)
                  .find(f => f.name === fieldName);
                const value = formData[fieldName as keyof FIRFormData];
                
                return (
                  <div key={fieldName} className="flex justify-between text-xs">
                    <span className="text-gray-600 font-medium">{field?.label}:</span>
                    <span className={`text-gray-800 max-w-32 text-right ${
                      value ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {formatValue(fieldName, value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function FIRComplaintForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<FIRFormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStepData = FIR_FORM_STEPS[currentStep];

  const updateFormData = (field: keyof FIRFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    currentStepData.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name];
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < FIR_FORM_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!finalConfirmation) {
      alert('Please confirm the form details before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('FIR submitted successfully! You will receive a confirmation email shortly.');
      
    } catch (error) {
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastStep = currentStep === FIR_FORM_STEPS.length - 1;
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">FIR Complaint Form</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete this form to file a First Information Report (FIR). Use voice input for easier completion.
          </p>
        </div>

        {/* Progress Bar */}
        <FormProgressBar
          currentStep={currentStep}
          totalSteps={FIR_FORM_STEPS.length}
          stepTitles={FIR_FORM_STEPS.map(step => step.title)}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <div>
                      <h2 className="text-xl font-semibold">{currentStepData.title}</h2>
                      <p className="text-blue-100 text-sm">{currentStepData.description}</p>
                    </div>
                  </div>
                  <span className="text-sm bg-blue-500 px-3 py-1 rounded-full">
                    Step {currentStep + 1} of {FIR_FORM_STEPS.length}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {currentStepData.fields.map((field) => (
                    <InputField
                      key={field.name}
                      field={field}
                      value={formData[field.name]}
                      onChange={(value: any) => updateFormData(field.name, value)}
                      error={errors[field.name]}
                    />
                  ))}

                  {/* Final Confirmation Step */}
                  {isLastStep && (
                    <div className="border-t pt-6 space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Final Confirmation</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Please review your form details and confirm below.
                        </p>
                        
                        <div className="space-y-3">
                          <button
                            type="button"
                            className="w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
                          >
                            Read Complete Form Aloud
                          </button>
                          
                          <label className="flex items-start space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={finalConfirmation}
                              onChange={(e) => setFinalConfirmation(e.target.checked)}
                              className="w-4 h-4 text-blue-600 mt-0.5"
                            />
                            <span className="text-sm text-gray-700">
                              I confirm that all the information provided is true and accurate to the best of my knowledge
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t mt-6">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {isLastStep ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!finalConfirmation || isSubmitting}
                      className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit FIR
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="lg:col-span-1">
            <LivePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}