package main

import (
  "log"
  "net/http"
)

const (
  APP_KEY = "auth"
)

func main(){
  http.HandleFunc("/login", LoginHandler)
  if err:= http.ListenAndServe(":8080",nil);err!= nil {
    log.Fatal(err)
  }
}

