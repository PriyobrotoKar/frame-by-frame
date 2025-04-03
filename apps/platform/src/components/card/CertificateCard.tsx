import React from 'react';
import Card from '../ui/card';
import Image from 'next/image';
import { IconDownload } from '@tabler/icons-react';
import { Button } from '../ui/button';

export interface Certificate {
  title: string;
  certificateUrl: string;
}

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  return (
    <Card>
      <div>
        <Image
          src={certificate.certificateUrl}
          alt="playlist Image"
          width={277}
          height={162}
          className="w-full rounded-lg"
        />
      </div>

      <Card.Content>
        <Card.Header>
          <Card.Title>{certificate.title}</Card.Title>
        </Card.Header>

        <Card.Footer>
          <Button variant={'outline'} className="w-full">
            <IconDownload />
            Download
          </Button>
        </Card.Footer>
      </Card.Content>
    </Card>
  );
};

export default CertificateCard;
