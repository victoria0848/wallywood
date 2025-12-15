## Wallywood API

REST API bygget med **Node.js, Express, TypeScript og Prisma**.

API’et håndterer:
- Posters
- Bruger ratings
- Relationer mellem posters og brugere
- JWT authentication + admin-beskyttelse

---

## Tech Stack
- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL / MariaDB
- JWT Auth

---

## Start projektet

```bash
npm install
npx prisma generate
npm run dev

Serveren kører på:

http://localhost:3000

Vigtige endepunkter
Plakater

GET /posters

GET /posters/:id

POST /posters(administrator)

PUT /posters/:id(administrator)

DELETE /posters/:id(administrator)

Rati

GET /ratings

POST /ratings

PUT /ratings/:id

DELETE /ratings/:id

Test

API-test med Postman

Database inspiceres med HeidiS

Ulvikling

Skoleprojekt i backend-udvikling


---