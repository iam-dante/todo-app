import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "./FirebaseService";

export default function useProfile() {
    const [user] = useAuthState(FirebaseAuth);

    return user

}