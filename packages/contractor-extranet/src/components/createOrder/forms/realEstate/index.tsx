import { Stack } from "@mui/material";
import Address from "./Address";
import RealEstate from "./RealEstate";
import Annexes from "./Annexes";
import Energy from "./Energy";
import MeterLocation from "./MeterLocation";
import Unit from "./Unit";
import { FC, useMemo, useState } from "react";
import { RealEstateFormProps } from "./types";
import { RealEstateType } from "@/types/RealEstateType";
import { Floor } from "@/types/Floor";
import { Purpose } from "@/types/Purpose";
import { HeatingType } from "@/types/HeatingType";
import { HeatingEnergyType } from "@/types/HeatingEnergyType";
import { WaterHeatingEnergyType } from "@/types/WaterHeatingEnergyType";
import { WaterHeatingType } from "@/types/WaterHeatingType";

const RealEstateForm: FC<RealEstateFormProps> = ({
  formId,
  onSubmit,
  stepStates,
}) => {
  // Address
  const [address, setAddress] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  // Real Estate
  const [realEstateType, setRealEstateType] = useState<RealEstateType>();
  const [floor, setFloor] = useState<Floor>();
  const [purpose, setPurpose] = useState<Purpose>();
  const [surface, setSurface] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [digicode, setDigicode] = useState("");
  const [observation, setObservation] = useState("");

  // Unit
  const [buildingReference, setBuildingReference] = useState("");
  const [unitReference, setUnitReference] = useState("");
  const [mandateReference, setMandateReference] = useState("");
  const [leaseReference, setLeaseReference] = useState("");
  const [buildingYear, setBuildingYear] = useState("");

  // Annexes
  const [annexes, setAnnexes] = useState<any[]>([]);

  // Energy
  const [heatingEnergyType, setHeatingEnergyType] =
    useState<HeatingEnergyType>();
  const [heatingType, setHeatingType] = useState<HeatingType>();
  const [waterHeatingEnergyType, setWaterHeatingEnergyType] =
    useState<WaterHeatingEnergyType>();
  const [waterHeatingType, setWaterHeatingType] = useState<WaterHeatingType>();

  // Meter Location
  const [locationHotWater, setLocationHotWater] = useState("");
  const [locationElectricMeter, setLocationElectricMeter] = useState("");
  const [locationColdWater, setLocationColdWater] = useState("");
  const [locationGasMeter, setLocationGasMeter] = useState("");
  const [
    electricalReferenceMeasureLocation,
    setElectricalReferenceMeasureLocation,
  ] = useState("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onSubmit({
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
    return stepStates.services.services.some(
      (service: any) => service.code === "DIAG-DPE" && !service.enabled
    );
  }, [stepStates]);

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
        setRealEstateType={setRealEstateType}
        setFloor={setFloor}
        setPurpose={setPurpose}
        setSurface={setSurface}
        setRoomNumber={setRoomNumber}
        setDigicode={setDigicode}
        setObservation={setObservation}
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
