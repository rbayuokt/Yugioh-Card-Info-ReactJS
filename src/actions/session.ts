import { supabase } from "../app/supabaseClient";
import { passwordRecoveryUpdated, sessionUpdated } from "../features/session-slice";

export const getSession = () => {
    return async (dispatch: (arg0: { type: string; payload: any }) => void, getState: any) => {
        try {
            let response = await supabase.auth.getSession();

            if (response.data.session) {
                dispatch(sessionUpdated(response.data.session));
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const setSession = (session: any) => {
    return async (dispatch: (arg0: { type: string; payload: any }) => void, getState: any) => {
        try {
            dispatch(sessionUpdated(session));
        } catch (error) {
            console.log(error);
        }
    };
}

export const getResetPasswordStatus = () => {
    // using localstorage
    return async (dispatch: (arg0: { type: string; payload: any }) => void, getState: any) => {
        try {
            const passwordRecovery = localStorage.getItem("passwordRecovery");
            switch (passwordRecovery) {
                case "true":
                    dispatch(passwordRecoveryUpdated(true));
                    break;
                case "false":
                    dispatch(passwordRecoveryUpdated(false));
                    break;
                default:
                    dispatch(passwordRecoveryUpdated(false));
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
