# UrbanCart.ai

AI-powered fashion discovery for modern India. Premium Angular 18 + Tailwind storefront with Spring Boot 3 backend, JWT auth, Gemini-powered recommendations, and PostgreSQL via Docker.

## Stack
- Angular 18 (standalone components, signals) + Tailwind CSS
- Spring Boot 3 (Java 21), JPA/Hibernate
- PostgreSQL (Docker Compose)
- JWT Authentication
- Gemini Free API for AI recommendations (strategy-ready for more providers)

## Quickstart
1. **Start Postgres**
   ```bash
   docker-compose up -d
   ```
2. **Backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run # or mvn spring-boot:run
   ```
   - Env: set `GEMINI_API_KEY` (or edit `application.yml` key `gemini.api.key`).
   - Swagger: `http://localhost:8080/swagger-ui/index.html`
3. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run start
   ```
   App runs on `http://localhost:4200` and points to backend at `http://localhost:8080`.

## Backend Modules (package-by-feature)
- `auth` – signup/login/refresh with BCrypt + JWT
- `products` – product listing/detail
- `reviews` – fetch/add product reviews
- `cart` – cart CRUD per user
- `orders` – checkout and order history
- `recommendation` – AI provider strategy, Gemini implementation
- `users` – profile fetch/update
- `common` – exceptions, API error envelope

## Key API Endpoints
- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/refresh`
- `GET /api/products` (pagination, `category`, `search`), `GET /api/products/{id}`
- `GET/POST /api/products/{id}/reviews`
- `POST /api/ai/recommend` (Gemini keyword extraction → matching products)
- `GET /api/cart`, `POST /api/cart/add`, `POST /api/cart/update`, `DELETE /api/cart/{productId}`
- `POST /api/orders/create`, `GET /api/orders/me`
- `GET /api/users/me`, `PUT /api/users/me`

## Database & Seeding
- Flyway migration `V1__init.sql` creates schema and seeds:
  - 5 users (password: `password` for seeded hashes)
  - 10 products with image URLs
  - Sample reviews and orders
- Datasource: `jdbc:postgresql://localhost:5432/urbancart` (`urbancart`/`urbancart`).

## AI Provider Strategy
- `AIProvider` interface defines `generateKeywords(query)`.
- `GeminiProvider` calls Gemini Free API (`gemini.api.key`).
- `RecommendationService` wires the provider and maps keywords to product search; add future providers by implementing `AIProvider` and wiring via Spring injection.

## Frontend Highlights
- Sticky black navbar, beige/charcoal palette, hero banner, animated product cards.
- Pages: Home, AI Search, Product Detail (gallery + reviews), Cart, Checkout, Orders, Profile, Auth.
- Shared UI: product cards, rating stars, review list, quantity selector, spinner.
- Auth Guard + HTTP interceptor persist JWT in `localStorage`.

## Configuration
- `backend/src/main/resources/application.yml`: DB creds, JWT secrets, Gemini key placeholder.
- `docker-compose.yml`: Postgres service with persisted volume `./pgdata`.

## Production Notes
- Replace default JWT secret with a secure base64 key.
- Serve frontend via CDN/hosting and point environment API base URL accordingly.
- Add HTTPS and CORS rules per environment.
