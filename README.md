# Niobi Software Developer Intern – Challenge 2: Treasury Movement Simulator

## **Scope**
Built a comprehensive multi-currency treasury management application simulating real-world fund movements across 10 virtual accounts in KES, USD, and NGN currencies. The system features professional-grade navigation, analytics dashboard, transfer management, and complete audit trails - designed to replicate actual treasury operations used by African fintech businesses.

## **Features Included**

### **Core Treasury Functions**
- **10 Virtual Accounts**: Pre-configured accounts (Mpesa_KES_1, Bank_USD_3, GTBank_NGN_1, etc.) with real-time balance tracking
- **Multi-Currency Transfers**: Complete transfer interface with from/to account selection, amount input, and optional notes
- **FX Conversion Engine**: Static exchange rates with automatic currency conversion and real-time rate display
- **Balance Validation**: Prevents overdrafts by checking sufficient source funds before execution
- **Transaction Audit Trail**: Complete logging system with timestamps, amounts, FX rates, and transaction status

### **Professional Enhancements**
- **Analytics Dashboard**: Currency summary cards showing total balances per currency with visual indicators
- **Sidebar Navigation**: Professional layout with dedicated sections (Dashboard, Accounts, Transfers, Settings)
- **Advanced Filtering**: Filter transaction logs by account name or currency type
- **Future-Dated Transfers**: UI support for scheduled transfers with "Scheduled" status tracking
- **User Preferences**: Dark/light mode toggle for professional user experience
- **Real-Time FX Display**: Shows conversion calculations during transfer setup process

### **Technical Implementation**
- **Responsive Design**: Mobile-first approach using Tailwind CSS with clean, modern interface
- **React Architecture**: Functional components with hooks, optimized state management, and efficient re-rendering
- **Form Validation**: Client-side validation with user-friendly error messages and real-time feedback
- **Professional UI/UX**: Lucide React icons, smooth transitions, and enterprise-grade visual design

## **Assumptions Made**

### **Exchange Rates**
- **Static FX Rates**: Fixed conversion rates (1 USD = 149.25 KES, 1 USD = 1670 NGN, 1 KES = 11.2 NGN)
- **No Spreads**: Direct multiplication without banking fees or currency margins
- **Bi-directional**: Supports conversions in both currency directions

### **Technical Architecture**  
- **In-Memory Storage**: All account balances and transactions stored in React state (no backend database)
- **Float Precision**: Monetary values stored as floating-point numbers with standard JavaScript precision
- **Immediate Processing**: Non-future-dated transfers execute instantly upon submission

### **Business Logic**
- **Account Naming**: Follows Provider_Currency_Number convention for realistic account identification
- **No Transaction Limits**: Unlimited transfer amounts and frequency (beyond balance validation)
- **Manual Future Processing**: Scheduled transfers marked as "Scheduled" but require manual execution
- **Same-Session Persistence**: Data persists only during browser session

## **Improvements with More Time**

### **Backend Infrastructure**
- **Persistent Database**: MongoDB/PostgreSQL for permanent transaction history and account state storage
- **Real-Time FX APIs**: Integration with live forex data providers (ForexRatesAPI, CurrencyLayer) for dynamic rates
- **Scheduled Processing**: Automated cron jobs or task queues to execute future-dated transfers
- **Authentication System**: User management with role-based permissions and multi-tenant support

### **Advanced Analytics**
- **Interactive Charts**: Time-series charts showing balance trends, transaction volumes, and currency exposure over time
- **Reporting Dashboard**: Export functionality for PDF/Excel reports with custom date ranges and filters  
- **Cash Flow Forecasting**: Predictive analytics based on historical transaction patterns
- **Risk Management**: Alerts for large transactions, unusual patterns, or currency exposure limits

### **Enterprise Features**
- **Approval Workflows**: Multi-level approval process for transactions above defined thresholds
- **Bulk Operations**: CSV upload functionality for processing multiple transfers simultaneously  
- **API Integration**: RESTful APIs for integration with external banking systems and ERP platforms
- **Audit Compliance**: Immutable transaction logs with cryptographic signatures for regulatory compliance

### **Performance & Security**
- **Rate Limiting**: API throttling and request limiting to prevent system abuse
- **Transaction Locks**: Database-level locking to prevent race conditions in concurrent operations
- **End-to-End Encryption**: Secure data transmission and storage for sensitive financial information
- **Real-Time Monitoring**: System alerts for performance issues, failed transactions, and security events

---

**Live Application**: [Insert your bolt.new/v0.dev/Lovable public link here]  
**Technology Stack**: React 18, Tailwind CSS, Lucide React Icons  
**Deployment Ready**: Compatible with Vercel, Netlify, or any modern React hosting platform