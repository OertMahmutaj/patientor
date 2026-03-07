import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button } from '@mui/material';
import { OccupationalHealthcareFormValues } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: OccupationalHealthcareFormValues) => void;
}

const AddOccupationalForm = ({ onCancel, onSubmit }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');

    const addOccupationalEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            description,
            date,
            specialist,
            employerName,
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
                <TextField
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="Employer Name"
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                />
                <TextField
                    label="Sick Leave Start Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={sickLeaveStart}
                    onChange={({ target }) => setSickLeaveStart(target.value)}
                />
                <TextField
                    label="Sick Leave End Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={sickLeaveEnd}
                    onChange={({ target }) => setSickLeaveEnd(target.value)}
                />
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