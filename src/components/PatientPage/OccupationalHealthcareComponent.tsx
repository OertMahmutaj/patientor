import type { OccupationalHealthcareEntry, Diagnosis } from "../../types";

import { Card, CardContent } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const DiagnosisList = ({ codes, diagnoses }: { codes?: string[], diagnoses: Diagnosis[] }) => (
    <ul>
        {codes?.map((code) => (
            <li key={code}>{code} - {diagnoses.find(d => d.code === code)?.name}</li>
        ))}
    </ul>
);
export const OccupationalComponent = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => (
    <Card style={{ marginBottom: "1em" }}>
        <CardContent>
            <MedicalInformationIcon />
            <p>{entry.description}</p>
            <p>Employer: {entry.employerName}</p>
            {entry.sickLeave && <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>}
            <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
        </CardContent>
    </Card>
);