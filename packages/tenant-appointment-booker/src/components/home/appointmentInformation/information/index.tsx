import Order from "@/types/order"
import MeetingSummary from "./MeetingSummary"

interface InformationProps {
    order: Order
}

const Information: React.FunctionComponent<InformationProps> = ({ order }) => {

    const { commercialName, familleLongue } = order

    return (
        <>
            <MeetingSummary commercialName={commercialName} familyLongName={familleLongue}/>
        </>
    )
}

export default Information
