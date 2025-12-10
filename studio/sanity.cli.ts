/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '', // Visit https://www.sanity.io/docs/environment-variables to learn more about using environment variables for local & production.
  autoUpdates: true,
  typegen: {
    path: "../frontend/sanity/**/*.{ts,tsx,js,jsx}", // glob pattern to your typescript files. Can also be an array of paths
    schema: "schema.json", // path to your schema file, generated with 'sanity schema extract' command
    generates: "../frontend/sanity.types.ts", // path to the output file for generated type definitions
    overloadClientMethods: true, // set to false to disable automatic overloading the sanity client
  },
})
