package main

import (
	"fmt"
	"log"
	"os"

	models "github.com/AvalosRuben/ToDo/Models"
	"github.com/AvalosRuben/ToDo/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	host, port :=  "localhost", 5432

	dbInfo := fmt.Sprintf("host=%s port=%d user=%s "+
    "password=%s dbname=%s sslmode=disable",
    host, port, user, password, dbName)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},   
	}))

	r.GET("/", func(c *gin.Context){
		c.JSON(200, gin.H{"message":"Welcome to the ToDo API!"})
	})

	db, err := gorm.Open(postgres.Open(dbInfo), &gorm.Config{})
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("failed to get sql.DB:", err)
	}
	if err := sqlDB.Ping(); err != nil {
		log.Fatal("failed to ping db:", err)
	}

	fmt.Println("Database connected :p")
	routes.SetupRoutes(r, db)

	db.AutoMigrate(&models.Task{})

	r.Run()
}