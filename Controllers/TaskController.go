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

func GetTasks(db *gorm.DB)gin.HandlerFunc{

	return func(c *gin.Context){
		var Tasks []models.Task
		result := db.Find(&Tasks)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Error retrieving Tasks": result.Error})
			return
		}
		c.JSON(http.StatusOK, Tasks)
	}

}

func ToggleDone(db *gorm.DB)gin.HandlerFunc{

	return func(c *gin.Context){
		id := c.Param("id")

		var task models.Task
		if err := db.First(&task, id).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error":"Task not found!"})
			return
		}

		task.Done = !task.Done

		if err := db.Save(&task).Error; err != nil{
			c.JSON(http.StatusInternalServerError, gin.H{"error":"Failed to update task"})
			return
		}

		c.JSON(http.StatusOK, task)
	}
}

func DeleteTask(db *gorm.DB)gin.HandlerFunc{
	return func(c *gin.Context){
		id := c.Param("id")
		var task models.Task
		if err := db.First(&task, id).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error":"Task not found!"})
			return
		}

		if err := db.Delete(&task).Error; err != nil{
			c.JSON(http.StatusInternalServerError, gin.H{"error":"Failed to delete task"})
			return 
		}

		c.JSON(http.StatusOK, "Task deleted succesfully!")
	}
}