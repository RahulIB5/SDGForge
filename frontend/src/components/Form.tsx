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
  Eye,
  ArrowRight,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Star,
  Phone,
  Mail,
  Globe
} from 'lucide-react';



// Landing Page Component
const ServicesLandingPage = ({ onNavigateToForm }: { onNavigateToForm: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Digital Police Services</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Phone className="w-4 h-4" />
                Emergency: 100
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Globe className="w-4 h-4" />
                Language
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Digital Police Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Access police services digitally with ease. File complaints, track cases, and get assistance through our comprehensive online platform.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">FIRs Filed Online</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Service Availability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h3>
          
          {/* FIR Form Service Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FIR Complaint Form Card */}
            <div className="group bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-900 mb-4">File FIR Online</h4>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  File a First Information Report (FIR) digitally with voice assistance and real-time preview. Complete the process from the comfort of your home.
                </p>

                {/* Key Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Voice Input Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Real-time Form Preview</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Multi-step Guided Process</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Instant Acknowledgment</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h5 className="font-semibold text-blue-900 mb-2">What is FIR?</h5>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    A First Information Report (FIR) is a written document prepared by police when they receive information about the commission of a cognizable offense. It's the first step in the criminal justice process.
                  </p>
                </div>

                {/* When to Use */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">When to File FIR:</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Theft
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Assault
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Fraud
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Cybercrime
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Harassment
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Other crimes
                    </div>
                  </div>
                </div>

                {/* Process Timeline */}
                <div className="mb-8">
                  <h5 className="font-semibold text-gray-900 mb-3">Simple 4-Step Process:</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">1</span>
                      </div>
                      <span className="text-sm text-gray-600">Personal Information</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">2</span>
                      </div>
                      <span className="text-sm text-gray-600">Contact Details</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">3</span>
                      </div>
                      <span className="text-sm text-gray-600">Incident Information</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">4</span>
                      </div>
                      <span className="text-sm text-gray-600">Evidence & Submit</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onNavigateToForm}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Start Filing FIR
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Additional Service Cards */}
            <div className="group bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">Coming Soon</span>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Track Your Case</h4>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Monitor the progress of your filed complaints and get real-time updates on case status.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Real-time Status Updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">SMS & Email Notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Investigation Timeline</span>
                  </div>
                </div>

                <button className="w-full bg-gray-200 text-gray-500 py-4 px-6 rounded-xl font-semibold cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">Coming Soon</span>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Police Verification</h4>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Apply for police verification certificates for various purposes like employment, visa, etc.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Online Application</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Document Upload</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Status Tracking</span>
                  </div>
                </div>

                <button className="w-full bg-gray-200 text-gray-500 py-4 px-6 rounded-xl font-semibold cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Digital Platform?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Availability</h4>
              <p className="text-gray-600">File complaints anytime, anywhere without visiting the police station.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure & Safe</h4>
              <p className="text-gray-600">Your data is encrypted and protected with bank-level security.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Voice Assistance</h4>
              <p className="text-gray-600">Use voice input to fill forms easily in multiple languages.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Instant Receipt</h4>
              <p className="text-gray-600">Get immediate acknowledgment and FIR number upon submission.</p>
            </div>
          </div>
        </div>
      </section>

      

      
    </div>
  );
};
export default ServicesLandingPage;

