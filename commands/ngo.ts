export default (client, message, args) => {
  switch (args[0]) {
    case "gtfo":
      message.channel.send(ngo());
    default:
  }
};

// Commands
const ngo = () => {
  return {
    embed: {
      fields: [
        {
          name: `:middle_finger:`,
          value: `
:no_entry_sign: :no_entry_sign: :no_entry_sign:
NO COINERS GET OUT
:poop: :poop: :poop:
:thumbsdown:`
        }
      ]
    }
  };
};
