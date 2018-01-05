enum ICO {
  NAME = "name",
  OWNER = "owner",
  OWNER_ADDR = "o_address",
  TICKER = "ticker",
  DEADLINE = "deadline",
  MIN_TOTAL = "min",
  MAX_TOTAL = "max",
  MIN_INDIVIDUAL = "individual_min",
  MAX_INDIVIDUAL = "individual_max",
  METADATA = "metadata"
}

interface IICOPrimary {
  name: string;
  owner: string;
  owner_addr: string;
}

interface IICOData extends IICOPrimary {
  ticker: string;
  deadline: Date;
  min_total: number;
  max_total: number;
  min_indvidual: number;
  max_indvidual: number;
  metadata: object;
}

export { ICO, IICOPrimary, IICOData };
