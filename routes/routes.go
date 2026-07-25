package routes

import (
	controllers "github.com/AvalosRuben/ToDo/Controllers"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(router *gin.Engine, db *gorm.DB){
	router.POST("/create-task", controllers.CreateTask(db))
}