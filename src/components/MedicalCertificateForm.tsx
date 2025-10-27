import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, FileText, RotateCcw } from "lucide-react";

interface FormData {
  patientName: string;
  admissionDate: string;
  leaveDuration: string;
  doctorName: string;
  doctorTitle: string;
}

interface MedicalCertificateFormProps {
  onGenerate: (data: FormData) => void;
  onReset: () => void;
}

export function MedicalCertificateForm({ onGenerate, onReset }: MedicalCertificateFormProps) {
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    admissionDate: '',
    leaveDuration: 'three day',
    doctorName: '',
    doctorTitle: 'Attending Physician'
  });


  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const handleResetForm = () => {
    setFormData({
      patientName: '',
      admissionDate: '',
      leaveDuration: 'three day',
      doctorName: '',
      doctorTitle: 'Attending Physician'
    });
    onReset();
  };

  return (
    <Card className="h-fit shadow-card">
      <CardHeader className="bg-gradient-header text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Medical Leave Letter Form
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-medical-blue flex items-center gap-2">
              <User className="w-4 h-4" />
              Patient Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="patientName" className="text-medical-blue font-medium">Patient Full Name</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  placeholder="Enter patient's full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="admissionDate" className="text-medical-blue font-medium">Admission Date</Label>
                <Input
                  id="admissionDate"
                  type="date"
                  value={formData.admissionDate}
                  onChange={(e) => handleInputChange("admissionDate", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Leave Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-medical-blue flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Medical Leave Details
            </h3>
            
            <div>
              <Label htmlFor="leaveDuration" className="text-medical-blue font-medium">Recommended Leave Duration</Label>
              <Input
                id="leaveDuration"
                value={formData.leaveDuration}
                onChange={(e) => handleInputChange("leaveDuration", e.target.value)}
                placeholder="e.g., three day, one week, two weeks"
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* Doctor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-medical-blue">Doctor Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="doctorName" className="text-medical-blue font-medium">Doctor's Name</Label>
                <Input
                  id="doctorName"
                  value={formData.doctorName}
                  onChange={(e) => handleInputChange("doctorName", e.target.value)}
                  placeholder="e.g., Dr. Dan Indah"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="doctorTitle" className="text-medical-blue font-medium">Medical Title</Label>
                <Input
                  id="doctorTitle"
                  value={formData.doctorTitle}
                  onChange={(e) => handleInputChange("doctorTitle", e.target.value)}
                  placeholder="e.g., Attending Physician, Chief Medical Officer"
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-medical-blue hover:bg-primary-hover">
              Generate Letter
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleResetForm}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}