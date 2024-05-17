import PatientReport from './ReportTemplate';
import { pdf } from '@react-pdf/renderer';

export function generateReportBlob(): Promise<Blob> {
    return pdf(
        <PatientReport />
    ).toBlob();
}