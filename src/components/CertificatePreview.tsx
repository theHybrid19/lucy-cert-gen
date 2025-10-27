import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, Eye } from "lucide-react";
import QRCode from "qrcode";
import hospitalLogo from "@/assets/hospital-logo.png";
import doctorStamp from "@/assets/doctor-stamp.png";

interface CertificateData {
  patientName: string;
  admissionDate: string;
  leaveDuration: string;
  doctorName: string;
  doctorTitle: string;
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
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
          Letter Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
          <div id="certificate-content" className="print-certificate">
            <div className="border-2 border-certificate-border p-8 rounded-certificate bg-certificate-bg shadow-certificate mb-6">
              {/* Letter Header */}
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
              </div>

              {/* QR Code */}
              <div className="qr-code flex justify-center mb-6">
                <canvas ref={qrCodeRef} />
              </div>

              {/* Letter Date */}
              <div className="text-left mb-8">
                <p className="font-medium">{getCurrentDate()}</p>
              </div>

              {/* Letter Content */}
              <div className="space-y-6 text-left">
                <p className="font-semibold">To Whom It May Concern,</p>
                
                <p className="leading-relaxed">
                  This patient <strong>{data.patientName}</strong> was admitted under our care on <strong>{formatDate(data.admissionDate)}</strong>. Following assessment, a period of <strong>{data.leaveDuration}</strong> of medical leave is medically recommended to ensure proper recovery.
                </p>
                
                <div className="mt-12 pt-8">
                  <p className="mb-1">Sincerely,</p>
                  <div className="signature-section mt-8 mb-4">
                    <div className="signature-line border-t border-black w-60">
                      <p className="mt-1">Signature</p>
                    </div>
                  </div>
                  <p className="font-semibold">{data.doctorName}</p>
                  <p className="text-muted-foreground">{data.doctorTitle}</p>
                  <p className="text-muted-foreground">Mama Lucy Kibaki Hospital</p>
                </div>
              </div>

              {/* Reference Footer */}
              <div className="authentication mt-12 pt-6 border-t text-xs text-gray-600">
                <p className="mb-1">
                  <strong>Reference Number:</strong> {referenceNumber}
                </p>
                <p className="italic">
                  This letter was verified and logged into the MLKH system on {getCurrentDate()}. For verification, contact Hospital Administration with reference number.
                </p>
              </div>
            </div>
          </div>

        <Button 
          onClick={handlePrint} 
          className="w-full bg-success hover:bg-success/90 text-success-foreground no-print"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Letter
        </Button>
      </CardContent>
    </Card>
  );
}