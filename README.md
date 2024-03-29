<h1 align="center">
  
  ![earthsensor](https://github.com/VasaOfficial/EarthSensor/assets/113908218/33b8867c-735d-4461-9a5e-c0f05c654807)

</h1>
<p align="center">
  <strong>EarthSensor provides air pollution and weather information for cities around the world.</strong>
</p>

<p align="center">
  <em>The app fetches data from the Aqicn REST API and presents it in a user-friendly format using graphs.</em>
</p>

![Screenshot_2-min](https://github.com/VasaOfficial/EarthSensor/assets/113908218/0c48491d-f3f3-42fa-bf76-0a0a43693180)

<h2>About</h2>

EarthSensor is a web application that allows users to search for a city and retrieve detailed information about its current air quality and weather conditions. The app visualizes the data using graphs and provides a 3D globe, built with ThreeJS, displaying stations with AQI (air quality index) levels higher than the norm.

This project was a way for me to learn a few cool libraries and frameworks that I have been eyeing out for a while. I wanted to try NextJS 13 and its routing, its SEO friendly ways and its SSR. It was a fun challenge to learn it and I feel confident in my skill with NextJS 13.

I had a lot of fun learning about THREE.JS and how to model dynamic data using vectors and geometries.

This project was also a great opportunity to include Tailwind CSS in order to make styling a bit faster, especially since I already had a lot to process learning WebGL. I also expanded my knowlege with React and Typescript with this project.

<h2>Features</h2>

- Search for a city to access real-time air quality and weather information.
- Interactive 3D globe visualization highlighting stations with higher AQI levels.
- User-friendly graphs presenting air pollution data in a visually appealing manner.

<h2>Live Demo</h2>

Check out the live demo of EarthSensor [here](https://earth-sensor.vercel.app/).

<h2>Technologies Used</h2>

- React
- Next.js
- TypeScript
- Tailwind CSS
- Three.js
- GSAP
- Aqicn API
- Unsplash API
- Mapbox

<h2>Design</h2>

![Untitled-2023-07-03-1330-min](https://github.com/VasaOfficial/EarthSensor/assets/113908218/cb56ac9d-46ce-4d77-bf62-ac337a0212d1)

<h2>Installation</h2>

To run EarthSensor locally, follow these steps:

1. Clone the repository: `git clone https://github.com/VasaOfficial/EarthSensor.git`
2. Install the dependencies: `cd earth-sensor && npm install`
3. Add `.env` and based on the env.mjs file add your API keys.
4. Start the development server: `npm run dev`
5. Open `http://localhost:3000` in your browser.

<h2>Contributing</h2>

Contributions are welcome! If you'd like to contribute to EarthSensor, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

<h2>Acknowledgements</h2>

Special thanks to the creators and contributors of the libraries, frameworks, and APIs used in this project.

<h2>License</h2>

Distributed under the MIT License.
