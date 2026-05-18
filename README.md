# StatesScope - U.S. Population
DataScope is a full-stack web application that allows users to explore and visualize U.S. population data using DataUSA API. This application will simplify access to the census based on demographic information.

Users can:
State population trend analysis
Dynamic filtering by year and state

The application uses:

Target Browsers: 
      StateScope is usable on desktop and mobile devices.
              Desktop Browsers
              Mobile Browsers

Link to Developer Manual

Technologies Used

- HTML
- CSS
- JavaScript
- Express.js
- Node.js
- Chart.js
- Leaflet.js
- Supabase
- Fetch API



## Developer Manual

Developer documentation can be found here:
Install Dependencies
npm install
npm install node-fetch


API Endpoints
GET /api/population/:year
Retrieves state population data for a specific year from the external DataUSA API.

Example
/api/population/2023
Returns
JSON population dataset.
GET /api/all-population

Retrieves all available population records from the external API.
Returns

JSON dataset containing all states and years.
GET /api/saved-population
Retrieves saved population records from Supabase.
Returns

Saved database entries.

Deployment

The project is designed to deploy using Vercel.

Recommended deployment steps:

Push repository to GitHub
Import repository into Vercel
Add environment variables in Vercel dashboard
Deploy application
