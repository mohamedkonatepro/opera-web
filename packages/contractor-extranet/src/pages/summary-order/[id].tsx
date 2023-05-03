import { Stack } from "@mui/material";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

const SummaryOrder = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Stack>
      <h1>Summary order {id} </h1>
    </Stack>
  );
};

export default SummaryOrder;
