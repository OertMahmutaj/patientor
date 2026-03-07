import { useState, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, OutlinedInput, Chip, Box } from '@mui/material';
import { HealthCheckFormValues, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: HealthCheckFormValues) => void;
    diagnoses: Diagnosis[];
}

interface HealthCheckRatingOption {
    value: HealthCheckRating;
    label: string;
}

const healthCheckOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating)
    .filter(v => typeof v === "number")
    .map(v => ({
        value: v as HealthCheckRating,
        label: HealthCheckRating[v as number]
    }));

const AddHealthCheckForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.LowRisk);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        const value = Number(event.target.value);
        if (value in HealthCheckRating) {
            setHealthCheckRating(value as HealthCheckRating);
        }
    };

    const addHealthCheck = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            description,
            date,
            specialist,
            healthCheckRating,
            diagnosisCodes,
            type: "HealthCheck"
        });
    };

    return (
        <div>
            <form onSubmit={addHealthCheck}>
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
                <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
                <Select
                    fullWidth
                    value={String(healthCheckRating)}
                    onChange={onHealthCheckRatingChange}
                >
                    {healthCheckOptions.map(option =>
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
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

export default AddHealthCheckForm;