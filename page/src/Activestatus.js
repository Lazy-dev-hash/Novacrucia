const axios = require("axios");

module.exports = function (event) {
  return {
    setActiveStatus(userId) {
      const form = {
        recipient: {
          id: userId || event.sender.id,
        },
        sender_action: "mark_seen", // Sets the bot to mark the user's message as seen.
      };

      return Graph(form)
        .then((response) => {
          console.log("Active status (mark_seen) set successfully:", response);
          return { status: true, response };
        })
        .catch((err) => {
          console.error(
            "Error setting active status:",
            err.response ? err.response.data : err.message
          );
          return { status: false, response: err.response ? err.response.data : err.message };
        });
    },

    showTyping(userId) {
      const form = {
        recipient: {
          id: userId || event.sender.id,
        },
        sender_action: "typing_on", // Simulates typing action for the bot.
      };

      return Graph(form)
        .then((response) => {
          console.log("Typing indicator set successfully:", response);
          return { status: true, response };
        })
        .catch((err) => {
          console.error(
            "Error setting typing indicator:",
            err.response ? err.response.data : err.message
          );
          return { status: false, response: err.response ? err.response.data : err.message };
        });
    },
  };

  function Graph(form) {
    return axios
      .post(
        `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        form
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  }
};
