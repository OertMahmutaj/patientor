import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, InputLabel, Select, MenuItem, OutlinedInput, Chip, Box } from '@mui/material';
import { OccupationalHealthcareFormValues, Diagnosis } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: OccupationalHealthcareFormValues) => void;
    diagnoses: Diagnosis[];
}

const AddOccupationalForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const addOccupationalEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            description,
            date,
            specialist,
            employerName,
            diagnosisCodes,
            type: "OccupationalHealthcare",
            sickLeave: sickLeaveStart && sickLeaveEnd
                ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
                : undefined
        });
    };

    return (
        <div>
            <form onSubmit={addOccupationalEntry}>
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
                <input
                    type="date"
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                    style={{ width: "100%", padding: "8px" }}
                />
                <TextField
                    label="Employer Name"
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                />
                <InputLabel style={{ marginTop: 20 }}>Sick Leave Start Date</InputLabel>
                <input
                    type="date"
                    value={sickLeaveStart}
                    onChange={({ target }) => setSickLeaveStart(target.value)}
                    style={{ width: "100%", padding: "8px" }}
                />
                <InputLabel style={{ marginTop: 20 }}>Sick Leave End Date</InputLabel>
                <input
                    type="date"
                    value={sickLeaveEnd}
                    onChange={({ target }) => setSickLeaveEnd(target.value)}
                    style={{ width: "100%", padding: "8px" }}
                />
                <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
                <Select
                    multiple
                    fullWidth
                    value={diagnosisCodes}
                    onChange={(event) => {
                        const value = event.target.value;
                        setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
                    }}
                    input={<OutlinedInput />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {diagnoses.map(d => (
                        <MenuItem key={d.code} value={d.code}>
                            {d.code} - {d.name}
                        </MenuItem>
                    ))}
                </Select>
                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{ float: "right" }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddOccupationalForm;