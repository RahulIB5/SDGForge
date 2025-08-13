export interface FIRFormData {
    // Personal Information
    complainantName: string;
    fatherName: string;
    dateOfBirth: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    occupation: string;
    nationality: string;
    
    // Contact Information
    address: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    phoneNumber: string;
    email: string;
    
    // Incident Details
    incidentDate: string;
    incidentTime: string;
    incidentLocation: string;
    incidentDescription: string;
    crimeType: string;
    suspectDescription: string;
    witnessDetails: string;
    evidenceDetails: string;
    
    // Legal Information
    policeStation: string;
    officerName: string;
    firNumber?: string;
    registrationDate?: string;
    
    // Additional Information
    previousComplaint: boolean;
    previousComplaintDetails?: string;
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
    additionalNotes: string;
  }
  
  export interface FormStep {
    id: string;
    title: string;
    description: string;
    fields: FormField[];
  }
  
  export interface FormField {
    name: keyof FIRFormData;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'date' | 'time' | 'number' | 'email' | 'tel' | 'radio' | 'checkbox';
    required: boolean;
    placeholder?: string;
    options?: { value: string; label: string }[];
    validation?: {
      min?: number;
      max?: number;
      pattern?: RegExp;
      message?: string;
    };
    description: string;
    voiceDescription: string;
  }
  
  export const FIR_FORM_STEPS: FormStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Provide your personal details for the FIR',
      fields: [
        {
          name: 'complainantName',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your complete legal name',
          description: 'Your full legal name as per official documents',
          voiceDescription: 'Please provide your complete legal name as it appears on your official identification documents'
        },
        {
          name: 'fatherName',
          label: "Father's Name",
          type: 'text',
          required: true,
          placeholder: "Enter your father's full name",
          description: "Your father's complete legal name",
          voiceDescription: "Please provide your father's complete legal name as it appears on official documents"
        },
        {
          name: 'dateOfBirth',
          label: 'Date of Birth',
          type: 'date',
          required: true,
          description: 'Your date of birth in DD/MM/YYYY format',
          voiceDescription: 'Please provide your date of birth. This helps establish your legal age and identity'
        },
        {
          name: 'age',
          label: 'Age',
          type: 'number',
          required: true,
          validation: { min: 1, max: 120 },
          description: 'Your current age in years',
          voiceDescription: 'Please provide your current age in completed years'
        },
        {
          name: 'gender',
          label: 'Gender',
          type: 'radio',
          required: true,
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ],
          description: 'Select your gender identity',
          voiceDescription: 'Please select your gender identity from the available options'
        },
        {
          name: 'occupation',
          label: 'Occupation',
          type: 'text',
          required: true,
          placeholder: 'Enter your current occupation',
          description: 'Your current job or profession',
          voiceDescription: 'Please provide details about your current occupation or profession'
        },
        {
          name: 'nationality',
          label: 'Nationality',
          type: 'text',
          required: true,
          placeholder: 'Enter your nationality',
          description: 'Your legal nationality or citizenship',
          voiceDescription: 'Please provide your legal nationality or citizenship status'
        }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'Provide your contact and address details',
      fields: [
        {
          name: 'address',
          label: 'Complete Address',
          type: 'textarea',
          required: true,
          placeholder: 'Enter your complete residential address',
          description: 'Your full residential address including house number, street, locality',
          voiceDescription: 'Please provide your complete residential address including house number, street name, and locality details'
        },
        {
          name: 'city',
          label: 'City',
          type: 'text',
          required: true,
          placeholder: 'Enter your city',
          description: 'City where you currently reside',
          voiceDescription: 'Please provide the name of the city where you currently reside'
        },
        {
          name: 'district',
          label: 'District',
          type: 'text',
          required: true,
          placeholder: 'Enter your district',
          description: 'Administrative district of your residence',
          voiceDescription: 'Please provide the administrative district where your residence is located'
        },
        {
          name: 'state',
          label: 'State',
          type: 'text',
          required: true,
          placeholder: 'Enter your state',
          description: 'State or union territory of residence',
          voiceDescription: 'Please provide the state or union territory where you reside'
        },
        {
          name: 'pincode',
          label: 'PIN Code',
          type: 'text',
          required: true,
          placeholder: 'Enter 6-digit PIN code',
          validation: { pattern: /^\d{6}$/, message: 'PIN code must be 6 digits' },
          description: 'Six-digit postal code of your area',
          voiceDescription: 'Please provide the six-digit postal PIN code of your residential area'
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'tel',
          required: true,
          placeholder: 'Enter your mobile number',
          validation: { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits' },
          description: 'Your primary contact mobile number',
          voiceDescription: 'Please provide your primary mobile contact number with 10 digits'
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: false,
          placeholder: 'Enter your email address',
          description: 'Your email address for communication',
          voiceDescription: 'Please provide your email address for official communication purposes'
        }
      ]
    },
    {
      id: 'incident',
      title: 'Incident Details',
      description: 'Provide complete details about the incident',
      fields: [
        {
          name: 'incidentDate',
          label: 'Date of Incident',
          type: 'date',
          required: true,
          description: 'When did the incident occur?',
          voiceDescription: 'Please provide the exact date when the incident occurred'
        },
        {
          name: 'incidentTime',
          label: 'Time of Incident',
          type: 'time',
          required: true,
          description: 'Approximate time when the incident happened',
          voiceDescription: 'Please provide the approximate time when the incident took place'
        },
        {
          name: 'incidentLocation',
          label: 'Location of Incident',
          type: 'textarea',
          required: true,
          placeholder: 'Describe the exact location where incident occurred',
          description: 'Detailed location where the incident took place',
          voiceDescription: 'Please provide the detailed location and address where the incident occurred'
        },
        {
          name: 'crimeType',
          label: 'Type of Crime',
          type: 'select',
          required: true,
          options: [
            { value: 'theft', label: 'Theft' },
            { value: 'robbery', label: 'Robbery' },
            { value: 'assault', label: 'Assault' },
            { value: 'fraud', label: 'Fraud' },
            { value: 'harassment', label: 'Harassment' },
            { value: 'cybercrime', label: 'Cyber Crime' },
            { value: 'domestic_violence', label: 'Domestic Violence' },
            { value: 'kidnapping', label: 'Kidnapping' },
            { value: 'murder', label: 'Murder' },
            { value: 'other', label: 'Other' }
          ],
          description: 'Category of crime that occurred',
          voiceDescription: 'Please select the category that best describes the type of crime that occurred'
        },
        {
          name: 'incidentDescription',
          label: 'Detailed Description',
          type: 'textarea',
          required: true,
          placeholder: 'Provide a detailed account of what happened...',
          description: 'Complete narrative of the incident',
          voiceDescription: 'Please provide a detailed and complete account of what happened during the incident'
        },
        {
          name: 'suspectDescription',
          label: 'Suspect Description',
          type: 'textarea',
          required: false,
          placeholder: 'Describe the suspect if known...',
          description: 'Physical description and details about the perpetrator',
          voiceDescription: 'If you saw or know the perpetrator, please provide their physical description and any identifying details'
        }
      ]
    },
    {
      id: 'evidence',
      title: 'Evidence & Witnesses',
      description: 'Information about evidence and witnesses',
      fields: [
        {
          name: 'witnessDetails',
          label: 'Witness Information',
          type: 'textarea',
          required: false,
          placeholder: 'Provide details of any witnesses...',
          description: 'Names and contact details of witnesses',
          voiceDescription: 'Please provide the names and contact information of any witnesses who saw the incident'
        },
        {
          name: 'evidenceDetails',
          label: 'Evidence Description',
          type: 'textarea',
          required: false,
          placeholder: 'Describe any evidence you have...',
          description: 'Description of physical evidence, documents, or digital proof',
          voiceDescription: 'Please describe any physical evidence, documents, photographs, or digital proof related to the incident'
        },
        {
          name: 'urgencyLevel',
          label: 'Urgency Level',
          type: 'radio',
          required: true,
          options: [
            { value: 'low', label: 'Low - Can wait for normal processing' },
            { value: 'medium', label: 'Medium - Requires prompt attention' },
            { value: 'high', label: 'High - Urgent matter' },
            { value: 'critical', label: 'Critical - Immediate action required' }
          ],
          description: 'How urgent is this matter?',
          voiceDescription: 'Please indicate the urgency level of this complaint based on the severity and immediate threat'
        },
        {
          name: 'previousComplaint',
          label: 'Previous Complaint',
          type: 'checkbox',
          required: false,
          description: 'Have you filed a complaint about this matter before?',
          voiceDescription: 'Please indicate if you have previously filed any complaint regarding this matter'
        },
        {
          name: 'previousComplaintDetails',
          label: 'Previous Complaint Details',
          type: 'textarea',
          required: false,
          placeholder: 'If yes, provide details of previous complaint...',
          description: 'Details about any previous complaints filed',
          voiceDescription: 'If you have filed a previous complaint, please provide the details including FIR number and police station'
        },
        {
          name: 'additionalNotes',
          label: 'Additional Information',
          type: 'textarea',
          required: false,
          placeholder: 'Any additional information you want to provide...',
          description: 'Any other relevant information',
          voiceDescription: 'Please provide any additional information that you think might be relevant to this case'
        }
      ]
    }
  ];
  
  export const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'ur', name: 'اردو (Urdu)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' }
  ];
  