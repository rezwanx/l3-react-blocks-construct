export const getUsers = async (data: { page: number; pageSize: number }) => {
  //   return (
  //     await fetch("/data", {
  //       method: "post",
  //       body: JSON.stringify(data),
  //     })
  //   ).json();
  console.log(data);
  return {
    totalCount: 100,
    data: [
      {
        itemId: "9fde9485-8e95-485a-87b4-7825b2aeb842",
        createdDate: "2024-10-24T11:48:41.888Z",
        lastUpdatedDate: "2024-10-24T12:28:53.397Z",
        language: "string",
        salutation: "string",
        firstName: "string",
        lastName: "string",
        email: "example@selise.biz",
        userName: "string",
        phoneNumber: "+8801708989765",
        roles: [],
        permissions: [],
        active: false,
        isVarified: false,
        profileImageUrl: null,
        mfaEnabled: false,
      },
    ],
    errors: null,
  };
};
