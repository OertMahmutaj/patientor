import type { HospitalEntry, Diagnosis } from "../../types";

import { Card, CardContent } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


const DiagnosisList = ({ codes, diagnoses }: { codes?: string[], diagnoses: Diagnosis[] }) => (
    <ul>
        {codes?.map((code) => (
            <li key={code}>{code} - {diagnoses.find(d => d.code === code)?.name}</li>
        ))}
    </ul>
);



export const HospitalEntryComponent = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[] }) => (
    <Card style={{ marginBottom: "1em" }}>
        <CardContent>
            <LocalHospitalIcon />
            <p>{entry.description}</p>
            {entry.discharge && <p>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</p>}
            <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
        </CardContent>
    </Card>
);