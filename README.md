# 🎬 Wallywood API

REST API bygget med **Node.js, Express, TypeScript og Prisma**.

API’et håndterer:
- Posters
- Bruger ratings
- Relationer mellem posters og brugere
- JWT authentication + admin-beskyttelse

---

## 🚀 Tech Stack
- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL / MariaDB
- JWT Auth

---

## ▶️ Start projektet

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

🧪 Test

API-test med Postman

Database inspiceres med HeidiS

👨‍💻 Udvi

Skoleprojekt i backend-udvikling


---

## 3️⃣ API-DOKUMENTATION (kun til Postman)

Denne del er **100 % praktisk** 👇  
Du kan endda lægge den i `/docs/postman.md`.

---

### 🔹 GET alle posters


HENT http://loc


**Response:**
```json
[
  {
    "id": 1452,
    "name": "Star Wars",
    "userRatings": []
  }
]

🔹 FÅ en enkelt plakat
GET http://localhost:3000/posters/1

🔹
POST http://localhost:3000/posters


H

Authorization: Bearer <TOKEN>
Content-Type: application/json


Legeme

{
  "name": "Ny Poster",
  "slug": "ny-poster",
  "price": 99,
  "stock": 5
}

🔹 OPDATER plakat
PUT http://localhost:3000/posters/1

{
  "price": 120
}

🔹 SLET plakat
DELETE http://localhost:3000/posters/1

⭐ Vurderinger
OPRET bedømmelse
POST http://localhost:3000/ratings

{
  "userId": 1,
  "posterId": 1452,
  "numStars": 5
}

GET-vurderinger
GET http://localhost:3000/ratings