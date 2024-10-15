# Stock Sync - Inventory Alignment App
Integration for two inventory systems (TAM Retail and Shopify) which each hold partial numbers for inventory. It highlights the differences and navigates users towards correction. 

Stock Sync is built using the Javascript MERN Stack:
- MongoDB w/ Mongoose
- Express.js
- React
- Node.js

## Link to Live Site
will probably need to find a way so that testers don't mess with my data lol

## Features
- import CSV files to update database
- search and filter data from two collections simultaneously

## Requirements
### Project Structure Standardization, and Convention
- [X] Organized into appropriate files and directories
- [ ] Properly commented
- [X] Pushed to GitHub
- [ ] ReadME with description 
- [X] Standard naming conventions
- [ ] Runs without errors
- [X] Level of effort displayed in creativity, presentation, and user experience
### Core JavaScript
- [X] Proper usage of ES6 syntax and tools
- [X] Functions and classes to adhere to DRY principle
- [X] Promises, async and await
- [X] Axios or fetch to retrieve data from API
- [X] Sound programming logic
- [ ] Appropriate exception handling
### Database
- [X] Use MongoDB to create a database
- [X] Apply appropraite indexes to your database collections
- [X] Create reasonable schemes for data following data modeling best practices
### Server
- [ ] Create a RESTful API using Node and Express (forgo HATEOAS)
- [ ] API routes for all CRUD operations
- [X] Utlize MongoDB driver or Mongoose to interface with your database
### Front-End Development
- [X] Use React to create front-end
- [X] Use CSS to style the application
- [ ] Create at least four different views or pages for the application
- [X] Create some form of navigation used across the pages, w/ React Router for page rendering
- [X] Use React Hooks or Redux for application state managemnet
- [X] Interface directly with the server and API you created 
### Presentation
- [ ] Create a short overview of your application
- [ ] Highlight use cases
- [ ] Highlight technical functionality of the application
- [ ] Discuss what I've learned
- [ ] Discuss future additional features
### Deployment
- [ ] Deploy site (both Front-End(Vercel) and Back-End (Render))
### Extra Credit 
- [ ] Agile principles and Scrum framework
- [ ] Track using JIRA or similar
- [ ] Build w/ TypesScript 


### To - Do:
Moved to [Trello Board](https://trello.com/invite/b/6709845087f63a995eb30e14/ATTId405e7caa0f3d17d0aba2622b474e1f0A44D44C9/stocksync)
  
### Presentation
- demonstration of the application
- overview of the challenges endured and how I handled them
- short q/a

### Lessons Learned
- MongoDB automatically pluralizes collections.
- I should probably read more about CORS and what it means if it is gonna consistently be a problem.

### Future Steps
- Actually integrate with our Shopify account (didn't have explicit permission and need to use OAuth)
