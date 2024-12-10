import sanityClient from '@sanity/client';

// Configure the Sanity client
const client = sanityClient({
  projectId: "5lx97cs7", // Your Sanity project ID
  dataset: "production", // Dataset name
  apiVersion: "2023-12-01", // API version
  useCdn: true, // `true` for faster performance; `false` to get draft content
});

export default client;