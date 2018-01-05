enum ParticipatesICO {
  USERNAME = "username",
  ICO_NAME = "ico_name",
  ICO_OWNER = "ico_owner",
  TO_ADDR = "to_address",
  FROM_ADDR = "from_address",
  AMOUNT = "amount",
  DATE = "date"
}

interface IParticipatesPrimary {
  username: string;
  ico_name: string;
  ico_owner: string;
}

interface IParticipatesData extends IParticipatesPrimary {
  to_addr: string;
  from_addr: string;
  amount: number;
  date: Date;
}

export { ParticipatesICO, IParticipatesPrimary, IParticipatesData };
