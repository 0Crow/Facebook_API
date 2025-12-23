# Facebook_API Demo ⚡️

A small demo that interacts with the Facebook API (client-side demo files).

## What’s included

- `facebook.html` — demo UI page
- `facebook.js` — JavaScript to interact with the API
- `facebook.css` — styles for the demo

## Quick start

1. Serve the folder locally and open `facebook.html` in your browser.
1. Input graph api token.
1. Inspect the console for logs and follow the page UI to try API calls.

## Purpose

This small demo demonstrates how to call Facebook Graph API endpoints from a client-side page for development and learning. It showcases the authentication flow using an access token and basic requests such as fetching profile data or public posts.

## How it works

- The demo reads configuration from the user input from `facebook.html`, attaches the access token to Graph API requests, and uses `fetch()` to call the Facebook Graph endpoints.
- Results are rendered in the UI and logged to the console; for security and production use, a backend should handle tokens and API requests.

## Notes

- Get your Facebook Graph API token on `https://developers.facebook.com/` then put it on searchbar to view output.
- Keep credentials and tokens private and out of version control.

