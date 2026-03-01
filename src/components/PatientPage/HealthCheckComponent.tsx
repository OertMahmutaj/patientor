import type { HealthCheckEntry, Diagnosis } from "../../types";

import { HealthCheckRating } from "../../types";

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card, CardContent } from '@mui/material';

const DiagnosisList = ({ codes, diagnoses }: { codes?: string[], diagnoses: Diagnosis[] }) => (
    <ul>
        {codes?.map((code) => (
            <li key={code}>{code} - {diagnoses.find(d => d.code === code)?.name}</li>
        ))}
    </ul>
);

const assertNever = (value: never): never => {
        throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
    };

const HealthRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "red" }} />;
    default:
      return assertNever(rating);
  }
};
export const HealthCheckComponent = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: Diagnosis[] }) => (
    <Card style={{ marginBottom: "1em" }}>
        <CardContent>
            <FavoriteIcon />
            <p>{entry.description}</p>
            <p>Rating: {entry.healthCheckRating}</p>
            <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
            <HealthRatingIcon rating={entry.healthCheckRating} />
        </CardContent>
    </Card>
);