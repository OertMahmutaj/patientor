import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Divider, Alert, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';

import AddHealthCheckForm from './HealthCheckForm';
import AddHospitalEntryForm from './HospitalEntryForm';
import AddOccupationalForm from './OccupationalHealthcareForm';
import { HealthCheckFormValues, HospitalFormValues, OccupationalHealthcareFormValues, Diagnosis } from '../../types';

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HealthCheckFormValues | HospitalFormValues | OccupationalHealthcareFormValues) => void;
    error?: string;
    diagnoses: Diagnosis[];
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => {
    const [entryType, setEntryType] = useState<EntryType>("HealthCheck");

    const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
        setEntryType(event.target.value as EntryType);
    };

    return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
            <DialogTitle>Add a new entry</DialogTitle>
            <Divider />
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                <InputLabel>Entry Type</InputLabel>
                <Select fullWidth value={entryType} onChange={onEntryTypeChange}>
                    <MenuItem value="HealthCheck">Health Check</MenuItem>
                    <MenuItem value="Hospital">Hospital</MenuItem>
                    <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                </Select>
                {entryType === "HealthCheck" && <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />}
                {entryType === "Hospital" && <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />}
                {entryType === "OccupationalHealthcare" && <AddOccupationalForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />}
            </DialogContent>
        </Dialog>
    );
};

export default AddEntryModal;