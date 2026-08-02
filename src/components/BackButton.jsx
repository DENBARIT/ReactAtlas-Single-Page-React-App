import { useNavigate } from "react-router-dom";
import { useCities } from "../CitiesContext/CitiesContext";
import Button from "./Button";
function BackButton() {
    const navigate = useNavigate();
        const { currentCity } = useCities();

        function handleBack(e) {
            e.preventDefault();

            if (currentCity?.position) {
                navigate(
                    `/app/cities?lat=${currentCity.position.lat}&lng=${currentCity.position.lng}`
                );
                return;
            }

            navigate(-1);
        }
return  <Button type="back" onClick={
                    handleBack
                }>&larr; Back</Button>
}
export default BackButton;