import { createClient } from "contentful";
const contentful = require("contentful");

const client = createClient({
  space: process.env.REACT_APP_CONTENTFULL_SPACEID, 
  environment: "master",
  accessToken: process.env.REACT_APP_CONTENTFULL_ACCESS_TOKEN, 
});
export default client;

export const fetchEntries = async () => {
  try {
    const entries = await client.getEntries();
    return entries.items;
  } catch (error) {
    console.error("Error fetching entries:", error);
  }
};

// client.getEntry('18Y6zz1f3I4lsDrUnMa2Q6')
//   .then((entry) => console.log(entry))
//   .catch(console.error)
