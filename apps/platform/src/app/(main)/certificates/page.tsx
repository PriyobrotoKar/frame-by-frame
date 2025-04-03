import CertificateCard from '@/components/card/CertificateCard';
import { demoCertificate } from '@/lib/mocks';

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
