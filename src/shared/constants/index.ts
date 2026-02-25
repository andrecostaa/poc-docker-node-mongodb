type Constants = {
  PORT: string;
  MONGO_URI: string;
};

const CONSTANTS: Constants = {
  PORT: process.env.PORT || "3000",
  MONGO_URI: process.env.MONGO_URI || "",
};

export default CONSTANTS;
