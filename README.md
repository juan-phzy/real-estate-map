# An Interactive Map Application for Real Estate Prospecting

## Description
This project is designed to empower real estate brokers with data-driven insights and search capabilities, enabling them to efficiently identify new leads and prospects. This is a Micro-Internship project for Open Avenues in collaboration with Meridian Capital led by project manager Serhii Vaiser.

## Future Updates
While the base of this project is done, it will continue to be worked on and enhanced to provide more features, faster loading, and an overall better user experience.

## Developer

Juan Hernandez - [Connect With Me on LinkedIn !](www.linkedin.com/in/juan-hernandez-80764a24b)

## Vercel Deployment

[Click here to view the active deployment of this project](https://real-estate-map-woad.vercel.app/)

## Visuals
#### Default Home Screen
![Default View.](/public/images/defaultView.png "This is the default view.")
#### Clicked Parcel Screen
![Parcel View.](/public/images/parcelView.png "This is the parcel view.")
#### Autocomplete Address Search
![Search View.](/public/images/searchView.png "This is the search view.")
#### Full Screen Map
![Map View.](/public/images/mapView.png "This is the map view.")
#### Mobile Device View
![Mobile View.](/public/images/mobileView.png "This is the mobile view.")
#### Sales Tab
![Sales View.](/public/images/salesView.png "This is the sales view.")
## Technologies Utilized

1. **Next.JS** - Next.js is a React framework for web development. It enhances the development and user experience by introducing Server Actions for efficient data mutations and Partial Prerendering for optimizing content rendering. These features, along with improved metadata management, streamline both the performance and flexibility of web applications.
2. **Vercel** - Vercel is a cloud platform optimized for deploying and scaling modern web applications, known for its seamless integration with frameworks like Next.js. It provides automatic scaling, serverless functions, and a global CDN to enhance performance and ease of development.
3. **Git / GitHub** - Git is a distributed version control system that enables multiple developers to track and manage changes to code. GitHub is a hosting platform that leverages Git's capabilities for collaborative project management and code sharing. We used both of these to keep track of our changes and progress week by week.
4. **GraphQL & Apollo Client** - GraphQL and Apollo Client are powerful tools that significantly enhance the capabilities of web development, especially in projects that require complex data management and real-time updates. We chose these to fetch our data due to their efficient data loading, strongly typed schema, and built-in debugger. 
5. **MapBox** - We used MapBox as our location data platform which provided tools for us to create a custom online map and location-based functionality. With this we were able to customize the map to our own style, add layers for property outlining, and event handlers for custom popups and rendering.
6. **Tailwind CSS** - Tailwind CSS is a utility-first CSS framework that enables rapid UI development by providing low-level utility classes for directly styling HTML elements.
7. **TypeScript / JavaScript** - TypeScript is a statically typed superset of JavaScript that enhances code quality and developer productivity by adding optional static types and modern language features to JavaScript. It helped us find errors early on and make sure that our code is full-proof.
8. **Google Maps API** - In my project, I utilized the Google Geocoding API to convert addresses into precise geographic coordinates, the Google Places Autocomplete API to enhance the user interface by suggesting possible locations as users type, and the Google Street View Static API to embed panoramic street-level imagery. These APIs collectively improve user interaction, provide accurate location-based insights, and visually enrich the application, ensuring a comprehensive and engaging user experience.
9. **Azure Data API** - We leveraged the Azure Data API builder to integrate Azure Databases as a GraphQL server, which significantly enhances the backend's functionality. This setup allows for efficient and flexible data management, enabling complex queries and mutations that improve the application's responsiveness and scalability.


## Set Up This Project

To clone this project and set up the development you must have VS Code and Node
installed on your device. 

Once you have cloned the repository, install and update all packages by running the following command in your terminal:
```bash
npm install

```
Once all packages are installed and updated, you can then run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Reminder that you will need your own Google API Key and MapBox Token.
