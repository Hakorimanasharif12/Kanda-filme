# Kanda Filme - Movie Management System

## 🚀 Quick Start Guide

### System Requirements
- **Operating System**: Windows 10/11 or macOS
- **Web Server**: XAMPP, WAMP, or MAMP
- **PHP**: Version 7.4 or higher
- **MySQL**: Version 5.7 or higher
- **Web Browser**: Chrome, Firefox, or Edge (Latest Version)

### 📦 Detailed Installation Guide

#### Step 1: Install Web Server
1. Download XAMPP from [Apache Friends](https://www.apachefriends.org/)
2. Run the installer
3. Select components:
   - Apache
   - MySQL
   - PHP
   - phpMyAdmin
4. Complete the installation
5. Launch XAMPP Control Panel
6. Start Apache and MySQL services

#### Step 2: Project Setup
1. Navigate to XAMPP installation directory
2. Open `htdocs` folder
3. Create a new folder: `kanda_filme`
4. Copy all project files into this folder

#### Step 3: Database Configuration
1. Open XAMPP Control Panel
2. Click "Admin" next to MySQL to open phpMyAdmin
3. Create a new database:
   ```sql
   CREATE DATABASE kanda_filme;
   ```
4. Select the `kanda_filme` database
5. Import `database.sql`:
   - Click "Import" tab
   - Choose `database.sql` file
   - Click "Go"

#### Step 4: PHP Configuration
Edit `config/database.php`:
```php
private $host = "localhost";
private $db_name = "kanda_filme";
private $username = "root";     // Default XAMPP MySQL username
private $password = "";         // Default XAMPP MySQL password (empty)
```

#### Step 5: File Permissions
1. Create upload directories:
   ```
   kanda_filme/uploads/
   ├── posters/
   └── videos/
   ```
2. Set write permissions:
   - Right-click folder
   - Properties → Security
   - Edit permissions to allow writing

### 🔐 Admin Access
- **URL**: `http://localhost/kanda_filme/admin-login.php`
- **Username**: `admin`
- **Password**: `12345`

### 🛠 Troubleshooting

#### Common Issues
1. **Database Connection Failed**
   - Verify MySQL is running
   - Check username and password
   - Ensure `mysqli` or `PDO` extensions are enabled in `php.ini`

2. **File Upload Not Working**
   - Check `uploads/` directory permissions
   - Verify `php.ini` settings:
     ```
     file_uploads = On
     upload_max_filesize = 50M
     post_max_size = 50M
     ```

3. **PHP Errors**
   - Enable error reporting in `php.ini`:
     ```
     error_reporting = E_ALL
     display_errors = On
     ```

### 🔧 Advanced Configuration

#### Security Enhancements
1. Change default admin password
2. Implement two-factor authentication
3. Use prepared statements (already implemented)
4. Limit file upload sizes and types

#### Performance Optimization
1. Enable PHP OPcache
2. Use database indexing
3. Implement caching mechanisms

### 📋 Project Structure
```
kanda_filme/
├── api/
│   └── movies/
│       ├── upload.php
│       └── read_one.php
├── config/
│   └── database.php
├── uploads/
│   ├── posters/
│   └── videos/
├── admin-login.php
├── admin-dashboard-initial.html
└── database.sql
```

### 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create pull request

### 📜 License
[Specify your project's license]

### 📞 Support
For issues, please open a GitHub issue or contact [your contact information]

## 💡 Future Roadmap
- [ ] Implement user roles
- [ ] Add movie recommendation system
- [ ] Create API documentation
- [ ] Develop mobile-responsive design

---

## 🔬 Development Environment Setup

### 💻 Local Development Tools
- **IDE**: Visual Studio Code, PhpStorm, or Sublime Text
- **Version Control**: Git
- **Browser Extensions**: 
  - React DevTools
  - Redux DevTools
  - PHP Debug Extension

### 🛠 Development Environment Configuration

#### PHP Configuration
Create a `php.development.ini` with these settings:
```ini
; Development PHP Configuration
error_reporting = E_ALL
display_errors = On
display_startup_errors = On
log_errors = On
error_log = /path/to/php-error.log

; File Upload Settings
file_uploads = On
upload_max_filesize = 50M
post_max_size = 50M

; Security Settings
expose_php = Off
allow_url_fopen = Off

; Performance
max_execution_time = 300
memory_limit = 256M
```

#### Database Development Workflow
1. Use database migrations
2. Implement seed data for testing
3. Use transactions for complex operations

### 🔐 API Endpoints Documentation

#### Movie Management API

##### 1. Upload Movie
- **Endpoint**: `/api/movies/upload.php`
- **Method**: POST
- **Authentication**: Admin Session Required

**Request Parameters**:
```json
{
  "title_en": "string",
  "title_local": "string (optional)",
  "description_en": "string",
  "description_local": "string (optional)",
  "category": "string",
  "release_year": "integer",
  "duration": "integer",
  "is_featured": "boolean",
  "poster": "file",
  "video": "file"
}
```

**Response**:
- `201`: Movie uploaded successfully
- `403`: Unauthorized
- `500`: Server error

##### 2. Fetch Movies
- **Endpoint**: `/api/movies/read.php`
- **Method**: GET
- **Query Parameters**:
  - `page`: Pagination
  - `category`: Filter by category
  - `featured`: Boolean to fetch featured movies

### 🚀 Deployment Checklist

#### Pre-Deployment
- [ ] Run all unit tests
- [ ] Check code coverage
- [ ] Perform security audit
- [ ] Minify frontend assets

#### Deployment Steps
1. Git repository cleanup
2. Remove development configurations
3. Set production PHP settings
4. Configure production database
5. Set up SSL certificate
6. Configure server-level caching

### 🔍 Monitoring & Logging

#### Error Tracking
- Implement Sentry or Rollbar for error tracking
- Configure centralized logging
- Set up email alerts for critical errors

#### Performance Monitoring
- Use New Relic or Datadog
- Monitor:
  - Database query performance
  - Server response times
  - Memory usage
  - API endpoint latency

### 🧪 Testing Strategy

#### Unit Testing
- Use PHPUnit for backend testing
- Test each API endpoint
- Validate input sanitization
- Check database interactions

#### Integration Testing
- Test complete user flows
- Verify admin dashboard functionality
- Check file upload mechanisms

#### Security Testing
- OWASP ZAP for vulnerability scanning
- SQL injection tests
- Cross-site scripting (XSS) prevention
- Authentication bypass attempts

### 📊 Scalability Considerations

#### Database Optimization
- Implement database indexing
- Use query caching
- Consider read replicas for high traffic

#### Caching Strategies
- Implement Redis or Memcached
- Cache frequently accessed movie lists
- Use CDN for static assets

### 🌐 Internationalization (i18n)

#### Multilingual Support
- Implement language switching
- Store translations in JSON
- Support RTL languages
- Use gettext for translations

### 💡 Advanced Features Roadmap
- [ ] Implement GraphQL API
- [ ] Add machine learning movie recommendations
- [ ] Develop mobile app companion
- [ ] Create admin analytics dashboard
- [ ] Implement user reviews system

### 🤝 Community & Support
- Star the project on GitHub
- Join our Discord community
- Report issues on GitHub
- Contribute via pull requests

---

**Happy Coding! 🎬🍿**
