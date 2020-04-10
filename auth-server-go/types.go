package main 

import (
  "github.com/jinzhu/gorm")

  type HasuraClaims struct {
    Roles []string `json:"x-hasura-allowed-roles"`
    UserId uint `json:"x-hasura-user-id"`
    DefaultRole string `json:"x-hasura-default-role"`
    Role string `json:"x-hasura-role"`
  }

  type LoginDetails struct {
    Username string `json:"username"`
    Password string `json:"password"`
  }

  type SignupDetails struct {
    Username string `json:"username"`
    Password string `json:"password"`
    Displayname string `json:"displayname"`
  }

  type User struct {
    gorm.Model
    Username string `gorm:"username"`
    Password string `gorm:"password"`
    Displayname string `gorm:"displayname"`
    Id uint `gorm:"column:id; AUTO_INCREMENT;primary_key"`
  }
