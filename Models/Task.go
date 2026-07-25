package models

import "time"

type Task struct{
	ID uint `gorm:"primaryKey" json:"id"`
	Name string `gorm:"not null" json:"name"`
	Description string `json:"description"`
	CreatedAt time.Time `json:"created_at"`
	Done bool `gorm:"default:false" json:"done"`
}