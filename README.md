# Stock Sync - Inventory Alignment App
Integration for two inventory systems (TAM Retail and Shopify) which each hold partial numbers for inventory. It highlights the differences and navigates users towards correction. 

Stock Sync is built using the Javascript MERN Stack:
- MongoDB w/ Mongoose
- Express.js
- React
- Node.js

## Link to Live Site
https://stock-sync.vercel.app/

## Features
- import CSV files to update database
- search and filter data from two collections simultaneously

## Pages / Views
- Dashboard - overview of data
- Inventory - displays both inventories with a dual search bar
- Upload - page to add more CSV data
- Item Page - allows for the editing of each item

### To - Do:
Moved to [Trello Board](https://trello.com/invite/b/6709845087f63a995eb30e14/ATTId405e7caa0f3d17d0aba2622b474e1f0A44D44C9/stocksync)

### Lessons Learned
- MongoDB automatically pluralizes collections.
- I should probably read more about CORS and what it means if it is gonna consistently be a problem.
- More features mean you need better organization.

### Future Steps
- Actually integrate with our Shopify account (didn't have explicit permission and need to use OAuth)
