package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Question struct {
	gorm.Model
	Question       string         `gorm:"size:500;not null"`
	Difficulty     string         `gorm:"size:50;not null"`
	Subject        string         `gorm:"size:100;not null"`
	Marks          float64        `gorm:"not null"`
	NegativeMarks  float64        `gorm:"default:0"`
	QuestionType   string         `gorm:"size:50;not null"`
	Options        datatypes.JSON `gorm:"type:json"`
	CorrectAnswers datatypes.JSON `gorm:"type:json"`
	Explanation    string         `gorm:"type:text"`
	Solved         bool           `gorm:"not null"`
	ImagePath      *string        `gorm:"type:text;default:null"`
}
