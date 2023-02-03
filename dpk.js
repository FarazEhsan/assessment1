const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  //remove if else for canidate, whichever returns defined, stringyfy event before hand

  const data = JSON.stringify(event);
  let candidate =  event.partitionKey || crypto.createHash("sha3-512").update(data).digest("hex");

  //replace the below if/ else conditions with nested ternary operator and the || to avoid undefined
  return candidate.length > MAX_PARTITION_KEY_LENGTH ? crypto.createHash("sha3-512").update(candidate).digest("hex")
    :(typeof candidate !== "string"? JSON.stringify(candidate) || TRIVIAL_PARTITION_KEY): 
};


