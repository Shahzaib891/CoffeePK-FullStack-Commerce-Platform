console.log("Notification system disabled in local environment");

const notification = {
  send: () => {
    console.log("Mock notification: skipped");
  }
};

export default notification;
