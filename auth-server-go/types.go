package main 



import (
  "github.com/jinzhu/gorm"
  "github.com/satori/go.uuid"
)

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
  ID string `gorm:"id"`
  Username string `gorm:"username"`
  Password string `gorm:"password"`
  Displayname string `gorm:"displayname"`
}

func (base *User) BeforeCreate(scope *gorm.Scope) error {
  uuid := uuid.NewV4()
  return scope.SetColumn("ID",uuid.String())
}
