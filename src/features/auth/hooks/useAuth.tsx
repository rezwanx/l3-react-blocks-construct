import { getToken } from "../services/auth.service";

export const useAuth = () => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "authenticate_site");
  const token = getToken(formData);
  return token;
};
