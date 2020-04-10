package main 

import (
  "github.com/jinzhu/gorm")

  type HasuraClaims struct {
    Roles []string `json:"X-Hasura-Allowed-Roles"`
    UserId string `json:"X-Hasura-User-Id"`
    DefaultRole string `json:"X-Hasura-Default-Role"`
    Role string `json:"X-Hasura-Role"`
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
