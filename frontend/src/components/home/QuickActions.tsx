import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Scale, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    { 
      icon: FileText, 
      label: 'Legal Forms', 
      color: 'text-blue-600',
      onClick: () => navigate('/services'),
      description: 'File FIR and other legal documents'
    },
    { 
      icon: MessageSquare, 
      label: 'Contact Us', 
      color: 'text-green-600',
      onClick: () => console.log('Contact Us clicked'),
      description: 'Get in touch with support'
    },
    { 
      icon: Scale, 
      label: 'Legal Docs', 
      color: 'text-purple-600',
      onClick: () => console.log('Legal Docs clicked'),
      description: 'View legal documents'
    },
    { 
      icon: User, 
      label: 'Profile', 
      color: 'text-gray-600',
      onClick: () => console.log('Profile clicked'),
      description: 'Manage your profile'
    },
  ];

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                onClick={action.onClick}
                className="w-full h-24 flex flex-col gap-2 p-4 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 border-2 hover:border-blue-300 transition-all duration-300 group"
              >
                <action.icon className={`h-7 w-7 ${action.color} group-hover:scale-110 transition-transform duration-200`} />
                <span className="text-sm font-medium text-gray-800">{action.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Info Section */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Legal Forms Available</span>
          </div>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• FIR Complaint Filing</li>
            <li>• Police Verification (Coming Soon)</li>
            <li>• Case Tracking (Coming Soon)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export { QuickActions };
