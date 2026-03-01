import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Table, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from "../../services/patients";

import { Patient, Gender } from "../../types";

import HealthRatingBar from "../HealthRatingBar";

const PatientPage = () => {

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

    return (
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
                    {patient.gender === Gender.Male && <MaleIcon />}
                    {patient.gender === Gender.Female && <FemaleIcon />}
                    {patient.gender === Gender.Other && <TransgenderIcon />}
                    <TableCell>{patient.occupation}</TableCell>
                    <TableCell>
                        <HealthRatingBar showText={false} rating={1} />
                    </TableCell>
                    <TableCell>{patient.ssn}</TableCell>
                </TableRow>

            </TableBody>
        </Table>
    );
};

export default PatientPage;