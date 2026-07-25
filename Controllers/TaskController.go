package controllers

import (
	"net/http"

	models "github.com/AvalosRuben/ToDo/Models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateTask(db *gorm.DB)gin.HandlerFunc{

	return func(c *gin.Context){
		var newTask models.Task
		if err := c.BindJSON(&newTask); err != nil{
			c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
			return 
		}

		db.Create(&newTask)
		c.JSON(http.StatusCreated, gin.H{"message":"Task created successfully!"})
	}

}