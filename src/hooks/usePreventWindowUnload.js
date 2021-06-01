import { useEffect } from "react";

const usePreventWindowUnload = (alteracoesPendentes) => {
    useEffect(() => {
        if (alteracoesPendentes) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }, [alteracoesPendentes]);
}

export default usePreventWindowUnload;