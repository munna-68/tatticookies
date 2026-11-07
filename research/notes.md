# Tatti Cookies — In-Depth Research & Website Audit

**Target Business:** Tatti | Gourmet Cookies & Bakes  
**Location:** Austin, Texas  
**Instagram:** [@tatticookies](https://www.instagram.com/tatticookies/) (~970 followers, 94 posts)  
**Live Website:** [tatticookies.com](https://tatticookies.com)  
**Audit Date:** November 2026 (Live data capture)

---

## 1. Business Summary

Tatti Cookies is an artisan, small-batch gourmet cookie and bakery business based in Austin, Texas. It is operated as a solo cottage bakery ("small batch, one woman operated") operating under the **Texas Cottage Food Law**. 

The brand specializes in oversized, decadent, stuffed cookies with molten gooey centers, premium mix-ins (Nutella, Belgian milk chocolate, toasted kataifi, Biscoff, pistachio cream, brown butter, flaky sea salt), and whimsical, joyful presentation.

Orders are fulfilled via three channels:
1. **Austin Local Pickup** (designated Saturday window)
2. **Austin Local Delivery** (Austin metro)
3. **Texas-wide Shipping** (ships via postal mail on Mondays)

---

## 2. Ordering Model (Drop Cycle)

The business operates strictly on a **weekly pre-order drop cycle**:
- **Drop Window Opens:** Monday at 12:00 PM CST
- **Drop Window Closes:** Friday at 12:00 PM CST (or when weekly batch capacity sells out)
- **Local Pickup Time:** Saturday 11:00 AM – 2:00 PM CST
- **Texas Shipping Date:** Orders ship out on Monday following the drop closure
- **Fulfillment Model:** Cookies are sold in curated or custom multi-packs:
  - **Box of 4** (Site price: $24.00)
  - **Box of 6** (Site price: $36.00)
  - **Box of 10** (Site price: $58.00 — $2 discount)
- **Order Mechanism:** Customers must choose a box size, then select exact cookie count matching the box size before adding to cart.

---

## 3. Full Menu As Found (Live Shopify Catalog)

*Source: Live catalog endpoint `tatticookies.com/products.json` & Instagram announcements*

| # | Cookie Name | Category / Flavor Notes | Ingredients / Description as Published | Verified Status |
|---|---|---|---|---|
| 1 | **Pecan Dulce** | Signature Nut & Caramel | Vanilla cookie \| dark & milk chocolate \| toasted pecans \| dulce de leche | **Verified** (Shopify ID: 10491041775911) |
| 2 | **Biscoff Cream** | Fall Seasonal / Spiced Cookie Butter | Vanilla cinnamon cookie \| lotus biscoff cookie pieces \| white chocolate \| cookie butter | **Verified** (Shopify ID: 10477913080103) |
| 3 | **Pistachio White** | Nut & Cream | Vanilla cookie \| white chocolate \| roasted pistachios \| pistachio cream | **Verified** (Shopify ID: 10477917765927) |
| 4 | **Red Velvet Nutella S'mores** | Stuffed & S'mores | Red velvet cookie \| white chocolate \| cream cheese chips \| nutella \| marshmallow \| graham cracker | **Verified** (Shopify ID: 10477919863079) |
| 5 | **Kinder Hazelnut** | European Confection Stuffed | Vanilla cookie \| kinder chocolate \| milk chocolate \| white chocolate hazelnut cream \| topped with kinder bueno | **Verified** (Shopify ID: 10477933953319) |
| 6 | **Ferrero Hazelnut** | Dark Chocolate & Hazelnut | Dark cacao cookie \| milk chocolate \| roasted hazelnuts \| nutella \| ferrero rocher | **Verified** (Shopify ID: 10477922713895) |
| 7 | **Chocolate Chunk** | Classic Brown Butter | Brown butter \| milk chocolate \| dark chocolate \| hint of espresso \| flaky sea salt | **Verified** (Shopify ID: 10477912228135) |
| 8 | **Dubai Pistachio** | Viral Specialty | Dark cacao cookie \| milk chocolate \| pistachios \| toasted kataifi \| pistachio cream | **Verified** (Shopify ID: 10477907515687) |
| 9 | **Brown Butter Banana Bread Cookie** | Experimental / Drop Special | Brown butter banana cookie dough \| cinnamon \| chocolate chunks (featured on IG) | **Verified** (Instagram Post) |
| 10 | **Cookie Box (Assortment)** | Custom Bundle | Available in sizes of 4, 6, or 10. Customer picks their flavor combo | **Verified** (Shopify ID: 10477901218087) |

*(Note: Real prices are recorded above for audit purposes, but per strict rules, all customer-facing build pages will use clearly labeled demo prices).*

---

## 4. Policies & Operating Details

- **Pickup Location & Details:** 
  - Saturday pickup between 11:00 AM – 2:00 PM CST.
  - Specific pickup address is in Austin, TX, but is **NOT disclosed** anywhere on the homepage, menu, or FAQ. Customers only find out during checkout or via DM. [Unverified exact address on site].
- **Delivery Area & Fees:**
  - Advertised on IG bio and posts as "Austin pickup | delivery".
  - Delivery radius, zip codes, minimum order, and delivery fees are **completely absent** from the website navigation and FAQ. [Unverified exact fee & zip codes].
- **Shipping Area & Timing:**
  - Texas-wide shipping ONLY (strictly enforced due to Texas Cottage Food Law interstate sales prohibition).
  - Ships Mondays following the Friday order cutoff.
  - Carrier: USPS Priority / regional courier.
- **Lead Times:**
  - All cookies are baked fresh to order in small batches. No same-day orders.
- **Food Allergen Disclaimer (Published Text):**
  - "All of our cookies contain wheat, milk, egg and soy. Several flavors also contain tree nuts, such as pistachio, pecan, walnut and hazelnut."
  - "Our cookies are made in a home kitchen under the Texas Cottage Food Law. The same kitchen handles nuts and other common allergens. Even with careful cleaning, we can't guarantee that any cookie is free of an allergen."
  - "Contact: hello@tatticookies.com"
- **Storage & Cookie Care (Found from product accordions):**
  - "Best within 3 days at room temperature in the box. Freeze for up to 2 months."
- **Custom Orders, Events & Catering:**
  - None listed on the website. No corporate form or catering page exists. [Unverified whether taken informally via IG DMs].
- **Refund Policy:**
  - Standard food cottage policy: perishable items baked to order cannot be returned. Links to `/policies/refund-policy` return HTTP 403 on the live site.
- **Contact:**
  - Email: `hello@tatticookies.com`
  - Instagram: `@tatticookies`
  - TikTok: `@tatticookies`

---

## 5. Site Map & Navigation Audit

- `/` (Home):
  - Banner: "CAREFULLY MADE. PERFECTLY BAKED."
  - Drop status countdown box (orders close Friday 12 PM)
  - "BUILD YOUR BOX" button
  - Value props ("Real ingredients made from scratch", "Handmade in the USA", "Freshly made to order")
  - Carousels with cookie SVG graphics / product cards
  - Newsletter / drop reminder form (submits to `/contact` with tag `drop-reminder`)
- `/collections/flavors` (Flavors / Shop):
  - Lists box price tiers ($24, $36, $58)
  - Grid of the 8 individual flavors, each with a button to "BUILD A BOX"
- `/products/<handle>` (Product Detail Pages):
  - Product image gallery
  - Price: "From $24" (confusing: individual cookie shows box starting price!)
  - Flavor ingredients
  - "Build a box" button linking to `/pages/build-your-box?flavor=<handle>`
  - Three accordion details: Allergens, Storage, Pickup & Shipping
  - Related products grid
- `/pages/build-your-box`:
  - Custom section with pills: "Box of 4", "Box of 6", "Box of 10"
  - Counter showing "Selected X/Y"
  - List of cookies with +/- buttons
  - "Add box of X · $Y" button (disabled until exact count is reached)
  - Small pickup/mail note
- `/pages/faq`:
  - **BLANK** (`body_html: ""` in Shopify). No content!
- `/pages/contact` & `/pages/contact-1`:
  - **BLANK** (`body_html: ""` in Shopify). No form, no email!
- `/pages/cookie-care`:
  - **BLANK** (`body_html: ""`).
- `/pages/food-allergen-disclaimer`:
  - Has cottage food allergen statement.
- `/cart`:
  - Shopping cart summary; requires drop to be open to proceed.
- `/policies/*` (`/policies/privacy-policy`, `/policies/refund-policy`, `/policies/shipping-policy`):
  - All return **HTTP 403 Forbidden**.

---

## 6. Technology Stack

- **Platform:** Shopify Storefront (`7j0kmm-pb.myshopify.com`)
- **Theme:** Custom child theme named `"Tatti ready"` (Theme ID: 190384177447)
- **Frontend Assets:**
  - CSS: `theme.css` with CSS custom properties:
    - `--cr`: `#990232` (Crimson / Deep Burgundy)
    - `--bg`: `#FEF3E5` (Warm Cream / Peach Tint)
    - `--ye` / `--yl`: `#FFF5C7` (Butter Yellow)
  - Fonts: Google Fonts `Rubik` (500, 600, 700, 800) for display/headers, `Inter` (400, 600, 700, 800) for body copy.
  - Script: `theme.js` containing custom drop timer (America/Chicago timezone calculation), procedural SVG cookie generator, and `/cart/add.js` AJAX bundle handler with custom line-item property `_bid` (box ID).
- **Payment & Checkout:** Shopify Payments / Shop Pay / Apple Pay / PayPal.
- **Bot Protection:** hCaptcha script on privacy/forms.
- **Analytics / Tracking:** Shopify standard storefront actions & web pixels manager.

---

## 7. Visual Brand & Tone Notes

- **Color Palette:**
  - Deep Burgundy / Crimson: `#990232` (Primary brand color, ink, and headers)
  - Butter Yellow: `#FFF5C7` (Warm accent, cards, buttons)
  - Warm Cream / Blush: `#FEF3E5` (Background canvas, soft tint)
  - White: `#FFFFFF` (Clean contrast)
- **Typography:**
  - Bold, punchy headings with warmth.
  - Uppercase display headings, but the current site overuses uppercase Rubik on *everything* (buttons, badges, pills, body captions), which feels aggressive and unrefined.
- **Illustration & Accents:**
  - Hand-drawn line art accents: bakery icons (rolling pin, apron, oven mitts, cookies, Austin delivery bicycle).
  - Tactile, joyful, artisanal home bakery vibe.
- **Voice & Tone:**
  - Warm, personal, passionate, community-driven ("small batch, one woman operated", "our little cookie dream", "grateful for every order").
  - Clear calls to action on Instagram: "Comment DROP and I'll send you this week's menu and pickup details."
  - Relies heavily on DMs to resolve order ambiguities because the website lacks clarity.

---

## 8. Audit: Keep vs. Fix vs. Missing

### What the Current Site Does Well (Keep It)
1. **The Drop Window Concept:** Having an active countdown and clear open/close hours (Mon 12pm to Fri 12pm) creates natural scarcity and sets expectations.
2. **Box Assortment Model (4, 6, 10):** Prevents single-cookie fulfillment headaches and keeps average order value healthy ($24 – $58).
3. **Appetizing Flavor Names & Ingredient Descriptions:** Flavor profiles like *Red Velvet Nutella S'mores*, *Pecan Dulce*, and *Dubai Pistachio* are irresistible.
4. **Authentic Cottage Bakery Warmth:** Texas Cottage Food Law badge and "one woman operated" creates strong customer loyalty.

### What is Bland, Broken, or Jarring (Fix It)
1. **Jarring Color Clashing & Harsh Borders:** Overuse of heavy dark red blocks and harsh dashed borders creates visual clutter instead of appetite appeal.
2. **Blank Navigation Pages:** Clicking `FAQ`, `Contact`, or `Cookie Care` leads to completely blank white screens.
3. **Broken Policy Links:** Footer links to Shipping and Refund policies return 403 errors.
4. **Confusing Product Pricing Display:** Every single cookie product page displays "From $24", making first-time visitors think one cookie costs $24!
5. **No Visual Box Builder Feedback:** The box builder is just a flat table with plain plus/minus counters and no visual box preview showing the cookies filling up the slots.
6. **Mobile Tap Target Warnings:** Critical interactive buttons are smaller than 32px height on mobile devices, causing high mis-tap rates.

### What is Completely Missing (Answers Needed)
1. **Pickup Location Transparency:** Where in Austin is pickup? (South Austin? Central? North?). Customers must know the general pickup area before spending 10 minutes building a box.
2. **Delivery Terms & Zip Codes:** Can Austin customers get delivery? What is the delivery radius and minimum order?
3. **Texas Shipping Rules:** Clear explanation that Cottage Food laws restrict shipping to Texas addresses only, with shipping timeline (ships Mondays).
4. **DM Answer Hub / "Start Here" Page:** A dedicated, beautiful answers hub mirroring the owner's Instagram "Start Here" highlight to cut DM volume by 80%.
5. **Owner Operations Dashboard:** Zero visibility on pre-order window capacity, fulfillment breakdown (pickup vs delivery vs shipping), or Instagram comment conversion.

---

## 9. Top 5 Biggest Problems the Remaster Must Solve

1. **Eliminate the "Single Cookie = $24" Confusion:** Clarify that cookies are sold in customizable 4, 6, or 10-packs, while individual flavors are showcased with transparent pricing.
2. **Fix the Missing Information Black Hole:** Replace the blank FAQ, Contact, and Policies with an authoritative, comforting **"Start Here"** answers hub that handles pickup location, delivery zones, Texas-only shipping, allergen warnings, and storage/reheating guide.
3. **Elevate Visual Appetizing Appeal:** Replace aggressive flat colors and harsh dashed boxes with a luxurious, warm editorial aesthetic (deep burgundy, butter yellow, soft cream, refined serif headings, generous whitespace, tactile cookie visuals, and fresh hand-drawn SVGs).
4. **Frictionless Interactive Box Builder & Drop Window Flow:** An intuitive, visual box builder where customers see their 4, 6, or 10 slots fill up in real time, choose fulfillment (Austin Pickup, Austin Delivery, TX Shipping), and select their date with clear cutoff indicators.
5. **Add an Owner Command Dashboard:** Give the baker an intuitive operational dashboard tracking drop capacity, pickup schedules, fulfillment mix, top cookie popularity, and Instagram "DROP" comment-to-order conversions.

---

## 10. Verification & Fact-Checking Table

| Item | Fact / Finding | Verification Status | Source |
|---|---|---|---|
| Business Name | Tatti \| Gourmet Cookies & Bakes | Verified | IG Bio & tatticookies.com |
| Location | Austin, Texas | Verified | IG Bio & Texas Cottage Food Disclaimer |
| Primary Colors | Crimson/Burgundy (`#990232`), Cream (`#FEF3E5`), Butter Yellow (`#FFF5C7`) | Verified | Live CSS `:root` variables |
| Active Menu Flavors | 8 flavors (Pecan Dulce, Biscoff Cream, Pistachio White, Red Velvet Nutella Smores, Kinder Hazelnut, Ferrero Hazelnut, Chocolate Chunk, Dubai Pistachio) | Verified | Live `products.json` catalog |
| Additional Flavors | Brown Butter Banana Bread | Verified | Instagram Post & Reel |
| Box Sizes & Real Prices | 4 ($24), 6 ($36), 10 ($58) | Verified (Internal) | Live `products.json` / Will use labeled demo prices |
| Drop Window | Monday 12:00 PM CST to Friday 12:00 PM CST | Verified | `theme.js` schedule code & Homepage banner |
| Pickup Window | Saturday 11:00 AM – 2:00 PM CST | Verified | Site banner & IG post captions |
| Exact Austin Pickup Address | Specific Austin neighborhood / street | **Unverified** | Address not published publicly prior to order |
| Exact Delivery Radius & Fee | Austin metro radius and delivery fee | **Unverified** | Handled via DM / checkout only |
| Shipping Limits | Texas addresses only, ships Mondays | Verified | Texas Cottage Food Law & site disclaimer |
| Custom / Catering Orders | Large corporate or wedding catering | **Unverified** | Not listed on site; strictly cottage capacity |
