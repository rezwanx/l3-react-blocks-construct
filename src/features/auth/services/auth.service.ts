export const getToken = async (body) => {
  const res = await (
    await fetch(
      "https://msblocks.seliselocal.com/api/identity/v20/identity/token",
      {
        method: "post",
        body,
      }
    )
  ).json();
  return res;
};
