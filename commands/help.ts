import { largeSpace, mediumSpace, smallSpace } from "../util/formatting";

export default (client, message, args) => {
  switch (args[0]) {
    default:
      message.channel.send(help());
  }
};

const help = () => {
  return {
    embed: {
      title: `Help`,
      fields: [
        {
          name: `.help`,
          value: `
default:${largeSpace} Shows general command overview
cmc:${largeSpace} Shows detailed cmc help
ico:${largeSpace} Shows detailed ico help`
        },
        {
          name: `.cmc`,
          value: `
stats:${largeSpace} Serves general data about the market
s:${largeSpace}${smallSpace}  Alias for stats
ticker <TICKER|SYMBOL>: ${smallSpace}Serves specific data about a coin :rocket:
t:${largeSpace}${smallSpace}  Alias for ticker`
        },
        {
          name: `.ico`,
          value: `
new <NAME><CONTRIBADDR><MIN><MAX><TYPE><RATE><SYMBOL>:
${largeSpace} ${smallSpace}    Create new group buy
del <NAME>: ${mediumSpace} ${smallSpace}   Delete the group buy
join <NAME><AMOUNT><ADDR>:
${largeSpace} ${smallSpace}     Join the group buy of an ICO
confirmTx <NAME><TXID>:     Confirm that you have sent your contribution
list:${largeSpace}${smallSpace}Lists all active ICOs
display <NAME>:${mediumSpace}     Displays the group buy
leave <NAME>: ${mediumSpace}       Leave the group buy for an ICO
					`
        },
        {
          name: `.per`,
          value: `
add <TICKER|SYMBOL><AMOUNT>:     
${largeSpace} ${smallSpace}      Add a token to your portfolio 
del <TICKER|SYMBOL>:${smallSpace}${smallSpace}   Remove the token from your portfolio
list:${largeSpace}${smallSpace} List your portfolio - Sent by DM `
        },
        {
          name: `.alert`,
          value: `
add <TICKER|SYMBOL><ABOVE/BELOW><PRICE><UNIT>:
${largeSpace} ${smallSpace}${smallSpace}Add a price alert
del <TICKER|SYMBOL>:
${largeSpace} ${smallSpace}${smallSpace}Remove an alert
list
`
        },
        {
          name: `.sched`,
          value: `
add <NAME><DATE>: ${smallSpace}${smallSpace}    Add an upcoming ICO
remove <NAME>: ${mediumSpace}    Remove an ICO from the list
list: ${largeSpace}${smallSpace}List all upcoming ICOs`
        },
        {
          name: `Spacing this is cancer`,
          value: `This is what you get :)`
        }
      ]
    }
  };
};
