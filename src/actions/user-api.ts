import { Session } from "@supabase/supabase-js";
import { supabase } from "../app/supabaseClient";
import { userRoleChanged, userIdChanged, userNameChanged } from "../features/user-slice";

export const getProfileInformation = (session: Session) => {
    return async (
        dispatch: (arg0: { type: string; payload: any }) => void,
        getState: any
    ) => {
        try {
            //fetch profile information
        } catch (error) {
            console.log((error as any).message);
        }
    };
};

export const updateProfileInformation = (session: Session, data: any) => {
    return async (
        dispatch: (arg0: { type: string; payload: any }) => void,
        getState: any
    ) => {
        try {
            //update profile information
        } catch (error) {
            alert((error as any).message);
        }
    };
};

