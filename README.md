# fullstackopen
Course material for the Full Stack Open course by the University of Helskini.

## To browse the project websites:

- 🩺 [**patientor**](https://fullstackopen-patientor-ucm1.onrender.com/) (part09) is a patient medical records app, written with:
  - Vite + TypeScript React
  - TanStack Query (queries the backend & caches results---avoids storing server-state on the client, e.g. in `useState`)
  - Material UI
 
- 📚 [**phonebook**](https://fullstackopen-phonebook-ab91.onrender.com/) (part 02-03) is a simple personal phonebook app, using:
  - Vite (for development, & as a proxy during production to serve client & server from the same port)
  - Front-end: JavaScript React
  - Back-end: Node + Express, and `mongoose` to query data from MongoDB

- 📚 [**library**](https://fullstackopen-library.onrender.com/) (part08) is a more advanced personal library management app, implementing user login and protected API endpoints.
  - Vite
  - Front-end: JavaScript React + React Router (to manage different views on the page)
  - Back-end: Node + Express + `mongoose` as above, and:
    - Apollo GraphQL for a single endpoint `/graphql`, with certain user-authenticated functions enforced using JSON Web Tokens (JWT)
    - `bcrypt` for password hashing and verifying
    - try logging in with:
      ```
      username: mluukkai
      password: mluukkai
      ```

