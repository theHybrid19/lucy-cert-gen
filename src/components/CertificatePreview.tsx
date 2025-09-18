import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, Eye } from "lucide-react";
import QRCode from "qrcode";
import hospitalLogo from "@/assets/hospital-logo.png";
import doctorStamp from "@/assets/doctor-stamp.png";

interface CertificateData {
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

interface CertificatePreviewProps {
  data: CertificateData | null;
  referenceNumber: string;
}

export function CertificatePreview({ data, referenceNumber }: CertificatePreviewProps) {
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCodeRef.current && referenceNumber) {
      QRCode.toCanvas(qrCodeRef.current, referenceNumber, {
        width: 120,
        margin: 1,
        color: {
          dark: '#1a5f7a',
          light: '#ffffff'
        }
      }).catch(console.error);
    }
  }, [referenceNumber]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getSalutation = (sex: string) => {
    return sex === 'F' ? 'Ms.' : 'Mr.';
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePrint = () => {
    window.print();
  };

  if (!data) {
    return (
      <Card className="h-fit shadow-card">
        <CardHeader className="bg-gradient-header text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Certificate Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12 text-muted-foreground">
            Fill out the form to generate a certificate preview
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit shadow-card">
      <CardHeader className="bg-gradient-header text-primary-foreground rounded-t-lg no-print">
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Certificate Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div id="certificate-content" className="print-certificate">
          <div className="border-2 border-certificate-border p-8 rounded-certificate bg-certificate-bg shadow-certificate mb-6">
            {/* Certificate Header */}
            <div className="certificate-header text-center mb-6 pb-4 border-b-2 border-certificate-border">
              <img 
                src={hospitalLogo} 
                alt="Mama Lucy Kibaki Hospital Logo" 
                className="logo w-16 h-20 mx-auto mb-3"
              />
              <div className="hospital-name text-2xl font-bold text-certificate-header mb-1">
                MAMA LUCY KIBAKI HOSPITAL
              </div>
              <div className="hospital-address text-base mb-1">P.O. Box 20723-00202, Nairobi, Kenya</div>
              <div className="text-sm mb-4">Tel: +254 (0)20 802 2676 | www.mamalucykibakihospital.go.ke</div>
              
              <div className="document-title text-xl font-bold my-4 underline text-certificate-header">
                DOCTOR'S APPROVAL & MEDICAL ASSESSMENT
              </div>
              
              <div className="reference-info flex justify-between text-sm">
                <span>Internal Reference: {referenceNumber}</span>
                <span>Date Issued: {getCurrentDate()}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="qr-code flex justify-center mb-6">
              <canvas ref={qrCodeRef} />
            </div>

            {/* Patient Details */}
            <div className="patient-details grid grid-cols-2 gap-4 mb-6">
              <div className="detail-item mb-2">
                <span className="detail-label font-bold inline-block min-w-[140px]">Full Name:</span>
                <span>{data.patientName}</span>
              </div>
              <div className="detail-item mb-2">
                <span className="detail-label font-bold inline-block min-w-[140px]">Patient ID No.:</span>
                <span>{data.patientID}</span>
              </div>
              <div className="detail-item mb-2">
                <span className="detail-label font-bold inline-block min-w-[140px]">Age:</span>
                <span>{data.patientAge}</span>
              </div>
              <div className="detail-item mb-2">
                <span className="detail-label font-bold inline-block min-w-[140px]">Sex:</span>
                <span>{data.patientSex === 'M' ? 'Male' : 'Female'}</span>
              </div>
              <div className="detail-item mb-2">
                <span className="detail-label font-bold inline-block min-w-[140px]">Date of Examination:</span>
                <span>{formatDate(data.examDate)}</span>
              </div>
              <div className="detail-item mb-2">
                <span className="detail-label font-bold inline-block min-w-[140px]">Clinic Reference:</span>
                <span>{data.clinicReference}</span>
              </div>
              <div className="detail-item mb-2 col-span-2">
                <span className="detail-label font-bold inline-block min-w-[140px]">Employer:</span>
                <span>{data.employer || 'N/A'}</span>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="space-y-4">
              <p><strong>TO WHOM IT MAY CONCERN,</strong></p>
              <p>
                Following medical examination of {getSalutation(data.patientSex)} {data.patientName} at our facility, I am providing this medical advisory based on clinical assessment. My clinical evaluation indicates that {getSalutation(data.patientSex)} {data.patientName} has {data.diagnosis}, which requires appropriate medical management.
              </p>
              
              {data.reviewDate && (
                <div className="assessment-section mt-4">
                  <p>
                    <strong>Follow-up appointment scheduled:</strong> {formatDate(data.reviewDate)}
                  </p>
                </div>
              )}
              
              <div className="mt-4">
                <p><strong>Clinical Recommendations:</strong></p>
                <p className="mt-1 italic">{data.recommendations || 'Continue with prescribed treatment and follow medical advice as directed.'}</p>
              </div>
            </div>

            {/* Physician Section */}
            <div className="physician-section mt-8 pt-5 border-t border-gray-300">
              <div className="detail-item mb-2">
                <span className="detail-label font-bold inline-block min-w-[140px]">Doctor's Name:</span>
                <span>{data.doctorName}</span>
              </div>
              <div className="signature-section mt-8 flex items-center gap-8">
                <div className="signature-line border-t border-black w-60">
                  <p className="mt-1">Signature</p>
                </div>
                <div className="stamp-area">
                  <img 
                    src={doctorStamp} 
                    alt="Doctor's Official Stamp" 
                    className="w-20 h-20"
                  />
                </div>
              </div>
              
              <div className="detail-item mt-4">
                <span className="detail-label font-bold inline-block min-w-[140px]">Stamp & License No.:</span>
                <span>{data.licenseNo}</span>
              </div>
            </div>

            {/* Authentication */}
            <div className="authentication mt-6 text-xs text-gray-600">
              <p>
                This certificate was verified and logged into the MLKH system on {getCurrentDate()} by System Administrator.
              </p>
              <p className="italic mt-1">
                Disclaimer: Official MLKH document. Unauthorized alteration invalidates. For verification, contact Hospital Administration with reference number.
              </p>
            </div>
          </div>
        </div>

        <Button 
          onClick={handlePrint} 
          className="w-full bg-success hover:bg-success/90 text-success-foreground no-print"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Certificate
        </Button>
      </CardContent>
    </Card>
  );
}