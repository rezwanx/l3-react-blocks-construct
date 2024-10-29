import { getToken } from "../services/auth.service";
import { getDefaultOrganization } from "../services/organization.service";

export const useAuth = () => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "authenticate_site");
  const token = getToken(formData);

  const signin = async (values: { email: string; password: string }) => {
    const defaultOrganization = await getDefaultOrganization({
      UserName: values.email,
    });
    console.log(defaultOrganization);
    return defaultOrganization;
  };
  return {
    token,
    signin,
  };
};
