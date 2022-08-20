import { useState } from "react"
import { AlertCustomProps } from "../components/layout";

export const useAlert = () => {
    const [infoAlert, setInfoAlert] = useState<AlertCustomProps>({
        openStatus: false,
    });

    return {
        infoAlert,
        setInfoAlert
    }
}