import axios from "axios";

import { apiBaseUrl } from "../constants";

import {
  Entry,
  HealthCheckFormValues,
  HospitalFormValues,
  OccupationalHealthcareFormValues,
} from "../types";

const createEntry = async (
  id: string,
  object:
    | HealthCheckFormValues
    | HospitalFormValues
    | OccupationalHealthcareFormValues,
): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object,
  );
  return data;
};

export default { createEntry };
