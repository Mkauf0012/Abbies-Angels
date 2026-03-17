import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '9da37bda035d1a40011b21dd8f4eb28a247fe65a', queries,  });
export default client;
  