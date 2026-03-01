import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Table, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from "../../services/patients";

import { Patient, Gender, Diagnosis } from "../../types";

import HealthRatingBar from "../HealthRatingBar";

import { HospitalEntryComponent } from "./HospitalEntryComponent";
import { HealthCheckComponent } from "./HealthCheckComponent";
import { OccupationalComponent } from "./OccupationalHealthcareComponent";

interface Props {
    diagnoses: Diagnosis[]
    //   setDiagnosis: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientPage = ({ diagnoses }: Props) => {


    const [patient, setPatient] = useState<Patient | null>(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async () => {
            if (!id) return;
            const data = await patientService.getPatientById(id);
            setPatient(data);
        };
        fetchPatient();
    }, [id]);

    if (!patient) return <Typography>Loading...</Typography>;
    console.log(patient);

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
    };
    return (
        <div>
            <Table style={{ marginBottom: "1em" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Occupation</TableCell>
                        <TableCell>Health Rating</TableCell>
                        <TableCell>SSN</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={patient.id}>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>
                            {patient.gender === Gender.Male && <MaleIcon />}
                            {patient.gender === Gender.Female && <FemaleIcon />}
                            {patient.gender === Gender.Other && <TransgenderIcon />}
                        </TableCell>
                        <TableCell>{patient.occupation}</TableCell>
                        <TableCell>
                            <HealthRatingBar showText={false} rating={1} />
                        </TableCell>
                        <TableCell>{patient.ssn}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Typography variant="h6">Entries</Typography>
            {patient.entries.map(entry => {
                switch (entry.type) {
                    case "Hospital":
                        return <HospitalEntryComponent key={entry.id} entry={entry} diagnoses={diagnoses} />;

                    case "HealthCheck":
                        return <HealthCheckComponent key={entry.id} entry={entry} diagnoses={diagnoses} />;
                    case "OccupationalHealthcare":
                        return <OccupationalComponent key={entry.id} entry={entry} diagnoses={diagnoses} />;
                    default:
                        return assertNever(entry);
                }
            })}
        </div>
    );
};

export default PatientPage;