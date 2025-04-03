import CertificateCard, {
  Certificate,
} from '@/components/card/CertificateCard';

const demoCertificate: Certificate = {
  title: 'Certificate of Completion',
  certificateUrl:
    'https://img.freepik.com/free-vector/vintage-achievement-certificate-template-vector-professional-design-blue_53876-157583.jpg?t=st=1743690053~exp=1743693653~hmac=494c633e65e700b731252cd292a9edf4522e08cdef726ce62eb0b6d2b22a57e2&w=1800',
};

export default function CertificatePage() {
  return (
    <div>
      <section className="space-y-4">
        <h2 className="text-lg">My Courses</h2>
        <div className="flex gap-4 [&>*]:flex-1">
          <CertificateCard certificate={demoCertificate} />
          <CertificateCard certificate={demoCertificate} />
          <CertificateCard certificate={demoCertificate} />
        </div>
      </section>
    </div>
  );
}
