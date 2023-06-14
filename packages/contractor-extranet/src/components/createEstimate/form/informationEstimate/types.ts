
export interface InformationEstimateFormProps {
  contextValues: any;
  initialValues?: {
    realEstate?: any;
    serviceType?: any;
  };
  onSubmit: (values: any) => void;
  formId: string;
}
