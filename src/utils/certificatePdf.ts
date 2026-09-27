import type { jsPDF } from 'jspdf';
import { Certificate } from '../types';

const safeFilePart = (value: string) => value.trim().replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 64) || 'student';

export const createCertificatePdf = async (certificate: Certificate): Promise<jsPDF> => {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  const navy: [number, number, number] = [12, 35, 64];
  const gold: [number, number, number] = [181, 139, 48];
  const center = width / 2;
  const organization = certificate.organizationName || 'NIGERIAN SOCIETY OF BIOCHEMISTRY STUDENTS (NSBS)';
  const university = certificate.universityName || 'USMANU DANFODIYO UNIVERSITY, SOKOTO';
  const title = certificate.certificateTitle || 'Certificate of Achievement';
  const statement = certificate.completionStatement || 'This certificate is proudly presented to';

  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, width, height, 'F');
  pdf.setDrawColor(...navy);
  pdf.setLineWidth(1.2);
  pdf.rect(7, 7, width - 14, height - 14);
  pdf.setDrawColor(...gold);
  pdf.setLineWidth(0.45);
  pdf.rect(10, 10, width - 20, height - 20);
  pdf.setDrawColor(...navy);
  pdf.setLineWidth(0.3);
  pdf.line(25, 39, width - 25, 39);

  if (certificate.logoDataUrl) {
    try {
      pdf.addImage(certificate.logoDataUrl, 'JPEG', 17, 15, 22, 18, undefined, 'FAST');
    } catch {
      // Continue with the certificate even when an uploaded image format is not PDF-compatible.
    }
  }

  pdf.setTextColor(...navy);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.text(university.toUpperCase(), center, 19, { align: 'center', maxWidth: 225 });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.text(organization.toUpperCase(), center, 26, { align: 'center', maxWidth: 230 });
  pdf.setTextColor(...gold);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.text('OFFICIAL ACADEMIC RECOGNITION', center, 48, { align: 'center' });

  pdf.setTextColor(...navy);
  pdf.setFont('times', 'bold');
  pdf.setFontSize(25);
  const titleLines = pdf.splitTextToSize(title, 235);
  pdf.text(titleLines, center, 61, { align: 'center', lineHeightFactor: 1.05 });
  const titleBottom = 61 + (titleLines.length - 1) * 8.8;

  pdf.setTextColor(81, 92, 105);
  pdf.setFont('times', 'italic');
  pdf.setFontSize(12);
  pdf.text(pdf.splitTextToSize(statement, 235), center, titleBottom + 10, { align: 'center', maxWidth: 235 });

  const nameY = titleBottom + 23;
  pdf.setTextColor(...navy);
  pdf.setFont('times', 'bold');
  const name = certificate.studentName || 'Student Name';
  const nameSize = name.length > 46 ? 19 : name.length > 32 ? 23 : 29;
  pdf.setFontSize(nameSize);
  pdf.text(pdf.splitTextToSize(name, 245), center, nameY, { align: 'center', maxWidth: 245 });
  pdf.setDrawColor(...gold);
  pdf.setLineWidth(0.65);
  pdf.line(65, nameY + 4, width - 65, nameY + 4);

  pdf.setTextColor(67, 77, 89);
  pdf.setFont('times', 'normal');
  pdf.setFontSize(11.5);
  pdf.text('In recognition of successful participation in and completion of', center, nameY + 13, { align: 'center' });
  pdf.setTextColor(...navy);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.text(pdf.splitTextToSize(certificate.programmeTitle || 'Programme or achievement', 230), center, nameY + 23, { align: 'center', maxWidth: 230 });
  pdf.setTextColor(88, 98, 108);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.text(`Awarded ${certificate.issueDate || new Date().toISOString().slice(0, 10)}  |  Main Campus, Sokoto, Nigeria`, center, nameY + 35, { align: 'center' });

  const footerY = height - 48;
  pdf.setDrawColor(203, 210, 218);
  pdf.setLineWidth(0.3);
  pdf.line(25, footerY - 4, width - 25, footerY - 4);
  const issuerCenter = 77;
  if (certificate.signatureDataUrl) {
    try {
      pdf.addImage(certificate.signatureDataUrl, 'JPEG', issuerCenter - 18, footerY - 1, 36, 13, undefined, 'FAST');
    } catch {
      pdf.setFont('times', 'italic');
      pdf.setFontSize(14);
      pdf.setTextColor(...navy);
      pdf.text(certificate.issuerName || 'Authorized Signatory', issuerCenter, footerY + 7, { align: 'center', maxWidth: 95 });
    }
  } else {
    pdf.setFont('times', 'italic');
    pdf.setFontSize(14);
    pdf.setTextColor(...navy);
    pdf.text(certificate.issuerName || 'Authorized Signatory', issuerCenter, footerY + 7, { align: 'center', maxWidth: 105 });
  }
  pdf.setDrawColor(...navy);
  pdf.setLineWidth(0.35);
  pdf.line(35, footerY + 14, 119, footerY + 14);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(...navy);
  pdf.text(certificate.issuerName || 'Authorized Signatory', issuerCenter, footerY + 19, { align: 'center', maxWidth: 110 });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(93, 102, 113);
  pdf.text(certificate.issuerRole || 'Official Signatory', issuerCenter, footerY + 24, { align: 'center', maxWidth: 110 });

  const rightCenter = width - 70;
  pdf.setTextColor(93, 102, 113);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7);
  pdf.text('CERTIFICATE ID', rightCenter, footerY + 2, { align: 'center' });
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...navy);
  pdf.text(certificate.certificateCode || 'NSBS-UDUS-PREVIEW', rightCenter, footerY + 9, { align: 'center', maxWidth: 110 });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(93, 102, 113);
  pdf.text(certificate.category || 'Certificate', rightCenter, footerY + 15, { align: 'center', maxWidth: 110 });
  pdf.text(certificate.verificationUrl || '', rightCenter, footerY + 21, { align: 'center', maxWidth: 115 });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6.5);
  pdf.setTextColor(112, 120, 130);
  pdf.text(`Issued by ${organization}`, center, height - 13, { align: 'center', maxWidth: 235 });
  return pdf;
};

export const downloadCertificatePdf = async (certificate: Certificate): Promise<void> => {
  const filename = `NSBS-Certificate-${safeFilePart(certificate.studentName)}-${safeFilePart(certificate.certificateCode)}.pdf`;
  const pdf = await createCertificatePdf(certificate);
  pdf.save(filename);
};
