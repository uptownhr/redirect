export const globalConfiguration = () => ({
  release: process.env.RELEASE_NUMBER || 'undefined',

  env: {
    node: process.env.NODE_ENV,
    app: process.env.APP_ENV,
  },

  db: {
    url: process.env.DATABASE_URL
  }
});
