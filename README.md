# Shape Designer API

An interactive REST API for creating, updating, retrieving, and deleting geometric shapes. Built with Spring Boot and designed for easy integration and extension.

## Table of Contents
1. Project Description
2. Setup Instructions
3. Environment Variables
4. API Documentation
5. Tech Stack
6. Contributing
7. License

## Project Description
Shape Designer API allows users to manage geometric shapes. Each shape has attributes like name, dimensions, and color. The API provides CRUD operations for shape management.

## Setup Instructions
### Prerequisites
- Java 21+
- Maven 4+
- Mysql
- Git

### Backend Setup
1. Clone the repository:
   git clone https://github.com/Thulasithasan/shape_designer_be
   cd shape-designer
2. Install dependencies:
   mvn clean install -DskipTests
   3Run the application:
   mvn spring-boot:run
   4Access API at http://localhost:8080/api/shapes

## API Documentation
Base URL: http://localhost:8080/api/shapes

### Endpoints
1. GET /api/shapes - Get all shapes
2. GET /api/shapes/{id} - Get shape by ID
3. POST /api/shapes - Create shape
4. PUT /api/shapes/{id} - Update shape
5. DELETE /api/shapes/{id} - Delete shape

## Tech Stack
- Java, Spring Boot, Spring Data JPA
- Mysql
- Maven
- Jackson
- Lombok

## Contributing
Fork → Branch → Commit → Push → Pull Request

## License
MIT License
EOL