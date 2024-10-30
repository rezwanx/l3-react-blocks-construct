export type User = {
  itemId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
};

export type UsersTableProps = {
  users: User[] | [];
};
