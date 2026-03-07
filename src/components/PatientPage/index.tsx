import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, TableHead, Typography, TableCell, TableRow, TableBody, Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from "../../services/patients";
import entryService from "../../services/entries";

import { Patient, Gender, Diagnosis, HealthCheckFormValues, HospitalFormValues, OccupationalHealthcareFormValues } from "../../types";

import HealthRatingBar from "../HealthRatingBar";
import { HospitalEntryComponent } from "./HospitalEntryComponent";
import { HealthCheckComponent } from "./HealthCheckComponent";
import { OccupationalComponent } from "./OccupationalHealthcareComponent";
import AddHealthCheckModal from "../AddFormModal";

interface Props {
    diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const { id } = useParams<{ id: string }>();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
        (document.activeElement as HTMLElement)?.blur();
    };

    useEffect(() => {
        const fetchPatient = async () => {
            if (!id) return;
            const data = await patientService.getPatientById(id);
            setPatient(data);
        };
        fetchPatient();
    }, [id]);

    if (!patient) return <Typography>Loading...</Typography>;

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
    };

    const submitNewEntry = async (values: HealthCheckFormValues | HospitalFormValues | OccupationalHealthcareFormValues) => {
    try {
        const newEntry = await entryService.createEntry(id!, values);
        setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
        closeModal();
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            setError(e?.response?.data?.error || "Unrecognized axios error");
        } else {
            setError("Unknown error");
        }
    }
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
                console.log("entry:", entry);
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

            <AddHealthCheckModal
                modalOpen={modalOpen}
                onClose={closeModal}
                onSubmit={submitNewEntry}
                error={error}
                diagnoses={diagnoses}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};

export default PatientPage;