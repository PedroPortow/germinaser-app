import { AuthContext } from "@context";

export default function useAuthContext() {
  return useContext(AuthContext);
}