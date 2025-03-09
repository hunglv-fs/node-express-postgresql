# Multilingual Product Management API with Express and PostgreSQL

This Express.js application provides a RESTful API for product management with built-in internationalization support for Vietnamese and English languages. It features robust input validation, PostgreSQL data persistence, and a clean architecture that separates concerns across controllers, models, and routes.

The API enables businesses to manage their product catalog through simple HTTP endpoints while providing localized validation messages. It implements a scalable architecture with clear separation between data access, business logic, and HTTP handling layers. The internationalization support makes it particularly suitable for applications serving multiple language markets.

## Repository Structure
```
.
├── config/                     # Application configuration files
│   ├── config.js              # Language configuration settings
│   └── db.js                  # PostgreSQL database connection setup
├── controllers/               
│   └── productController.js   # Product-related request handlers
├── locales/                   # Internationalization resources
│   ├── en.json               # English translations
│   └── vi.json               # Vietnamese translations
├── middleware/
│   └── loggerMiddleware.js   # Request and error logging middleware
├── models/
│   └── productModel.js       # Product database operations
├── routes/
│   └── productRoutes.js      # API route definitions
├── utils/
│   ├── i18n.js              # Internationalization utility functions
│   └── logger.js            # Logging configuration and setup
├── validations/
│   └── productValidation.js  # Product input validation rules
└── server.js                 # Application entry point
```

## Usage Instructions
### Prerequisites
- Node.js (v12 or higher)
- PostgreSQL database server
- Environment variables configured in a `.env` file:
  ```
  DB_USER=your_db_user
  DB_HOST=your_db_host
  DB_NAME=your_db_name
  DB_PASSWORD=your_db_password
  DB_PORT=your_db_port
  PORT=5000
  ```

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start the server
npm start
```

### Quick Start
1. Create a new product:
```javascript
// POST /api/products
fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Product Name",
    price: 99.99
  })
});
```

2. Retrieve all products:
```javascript
// GET /api/products
fetch('http://localhost:5000/api/products')
  .then(response => response.json())
  .then(products => console.log(products));
```

### More Detailed Examples
1. Creating a product with validation errors:
```javascript
// POST /api/products with invalid data
const response = await fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Ab",  // Too short, minimum 3 characters
    price: -10   // Invalid negative price
  })
});

// Response will include localized validation errors
```

2. Creating a product with language-specific validation:
```javascript
// POST /api/products with language preference
const response = await fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en'  // For English validation messages
  },
  body: JSON.stringify({
    name: "Product Name",
    price: 99.99
  })
});
```

### Troubleshooting
1. Database Connection Issues
- Problem: Server fails to start with database connection error
- Solution:
  ```bash
  # Check database connectivity
  pg_isready -h ${DB_HOST} -p ${DB_PORT}
  
  # Verify environment variables
  echo $DB_USER $DB_HOST $DB_NAME
  ```

2. Validation Error Messages Not Displaying Correctly
- Problem: Validation messages appear in wrong language
- Solution:
  - Verify supported languages in `config/config.js`
  - Check if language files exist in `locales` directory
  - Ensure correct language code is being passed

## Data Flow
The application follows a three-tier architecture where HTTP requests flow through routes to controllers, which use models for data access and validation for input checking.

```ascii
Client Request → Routes → Controller → Validation → Model → Database
     ↑                                    ↓
     └────────────── Response ───────────┘
```

Component interactions:
1. Routes (`productRoutes.js`) direct HTTP requests to appropriate controller methods
2. Controllers (`productController.js`) handle request/response logic and orchestrate operations
3. Validation (`productValidation.js`) checks input data against schema rules with i18n support
4. Models (`productModel.js`) handle database operations through the PostgreSQL client
5. Internationalization (`i18n.js`) provides localized messages based on language configuration
6. Database client (`db.js`) maintains persistent connection to PostgreSQL
7. Configuration (`config.js`) provides application-wide settings for supported languages