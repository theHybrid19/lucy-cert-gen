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
  patientID: string;
  patientAge: string;
  patientSex: string;
  examDate: string;
  clinicReference: string;
  employer: string;
  diagnosis: string;
  reviewDate: string;
  recommendations: string;
  doctorName: string;
  licenseNo: string;
}

interface MedicalCertificateFormProps {
  onGenerate: (data: FormData) => void;
  onReset: () => void;
}

export function MedicalCertificateForm({ onGenerate, onReset }: MedicalCertificateFormProps) {
  const [formData, setFormData] = useState<FormData>({
    patientName: "Ms. Oloo",
    patientID: "",
    patientAge: "",
    patientSex: "F",
    examDate: "2025-09-12",
    clinicReference: "KNH/KPCC/021",
    employer: "",
    diagnosis: "",
    reviewDate: "",
    recommendations: "",
    doctorName: "Dr. Mand",
    licenseNo: "MPDB NO. A16013"
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
      patientName: "",
      patientID: "",
      patientAge: "",
      patientSex: "",
      examDate: "",
      clinicReference: "",
      employer: "",
      diagnosis: "",
      reviewDate: "",
      recommendations: "",
      doctorName: "",
      licenseNo: ""
    });
    onReset();
  };

  return (
    <Card className="h-fit shadow-card">
      <CardHeader className="bg-gradient-header text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Certificate Details
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
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="patientID" className="text-medical-blue font-medium">Patient ID Number</Label>
                <Input
                  id="patientID"
                  value={formData.patientID}
                  onChange={(e) => handleInputChange("patientID", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientAge" className="text-medical-blue font-medium">Age</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.patientAge}
                    onChange={(e) => handleInputChange("patientAge", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="patientSex" className="text-medical-blue font-medium">Sex</Label>
                  <Select value={formData.patientSex} onValueChange={(value) => handleInputChange("patientSex", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="F">Female</SelectItem>
                      <SelectItem value="M">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-medical-blue flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Medical Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="examDate" className="text-medical-blue font-medium">Date of Examination</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => handleInputChange("examDate", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="clinicReference" className="text-medical-blue font-medium">Clinic Reference Number</Label>
                <Input
                  id="clinicReference"
                  value={formData.clinicReference}
                  onChange={(e) => handleInputChange("clinicReference", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="employer" className="text-medical-blue font-medium">Employer (If applicable)</Label>
                <Input
                  id="employer"
                  value={formData.employer}
                  onChange={(e) => handleInputChange("employer", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="diagnosis" className="text-medical-blue font-medium">Diagnosis</Label>
                <Textarea
                  id="diagnosis"
                  rows={2}
                  value={formData.diagnosis}
                  onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Medical Assessment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-medical-blue">Medical Assessment & Recommendations</h3>
            
            <div>
              <Label htmlFor="reviewDate" className="text-medical-blue font-medium">Follow-up Appointment Date</Label>
              <Input
                id="reviewDate"
                type="date"
                value={formData.reviewDate}
                onChange={(e) => handleInputChange("reviewDate", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="recommendations" className="text-medical-blue font-medium">Clinical Recommendations</Label>
              <Textarea
                id="recommendations"
                rows={3}
                value={formData.recommendations}
                onChange={(e) => handleInputChange("recommendations", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Doctor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-medical-blue">Doctor Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="doctorName" className="text-medical-blue font-medium">Doctor's Name & Title</Label>
                <Input
                  id="doctorName"
                  value={formData.doctorName}
                  onChange={(e) => handleInputChange("doctorName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="licenseNo" className="text-medical-blue font-medium">Practising License Number</Label>
                <Input
                  id="licenseNo"
                  value={formData.licenseNo}
                  onChange={(e) => handleInputChange("licenseNo", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-medical-blue hover:bg-primary-hover">
              Generate Certificate
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