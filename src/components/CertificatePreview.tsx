import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, Eye } from "lucide-react";
import QRCode from "qrcode";
import hospitalLogo from "@/assets/hospital-logo.png";

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
    const certificateElement = document.getElementById('certificate-content');
    if (certificateElement) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Medical Certificate - ${data?.patientName}</title>
              <style>
                @media print {
                  @page { margin: 1cm; size: A4; }
                  body { margin: 0; font-family: 'Times New Roman', serif; }
                }
                body { margin: 0; font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.4; }
                .certificate { border: 2px solid #1a5f7a; padding: 30px; border-radius: 10px; background: white; }
                .certificate-header { text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #1a5f7a; }
                .hospital-name { font-size: 24px; font-weight: bold; color: #1a5f7a; margin-bottom: 5px; }
                .hospital-address { font-size: 16px; margin-bottom: 5px; }
                .document-title { font-size: 20px; font-weight: bold; margin: 15px 0; text-decoration: underline; color: #1a5f7a; }
                .reference-info { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 14px; }
                .patient-details { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
                .detail-item { margin-bottom: 10px; }
                .detail-label { font-weight: bold; display: inline-block; min-width: 140px; }
                .assessment-section { margin: 20px 0; }
                .physician-section { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
                .signature-line { margin-top: 60px; border-top: 1px solid #333; width: 300px; }
                .authentication { margin-top: 20px; font-size: 12px; color: #666; }
                .qr-code { margin: 15px 0; display: flex; justify-content: center; }
                .logo { width: 60px; height: 70px; margin-bottom: 10px; }
              </style>
            </head>
            <body>
              ${certificateElement.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    }
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
      <CardHeader className="bg-gradient-header text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Certificate Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div id="certificate-content" className="certificate-preview">
          <div className="border-2 border-certificate-border p-8 rounded-certificate bg-certificate-bg shadow-certificate mb-6">
            {/* Certificate Header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-certificate-border">
              <img 
                src={hospitalLogo} 
                alt="Mama Lucy Kibaki Hospital Logo" 
                className="w-16 h-20 mx-auto mb-3"
              />
              <div className="text-2xl font-bold text-certificate-header mb-1">
                MAMA LUCY KIBAKI HOSPITAL
              </div>
              <div className="text-base mb-1">P.O. Box 20723 - 00202, Nairobi, Kenya</div>
              <div className="text-sm mb-4">Tel: +254 (0)20 273 0XXX | www.mamalucykibakihospital.go.ke</div>
              
              <div className="text-xl font-bold my-4 underline text-certificate-header">
                DOCTOR'S APPROVAL & MEDICAL CERTIFICATE OF FITNESS
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Internal Reference: {referenceNumber}</span>
                <span>Date Issued: {getCurrentDate()}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <canvas ref={qrCodeRef} />
            </div>

            {/* Patient Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="mb-2">
                <span className="font-bold inline-block min-w-[140px]">Full Name:</span>
                <span>{data.patientName}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold inline-block min-w-[140px]">Patient ID No.:</span>
                <span>{data.patientID}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold inline-block min-w-[140px]">Age:</span>
                <span>{data.patientAge}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold inline-block min-w-[140px]">Sex:</span>
                <span>{data.patientSex === 'M' ? 'Male' : 'Female'}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold inline-block min-w-[140px]">Date of Examination:</span>
                <span>{formatDate(data.examDate)}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold inline-block min-w-[140px]">Clinic Reference:</span>
                <span>{data.clinicReference}</span>
              </div>
              <div className="mb-2 col-span-2">
                <span className="font-bold inline-block min-w-[140px]">Employer:</span>
                <span>{data.employer || 'N/A'}</span>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="space-y-4">
              <p><strong>TO WHOM IT MAY CONCERN,</strong></p>
              <p>
                This certifies that {getSalutation(data.patientSex)} {data.patientName} was attended to at the Prime Care Centre/Corporate Out-Patient Clinic and found{' '}
                <strong>{data.fitness === 'fit' ? 'fit to attend his/her duties' : 'unfit to attend his/her duties'}</strong>.
              </p>
              
              {data.fitness === 'unfit' && (
                <div className="space-y-2">
                  <p>
                    The patient has been granted <strong>{data.leaveDays}</strong> days off duty with effect from <strong>{formatDate(data.leaveFrom)}</strong>.
                  </p>
                  <p>
                    To resume duties on <strong>{formatDate(data.resumeDate)}</strong> and come for review on{' '}
                    <strong>{data.reviewDate ? formatDate(data.reviewDate) : 'N/A'}</strong>.
                  </p>
                </div>
              )}

              {data.fitness === 'fit' && data.resumeDateFit && (
                <p>
                  To resume duties on <strong>{formatDate(data.resumeDateFit)}</strong>.
                </p>
              )}
              
              <div>
                <p><strong>Specific Recommendations/Restrictions:</strong></p>
                <p>{data.recommendations || 'None'}</p>
              </div>
            </div>

            {/* Physician Section */}
            <div className="mt-8 pt-5 border-t border-gray-300">
              <div className="mb-2">
                <span className="font-bold inline-block min-w-[140px]">Doctor's Name:</span>
                <span>{data.doctorName}</span>
              </div>
              <div className="mt-16 border-t border-black w-80">
                <p className="mt-1">Signature</p>
              </div>
              
              <div className="mt-4">
                <span className="font-bold inline-block min-w-[140px]">Stamp & License No.:</span>
                <span>{data.licenseNo}</span>
              </div>
            </div>

            {/* Authentication */}
            <div className="mt-6 text-xs text-gray-600">
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
          className="w-full bg-success hover:bg-success/90 text-success-foreground"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Certificate
        </Button>
      </CardContent>
    </Card>
  );
}