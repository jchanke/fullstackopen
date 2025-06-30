import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import diagnosisService from "../services/diagnoses";

import { Diagnosis } from "@backend/src/types";

const DiagnosisContext = createContext<{ diagnoses: Diagnosis[] }>({
  diagnoses: [],
});

interface DiagnosisContextProviderProps {
  children: React.ReactNode;
}

const DiagnosisContextProvider = (props: DiagnosisContextProviderProps) => {
  const diagnosesQuery = useQuery<unknown, unknown, Diagnosis[]>({
    queryKey: ["diagnoses", "list"],
    queryFn: diagnosisService.getAll,
  });

  if (diagnosesQuery.isPending) return <div>loading diagnoses...</div>;
  if (diagnosesQuery.isError) return JSON.stringify(diagnosesQuery.error);

  const diagnoses = diagnosesQuery.data;

  return (
    <DiagnosisContext.Provider value={{ diagnoses }}>
      {props.children}
    </DiagnosisContext.Provider>
  );
};
export default DiagnosisContextProvider;

export const useDiagnoses = () => useContext(DiagnosisContext);
