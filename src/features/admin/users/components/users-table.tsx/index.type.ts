export type User = {
  itemId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  active: boolean;
};

export type UsersTableProps = {
  users: User[] | [];
};
