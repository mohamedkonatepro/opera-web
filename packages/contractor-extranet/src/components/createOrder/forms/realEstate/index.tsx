import { Stack } from "@mui/material";
import Address from "./Address";
import RealEstate from "./RealEstate";
import Annexes from "./Annexes";
import Energy from "./Energy";
import MeterLocation from "./MeterLocation";
import Unit from "./Unit";
import { useState } from "react";

const RealEstateForm = () => {
  // Address
  const [address, setAddress] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  // Real Estate
  const [realEstateType, setRealEstateType] = useState("");
  const [floor, setFloor] = useState("");
  const [purpose, setPurpose] = useState("");
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

  // Energy
  const [heatingEnergyType, setHeatingEnergyType] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [waterHeatingEnergyType, setWaterHeatingEnergyType] = useState("");
  const [waterHeatingType, setWaterHeatingType] = useState("");

  // Meter Location
  const [locationHotWater, setLocationHotWater] = useState("");
  const [locationElectricMeter, setLocationElectricMeter] = useState("");
  const [locationColdWater, setLocationColdWater] = useState("");
  const [locationGasMeter, setLocationGasMeter] = useState("");
  const [
    electricalReferenceMeasureLocation,
    setElectricalReferenceMeasureLocation,
  ] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Stack spacing={5}>
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
      <Annexes />
      <Energy
        heatingEnergyType={heatingEnergyType}
        heatingType={heatingType}
        waterHeatingEnergyType={waterHeatingEnergyType}
        waterHeatingType={waterHeatingType}
        setHeatingEnergyType={setHeatingEnergyType}
        setHeatingType={setHeatingType}
        setWaterHeatingEnergyType={setWaterHeatingEnergyType}
        setWaterHeatingType={setWaterHeatingType}
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
