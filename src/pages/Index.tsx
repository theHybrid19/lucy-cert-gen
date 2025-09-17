import { useState } from "react";
import { MedicalCertificateForm } from "@/components/MedicalCertificateForm";
import { CertificatePreview } from "@/components/CertificatePreview";
import hospitalLogo from "@/assets/hospital-logo.png";
import { Card, CardContent } from "@/components/ui/card";

interface CertificateData {
  patientName: string;
  patientID: string;
  patientAge: string;
  patientSex: string;
  examDate: string;
  clinicReference: string;
  employer: string;
  diagnosis: string;
  fitness: string;
  leaveDays: string;
  leaveFrom: string;
  leaveTo: string;
  resumeDate: string;
  reviewDate: string;
  resumeDateFit: string;
  recommendations: string;
  doctorName: string;
  licenseNo: string;
}

const Index = () => {
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");

  const generateReferenceNumber = () => {
    return 'MLKH-MC-' + Math.floor(100000 + Math.random() * 900000);
  };

  const handleGenerate = (data: CertificateData) => {
    setCertificateData(data);
    setReferenceNumber(generateReferenceNumber());
  };

  const handleReset = () => {
    setCertificateData(null);
    setReferenceNumber("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-header text-primary-foreground py-6 mb-8 shadow-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <img 
              src={hospitalLogo} 
              alt="Mama Lucy Kibaki Hospital Logo" 
              className="w-12 h-14"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Mama Lucy Kibaki Hospital</h1>
              <p className="text-xl opacity-90">Medical Certificate Generator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <MedicalCertificateForm 
              onGenerate={handleGenerate}
              onReset={handleReset}
            />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <CertificatePreview 
              data={certificateData}
              referenceNumber={referenceNumber}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted text-center py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground">
            Mama Lucy Kibaki Hospital © 2024 | Medical Certificate Generator v1.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
