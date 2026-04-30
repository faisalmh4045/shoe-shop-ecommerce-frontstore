# Shoe Shop — Front Store

Customer-facing storefront for a full-stack e-commerce platform.  
Built with React 19, TanStack Query, React Router, and Supabase, following a client-driven architecture with server-powered filtering and search.

→ [Admin dashboard repo](https://github.com/faisalmh4045/shoe-shop-admin-dashboard) · [Live demo](https://shoe-shop-frontstore.vercel.app/)

---

## Features

- **Product listing page** — filtering (price, color, size), sorting, pagination (offset-based)
- **Configurable products** — dynamic image gallery + variant selection on PDP
- **Cart** — persisted in localStorage via Redux; offcanvas cart on every page
- **Checkout** — guest or authenticated; Cash on Delivery + Stripe
- **Order tracking** — guest order lookup by order number + email
- **User dashboard** — order history + profile update + password change
- **Full-text search** — using PostgreSQL GIN index (products.fts)
- **Auth** — Supabase email/password authentication

---

## Tech Stack

| Concern          | Technology                                |
| ---------------- | ----------------------------------------- |
| UI Library       | React 19                                  |
| Routing          | React Router v7                           |
| Styling & UI     | Tailwind CSS v4, shadcn/ui                |
| Backend          | Supabase (Postgres, Auth, Edge Functions) |
| Data fetching    | TanStack Query v5                         |
| State Management | Redux ToolKit (auth + cart)               |
| Payments         | Stripe.js                                 |

---

## Database

Schema, triggers, RPC functions, and edge functions are maintained in the
[admin dashboard repo](https://github.com/faisalmh4045/shoe-shop-admin-dashboard/tree/main/docs/database).

---

## Routes

```
/                                 Home
/category/:category               Product listing — filters, sort, pagination
/category/:category/:productSlug  Product detail — gallery, variant picker, add to cart
/product/:productSlug             Product detail
/search                           Full-text search results
/cart                             Cart summary + order totals
/checkout                         Address, payment method, order summary
/checkout/completion              Stripe return URL handler
/checkout/success/:orderNumber    Order confirmation
/track-order                      Guest order lookup form
/track-order/:orderNumber         Order detail for guests
/login                            Email + password
/signup                           Full name + email + password
/forgot-password                  Password reset email
/update-password                  Set new password (from reset link)
/account/profile                  Update display name + avatar
/account/orders                   Order history
/account/orders/:orderNumber      Order detail for logged-in users
```

---

## Data fetching

Three-layer pattern: **query function → custom hook → component**.

```
lib/queries/getPlpProducts.js   ← pure async function (Supabase call)
hooks/useQueries.js             ← wraps in useQuery with stable cache keys
pages/ProductListingPage.jsx    ← consumes hook (UI layer)
```

- Keeps data logic reusable and testable
- Ensures consistent caching via stable query keys
- Complex filters are serialized into query keys for precise invalidation

---

## Order lifecycle

#### Status Dependencies

| payment_status | shipment_status | → order_status | Notes             |
| -------------- | --------------- | -------------- | ----------------- |
| pending        | pending         | new            | Order placed      |
| paid           | pending         | processing     | Paid, not shipped |
| pending        | shipped         | processing     | COD in transit    |
| paid           | shipped         | processing     | Paid, in transit  |
| pending        | delivered       | processing     | COD delivered,    |
| paid           | delivered       | completed      | Order completed   |
| refunded       | \*              | canceled       | Refunded          |
| canceled       | \*              | canceled       | Payment canceled  |
| \*             | canceled        | canceled       | Shipment canceled |

#### Cancellation Rules (only admin can cancel)

| Context                | payment_status | shipment_status | order_status |
| ---------------------- | -------------- | --------------- | ------------ |
| Unpaid order canceled  | canceled       | pending         | canceled     |
| Paid but unshipped     | refunded       | pending         | canceled     |
| Shipped order canceled | refunded       | canceled        | canceled     |

---

## Getting started

### Prerequisites

- Node.js 20+ · npm
- A Supabase project with the schema from [shoe-shop-database](<[link](https://github.com/faisalmh4045/shoe-shop-admin-dashboard/tree/main/docs/database)>) applied
- A Stripe account (publishable key only needed in the front store)

### Installation

```bash
git clone https://github.com/faisalmh4045/shoe-shop-ecommerce-frontstore.git
cd shoe-shop-ecommerce-frontstore
npm install
cp .env.sample .env
```

### Environment variables

| Variable                      | Description            |
| ----------------------------- | ---------------------- |
| `VITE_SUPABASE_URL`           | Supabase project URL   |
| `VITE_SUPABASE_ANON_KEY`      | Supabase anon key      |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

### Run

```bash
npm run dev
```
