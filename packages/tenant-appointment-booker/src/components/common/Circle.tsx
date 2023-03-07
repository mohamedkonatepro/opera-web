import { Box, BoxProps } from "@mui/material"

const Circle: React.FC<BoxProps> = (props) => {
  return (
    <Box
      {...props}
      width={40}
      height={40}
      borderRadius="50%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    />
  )
}

export default Circle
