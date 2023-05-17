import { Stack } from "@mui/material";
import Address from "./Address";
import RealEstate from "./RealEstate";
import Annexes from "./Annexes";
import Energy from "./Energy";
import MeterLocation from "./MeterLocation";
import Unit from "./Unit";
import { FC, useMemo, useState } from "react";
import { RealEstateFormDisabled, RealEstateFormProps } from "./types";
import { RealEstateType } from "@/types/RealEstateType";
import { Floor } from "@/types/Floor";
import { Purpose } from "@/types/Purpose";
import { HeatingType } from "@/types/HeatingType";
import { HeatingEnergyType } from "@/types/HeatingEnergyType";
import { WaterHeatingEnergyType } from "@/types/WaterHeatingEnergyType";
import { WaterHeatingType } from "@/types/WaterHeatingType";
import realEstates from '../../../../pages/api/real-estates/index';
import { nanoid } from "nanoid";

const RealEstateForm: FC<RealEstateFormProps> = ({
  formId,
  onSubmit,
  contextValues,
  initialValues = {},
}) => {
  const [realEstateId, setRealEstateId] = useState(initialValues?.id ?? "");
  // Address
  const [address, setAddress] = useState(initialValues?.address ?? "");
  const [additionalAddress, setAdditionalAddress] = useState(
    initialValues?.additionalAddress ?? ""
  );
  const [postalCode, setPostalCode] = useState(initialValues?.postalCode ?? "");
  const [city, setCity] = useState(initialValues?.city ?? "");

  // Real Estate
  const [realEstateType, setRealEstateType] = useState<
    RealEstateType | undefined
  >(initialValues?.realEstateType ?? undefined);
  const [floor, setFloor] = useState<Floor | undefined>(
    initialValues?.floor ?? undefined
  );
  const [purpose, setPurpose] = useState<Purpose | undefined>(
    initialValues?.purpose ?? undefined
  );
  const [surface, setSurface] = useState(initialValues?.surface ?? "");
  const [roomNumber, setRoomNumber] = useState(initialValues?.roomNumber ?? "");
  const [digicode, setDigicode] = useState(initialValues?.digicode ?? "");
  const [observation, setObservation] = useState(
    initialValues?.observation ?? ""
  );

  // Unit
  const [buildingReference, setBuildingReference] = useState(
    initialValues?.buildingReference ?? ""
  );
  const [unitReference, setUnitReference] = useState(
    initialValues?.unitReference ?? ""
  );
  const [mandateReference, setMandateReference] = useState(
    initialValues?.mandateReference ?? ""
  );
  const [leaseReference, setLeaseReference] = useState(
    initialValues?.leaseReference ?? ""
  );
  const [buildingYear, setBuildingYear] = useState(
    initialValues?.buildingYear ?? ""
  );

  // Annexes
  const [annexes, setAnnexes] = useState<any[]>(
    initialValues?.annexes?.length === 0 || !initialValues?.annexes
      ? [
          {
            id: nanoid(),
            type: undefined,
            unitReference: "",
            location: "",
          },
        ]
      : initialValues?.annexes
  );

  // Energy
  const [heatingEnergyType, setHeatingEnergyType] = useState<HeatingEnergyType>(
    initialValues?.heatingEnergyType ?? undefined
  );
  const [heatingType, setHeatingType] = useState<HeatingType>(
    initialValues?.heatingType ?? undefined
  );
  const [waterHeatingEnergyType, setWaterHeatingEnergyType] =
    useState<WaterHeatingEnergyType>(
      initialValues?.waterHeatingEnergyType ?? undefined
    );
  const [waterHeatingType, setWaterHeatingType] = useState<WaterHeatingType>(
    initialValues?.waterHeatingType ?? undefined
  );

  // Meter Location
  const [locationHotWater, setLocationHotWater] = useState(
    initialValues?.locationHotWater ?? ""
  );
  const [locationElectricMeter, setLocationElectricMeter] = useState(
    initialValues.locationElectricMeter ?? ""
  );
  const [locationColdWater, setLocationColdWater] = useState(
    initialValues?.locationColdWater ?? ""
  );
  const [locationGasMeter, setLocationGasMeter] = useState(
    initialValues?.locationGasMeter ?? ""
  );
  const [
    electricalReferenceMeasureLocation,
    setElectricalReferenceMeasureLocation,
  ] = useState(initialValues?.electricalReferenceMeasureLocation ?? "");

  const [disabled, setDisabled] = useState<RealEstateFormDisabled>({});

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onSubmit({
      id: realEstateId,
      address,
      additionalAddress,
      postalCode,
      city,
      realEstateType,
      floor,
      purpose,
      surface,
      roomNumber,
      digicode,
      observation,
      buildingReference,
      unitReference,
      mandateReference,
      leaseReference,
      buildingYear,
      annexes,
      heatingEnergyType,
      heatingType,
      waterHeatingEnergyType,
      waterHeatingType,
      locationHotWater,
      locationElectricMeter,
      locationColdWater,
      locationGasMeter,
      electricalReferenceMeasureLocation,
    });
  };

  const heatingTypeRequired = useMemo(() => {
    return contextValues.services.some(
      (service: any) => service.code === "DIAG-DPE" && !service.enabled
    );
  }, [contextValues]);

  const handleOnSelectRealEstateType = (value: RealEstateType) => {
    setRealEstateType(value);
    setPurpose(value.purpose);
    if (value.purpose)
      setDisabled((prevDisabled) => ({
        ...prevDisabled,
        realEstate: { ...prevDisabled, purpose: true },
      }));
  };

  return (
    <Stack spacing={5} component="form" onSubmit={handleOnSubmit} id={formId}>
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
      <RealEstate
        realEstateType={realEstateType}
        floor={floor}
        purpose={purpose}
        roomNumber={roomNumber}
        surface={surface}
        digicode={digicode}
        observation={observation}
        setRealEstateType={handleOnSelectRealEstateType}
        setFloor={setFloor}
        setPurpose={setPurpose}
        setSurface={setSurface}
        setRoomNumber={setRoomNumber}
        setDigicode={setDigicode}
        setObservation={setObservation}
        serviceType={contextValues.serviceType}
        disabled={disabled.realEstate}
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
      <Annexes annexes={annexes} setAnnexes={setAnnexes} />
      <Energy
        heatingEnergyType={heatingEnergyType}
        heatingType={heatingType}
        waterHeatingEnergyType={waterHeatingEnergyType}
        waterHeatingType={waterHeatingType}
        setHeatingEnergyType={setHeatingEnergyType}
        setHeatingType={setHeatingType}
        setWaterHeatingEnergyType={setWaterHeatingEnergyType}
        setWaterHeatingType={setWaterHeatingType}
        required={{
          heatingType: heatingTypeRequired,
          waterHeatingType: heatingTypeRequired,
        }}
      />
      <MeterLocation
        locationHotWater={locationHotWater}
        locationElectricMeter={locationElectricMeter}
        locationColdWater={locationColdWater}
        locationGasMeter={locationGasMeter}
        electricalReferenceMeasureLocation={electricalReferenceMeasureLocation}
        setLocationHotWater={setLocationHotWater}
        setLocationElectricMeter={setLocationElectricMeter}
        setLocationColdWater={setLocationColdWater}
        setLocationGasMeter={setLocationGasMeter}
        setElectricalReferenceMeasureLocation={
          setElectricalReferenceMeasureLocation
        }
      />
    </Stack>
  );
};

export default RealEstateForm;
