import {
  AlternateEmailOutlined,
  CorporateFareOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { parsePhoneNumber } from "libphonenumber-js";

interface Contractor {
  commercialName: string;
  phoneNumber: string;
  emails: string[];
}

interface ContractorSummaryProps {
  contractor: Contractor;
}

const ContractorSummary: React.FC<ContractorSummaryProps> = ({
  contractor,
}) => {
  const [email, ...emails] = contractor.emails;
  const phoneNumber =
    contractor.phoneNumber && parsePhoneNumber(contractor.phoneNumber, "FR");
  const formattedPhoneNumber = phoneNumber && phoneNumber.formatInternational();
  const phoneNumberUri = phoneNumber && phoneNumber.getURI();

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <CorporateFareOutlined sx={{ color: "text.secondary" }} />
        </ListItemIcon>
        <ListItemText primary={contractor.commercialName} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PhoneOutlined sx={{ color: "text.secondary" }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Link
              color="inherit"
              href={phoneNumberUri}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formattedPhoneNumber}
            </Link>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AlternateEmailOutlined sx={{ color: "text.secondary" }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Link
              color="inherit"
              href={`mailto:${email}?cc=${emails.join(",")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {email}
            </Link>
          }
        />
      </ListItem>
    </List>
  );
};

export default ContractorSummary;
