import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { Floor } from "@/types/Floor";
import { Purpose } from "@/types/Purpose";
import RealEstateType from "@/types/RealEstateType";
import { ServiceType } from "@/types/ServiceType";
import { RealEstateFormDisabled } from "@/components/createOrder/forms/realEstate/types";
import CurrentOccupationRadioGroup from "./CurrentOccupationRadioGroup";
import MaxInterventionDatePicker from "./MaxInterventionDatePicker";
import Contractor from "@/components/common/form/Contractor";
import Address from "@/components/common/form/Address";
import Unit from "@/components/common/form/Unit";
import { DateTime } from "luxon";
import RealEstate from "./RealEstate";
import Annexes from "@/components/common/form/Annexes";
import { nanoid } from "nanoid";
import { InformationEstimateFormProps } from "./types";
import { BuildingAnnex } from "@/types/BuildingAnnex";

const InformationEstimateForm: FC<InformationEstimateFormProps> = ({
  initialValues,
}) => {
  const [disabled, setDisabled] = useState<RealEstateFormDisabled>({});
  const [occupation, setOccupation] = useState("");
  const [date, setDate] = useState<DateTime | undefined>(undefined);
  const [futherInformations, setFutherInformations] = useState("");

  // Address
  const [address, setAddress] = useState(
    initialValues?.realEstate?.address ?? ""
  );
  const [additionalAddress, setAdditionalAddress] = useState(
    initialValues?.realEstate?.additionalAddress ?? ""
  );
  const [postalCode, setPostalCode] = useState(
    initialValues?.realEstate?.postalCode ?? ""
  );
  const [city, setCity] = useState(initialValues?.realEstate?.city ?? "");

  // Unit
  const [buildingReference, setBuildingReference] = useState(
    initialValues?.realEstate?.buildingReference ?? ""
  );
  const [unitReference, setUnitReference] = useState(
    initialValues?.realEstate?.unitReference ?? ""
  );
  const [mandateReference, setMandateReference] = useState(
    initialValues?.realEstate?.mandateReference ?? ""
  );
  const [leaseReference, setLeaseReference] = useState(
    initialValues?.realEstate?.leaseReference ?? ""
  );
  const [buildingYear, setBuildingYear] = useState(
    initialValues?.realEstate?.buildingYear ?? ""
  );

  // Real Estate
  const [purpose, setPurpose] = useState<Purpose | undefined>(
    initialValues?.realEstate?.purpose ?? undefined
  );
  const [staircaseNumber, setStaircaseNumber] = useState(
    initialValues?.realEstate?.staircaseNumber ?? ""
  );
  const [levelNumber, setLevelNumber] = useState("");

  // Contractor
  const [contractorFirstname, setContractorFirstname] = useState("");
  const [contractorLastname, setContractorLastname] = useState("");
  const [contractorEmail, setContractorEmail] = useState("");

  // Annexes
  const [annexes, setAnnexes] = useState<Partial<BuildingAnnex>[]>(
    initialValues?.realEstate?.annexes?.length === 0 ||
      !initialValues?.realEstate?.annexes
      ? [
          {
            id: nanoid(),
            type: undefined,
            unitReference: "",
            location: "",
          },
        ]
      : initialValues?.realEstate?.annexes
  );

  const serviceType: ServiceType = {
    id: "1",
    name: "Habitation",
    code: "living",
  };

  const handleChangeCurrentOccupationRadio = (value: string): void => {
    setOccupation(value);
  };

  const handleChangeDate = (value: DateTime | undefined): void => {
    setDate(value);
  };

  return (
    <Stack spacing={5} component="form">
      <Address
        address={address}
        additionalAddress={additionalAddress}
        postalCode={postalCode}
        city={city}
        setAddress={setAddress}
        setAdditionalAddress={setAdditionalAddress}
        setPostalCode={setPostalCode}
        setCity={setCity}
      />

      <Unit
        buildingReference={buildingReference}
        unitReference={unitReference}
        mandateReference={mandateReference}
        leaseReference={leaseReference}
        buildingYear={buildingYear}
        setBuildingReference={setBuildingReference}
        setUnitReference={setUnitReference}
        setMandateReference={setMandateReference}
        setLeaseReference={setLeaseReference}
        setBuildingYear={setBuildingYear}
      />

      <RealEstate
        staircaseNumber={staircaseNumber}
        purpose={purpose}
        levelNumber={levelNumber}
        setPurpose={setPurpose}
        setStaircaseNumber={setStaircaseNumber}
        setLevelNumber={setLevelNumber}
        serviceType={serviceType}
        disabled={disabled.realEstate}
      />

      <Annexes annexes={annexes} setAnnexes={setAnnexes} />

      <CurrentOccupationRadioGroup
        onChange={handleChangeCurrentOccupationRadio}
      />

      <MaxInterventionDatePicker
        onChange={handleChangeDate}
        futherInformations={futherInformations}
        setFutherInformations={setFutherInformations}
      />

      <Contractor
        firstname={contractorFirstname}
        setFirstname={setContractorFirstname}
        lastname={contractorLastname}
        setLastname={setContractorLastname}
        email={contractorEmail}
        setEmail={setContractorEmail}
      />
    </Stack>
  );
};

export default InformationEstimateForm;
