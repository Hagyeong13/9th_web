import type { Credit } from "../types/credit";

interface CreditCardProps {
    credit : Credit;
}

const CreditCard = ({credit} : CreditCardProps) => {
    return (
        <>
            <li>
                <img src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`} className="rounded-xl"/>
                <div>{credit.name}</div>
            </li>
        </>
    )
}

export default CreditCard;