import { ICO } from "../../db/models/ico";
import { formatIco, returnAsEmbed, shortFormatIco } from "./formatters";

const addIco = async (
  [
    name,
    contributionAddress,
    minAmount,
    maxAmount,
    amountType,
    tokenRate,
    tokenName
  ]
) => {
  const newIco = await ICO.newIco({
    name,
    contributionAddress,
    minAmount,
    maxAmount,
    amountType,
    tokenRate,
    tokenName
  });
  return console.log(newIco);
};

const delIco = async ([name]) => {
  console.log(await ICO.deleteIco(name));
};
const addMember = async ([icoName, amount, returnAddress, username]) => {
  const ico = await ICO.findIcoByName(icoName);

  if (!ico) {
    return null;
  }
  return console.log(ico.addMember({ amount, name: username, returnAddress }));
};
const removeMember = async ([icoName, name]) => {
  const ico = await ICO.findIcoByName(icoName);

  if (!ico) {
    return null;
  }
  return console.log(ico.removeMember(name));
};
const confirmTx = async ([icoName, txid, name]) => {
  const ico = await ICO.findIcoByName(icoName);
  if (!ico) {
    return null;
  }
  return console.log(ico.confirmTx(txid, name));
};

const displayIco = async ([icoName]) => {
  const ico = await ICO.findIcoByName(icoName);
  return returnAsEmbed(formatIco(ico));
};

const listIcos = async () => {
  const icos = await ICO.find({});
  const result = icos.map(ico => shortFormatIco(ico));
  return returnAsEmbed(result);
};

export default {
  new: addIco,
  del: delIco,
  list: listIcos,
  display: displayIco,
  leave: removeMember,
  join: addMember,
  confirmTx
};
