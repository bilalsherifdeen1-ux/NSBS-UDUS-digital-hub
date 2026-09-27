import React from 'react';
import { Certificate } from '../../types';

type CertificateArtworkProps = {
  certificate: Partial<Certificate>;
  preview?: boolean;
};

export const CertificateArtwork: React.FC<CertificateArtworkProps> = ({ certificate, preview = false }) => {
  const university = certificate.universityName || 'USMANU DANFODIYO UNIVERSITY, SOKOTO';
  const organization = certificate.organizationName || 'NIGERIAN SOCIETY OF BIOCHEMISTRY STUDENTS (NSBS)';
  const title = certificate.certificateTitle || 'Certificate of Achievement';
  const statement = certificate.completionStatement || 'This certificate is proudly presented to';
  const studentName = certificate.studentName || 'Student full name';
  const programmeTitle = certificate.programmeTitle || 'Programme or achievement title';
  const issuerName = certificate.issuerName || 'Authorized Signatory';
  const issuerRole = certificate.issuerRole || 'Official role';
  const date = certificate.issueDate || new Date().toISOString().slice(0, 10);
  const code = certificate.certificateCode || 'NSBS-UDUS-000000';

  return (
    <article className={`certificate-artwork ${preview ? 'certificate-artwork-preview' : ''}`} aria-label="Certificate preview">
      <div className="certificate-artwork-inner">
        <header className="certificate-artwork-brand">
          {certificate.logoDataUrl ? (
            <img className="certificate-artwork-logo" src={certificate.logoDataUrl} alt="Certificate organization logo" />
          ) : (
            <div className="certificate-artwork-seal" aria-label="NSBS seal">NSBS</div>
          )}
          <div className="certificate-artwork-brandcopy">
            <p>{university}</p>
            <span>{organization}</span>
          </div>
        </header>

        <div className="certificate-artwork-rule" />
        <p className="certificate-artwork-kicker">OFFICIAL ACADEMIC RECOGNITION</p>
        <h2>{title}</h2>
        <p className="certificate-artwork-statement">{statement}</p>
        <p className="certificate-artwork-recipient">{studentName}</p>
        <p className="certificate-artwork-body">
          In recognition of successful participation in and completion of
        </p>
        <p className="certificate-artwork-programme">{programmeTitle}</p>
        <p className="certificate-artwork-date">Awarded on {date} · Main Campus, Sokoto, Nigeria</p>

        <footer className="certificate-artwork-footer">
          <div className="certificate-artwork-signatory">
            {certificate.signatureDataUrl ? (
              <img className="certificate-artwork-signature" src={certificate.signatureDataUrl} alt="Authorized signature" />
            ) : (
              <span className="certificate-artwork-typed-signature">{issuerName}</span>
            )}
            <div className="certificate-artwork-signature-line" />
            <strong>{issuerName}</strong>
            <span>{issuerRole}</span>
          </div>
          <div className="certificate-artwork-verification">
            <span>VERIFICATION CODE</span>
            <strong>{code}</strong>
            <small>{certificate.category || 'Certificate'}</small>
          </div>
        </footer>
      </div>
    </article>
  );
};
