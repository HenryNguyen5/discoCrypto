export default client => {
  console.log("Ready");

  client.user.setPresence({
    status: "online",
    game: {
      name: "NoCoinerWatch",
      type: 0
    }
  });
};
