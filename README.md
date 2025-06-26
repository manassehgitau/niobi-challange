### Niobi Software Developer Intern – Challenge 2: Treasury Movement Simulator

#### Scope

This project is a simple but realistic simulation of a treasury management system. It allows users to move funds between 10 virtual accounts, each using one of three currencies: KES, USD, or NGN. The goal was to mimic what treasury teams do daily — tracking balances, handling transfers, converting currencies, and maintaining an accurate transaction history — all through a clean, user-friendly interface.

---

#### Features Implemented

##### Core Functionality

* **10 Predefined Accounts**
  Each account (like Mpesa\_KES\_1 or Bank\_USD\_3) has a starting balance, a specific currency, and a name that reflects how real-world accounts are labeled.

* **Transfers Between Accounts**
  Users can transfer money from one account to another, with checks to ensure the source account has enough funds. There's also an optional note field for context.

* **Currency Conversion**
  When transferring between different currencies, the app automatically applies a static exchange rate to handle the conversion.

* **Transaction Logging**
  Every successful transfer is recorded in a log, with all relevant details: from/to accounts, currency, amount, date, and any notes.

##### Additional Enhancements

* **Dashboard View**
  An overview screen shows total balances by currency and summary statistics, giving a snapshot of account activity.

* **Sidebar Navigation**
  The app includes a sidebar with links to different views: Dashboard, Accounts, Transfers, and Settings.

* **Filters for Logs**
  Users can filter the transaction history by account or currency to find specific transactions faster.

* **Scheduled Transfers (UI Only)**
  The form allows users to pick a future date, and transfers marked this way show up in the log as "Scheduled" — though they aren’t processed automatically.

* **Dark and Light Mode**
  Users can toggle between dark and light themes for better comfort and accessibility.

---

#### Assumptions

##### Exchange Rates

* The app uses fixed conversion rates:

  * 1 USD = 149.25 KES
  * 1 USD = 1670 NGN
  * 1 KES = 11.2 NGN
* No currency spread or fees are included.
* Conversions work both ways between any supported currencies.

##### Technical Choices

* All data (accounts and transactions) is stored in React state — no backend or database was used.
* Transfer logic executes instantly unless marked as "scheduled."
* Monetary values are handled using JavaScript numbers, which may not be fully precise at large scale.
* Data resets when the page reloads.

##### Business Logic

* Account names follow a consistent pattern: `Provider_Currency_ID`.
* No upper limit is enforced on transaction size — only the available balance matters.
* Future-dated transfers aren’t automatically triggered; they’re labeled but require manual handling.
* Data only lasts as long as the browser session.

---

#### What I Would Improve With More Time

##### Backend Functionality

* Add a real database (like PostgreSQL or MongoDB) to persist transactions and account balances.
* Connect to a live FX API for up-to-date conversion rates.
* Implement automatic processing for scheduled transfers using background jobs.
* Add user authentication and role-based permissions.

##### Advanced Insights

* Include interactive charts showing trends over time (e.g., balance history, currency movement).
* Let users export transaction reports to PDF or Excel.
* Add predictive tools to forecast future cash flow based on trends.
* Build a risk alert system for suspicious transactions

##### Enterprise Features

* Introduce approval flows for large or sensitive transfers.
* Allow bulk uploads of transfers via CSV.
* Build APIs to integrate with banks or ERP systems.
* Improve compliance by making the transaction log immutable and cryptographically secure.

##### Performance and Security

* Add rate limiting to prevent abuse.
* Use transaction locks to avoid issues with simultaneous transfers.
* Secure all data in transit and at rest.
* Monitor for real-time system issues and transaction errors.

---

- **Live Demo Link**: https://niobi-challange.vercel.app/ 
- **Built With**: React 19, Tailwind CSS v4
- **Ready to Deploy**: Works on  Vercel 

