# Stock Sync
Integration for two inventory systems (TAM Retail and Shopify) which each hold partial numbers for inventory. It highlights the differences and navigates users towards correction. 

## Link to Live Site
will probably need to find a way so that testers don't mess with my data lol

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
- [ ] Proper usage of ES6 syntax and tools
- [ ] Functions and classes to adhere to DRY principle
- [ ] Promises, async and await
- [ ] Axios or fetch to retrieve data from API
- [ ] Sound programming logic
- [ ] Appropriate exception handling
### Database
- [ ] Use MongoDB to create a database
- [ ] Apply appropraite indexes to your database collections
- [ ] Create reasonable schemes for data following data modeling best practices
### Server
- [ ] Create a RESTful API using Node and Express (forgo HATEOAS)
- [ ] API routes for all CRUD operations
- [ ] Utlize MongoDB driver or Mongoose to interface with your database
### Front-End Development
- [X] Use React to create front-end
- [X] Use CSS to style the application
- [ ] Create atleast four different views or pages for the application
- [ ] Create some form of navigation used across the pages, w/ React Router for page rendering
- [ ] Use React Hooks or Redux for application state managemnet
- [ ] Interface directly with the server and API you created 
### Presentation
- [ ] Create a short overview of your application
- [ ] Highlight use cases
- [ ] Highlight technical functionality of the application
- [ ] Discuss what I've learned
- [ ] Discuss future additional features
### Extra Credit 
- [ ] Agile principles and Scrum framework
- [ ] Track using JIRA or similar
- [ ] Build w/ TypesScript 


### To - Do:
- [ ] search bar testing
- [ ] main search bar has to search both!
- [ ] add filter button back
- [ ] nav bar
- [ ] error message for upload
- [ ] fix css for upload page
- [X] add way to upload tam 
- [ ] and shopify data
- [ ] remove leading zeros
- [ ] create pagination
- [ ] if synced, inventory values need to match (gotta think on this more)
- [ ] Add logic handling for cycle counts to Item.jsx statuses
- [ ] Figure out item variations (colors, sizes)
- [ ] Way to check if prices are updated
- [ ] Better match handling (right now only checks if sku exists) [in item.jsx]
- [ ] Out of Stock Status Button
- [ ] Way to Search both boards at once? and check if their data lines up

### Presentation
- demonstration of the application
- overview of the challenges endured and how I handled them
- short q/a

### Lessons Learned
- MongoDB automatically pluralizes collections.
- I should probably read more about CORS and what it means if it is gonna consistently be a problem.

### Future Steps
- Actually integrate with our Shopify account (didn't have explicit permission and need to use OAuth)
