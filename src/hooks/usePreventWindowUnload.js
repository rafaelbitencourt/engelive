import { useEffect } from "react";

export default (alteracoesPendentes) => {
    useEffect(() => {
        if (alteracoesPendentes) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }, [alteracoesPendentes]);
}