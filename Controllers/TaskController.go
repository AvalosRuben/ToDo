package controllers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateTask(db *gorm.DB)gin.HandlerFunc{

	return func(c *gin.Context){
		fmt.Println("CREATE TASK!!!")
	}

}