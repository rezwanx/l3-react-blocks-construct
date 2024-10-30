// export const getToken = async (body) => {
//   const res = await axios.post(`/api/identity/v20/identity/token`, body, {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded", // Set correct Content-Type
//     },
//     withCredentials: true,
//   });
//   return res;
// };

export const signin = async (data: { email: string; password: string }) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", data.email);
  formData.append("password", data.password);
  return (
    await fetch("", {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  ).json();
};
