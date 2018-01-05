enum User {
  USERNAME = "username",
  ALIAS = "alias",
  VERIFIED = "verified"
}

interface IUserPrimary {
  username: string;
}

interface IUserData extends IUserPrimary {
  alias: string;
  verified: string;
}

export { User, IUserPrimary, IUserData };
