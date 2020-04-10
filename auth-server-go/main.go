package main

import (
  "log"
  "net/http"
  "os"
  	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func init(){
  db_uri := os.Getenv("DB_URI")
  conn, err := gorm.Open("postgres", db_uri)
  if err != nil {
    log.Fatal(err)
  }
  db = conn
}

func main(){
  port := os.Getenv("PORT")
  if port == "" {
    log.Fatal("$PORT must be set")}
    http.HandleFunc("/login", LoginHandler)
    http.HandleFunc("/signup", SignupHandler)
    if err:= http.ListenAndServe(":"+port,nil);err!= nil {
      log.Fatal(err)
    }
  }

