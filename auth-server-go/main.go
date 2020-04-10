package main

import (
  "log"
  "net/http"
  "os"
)

func main(){
  port := os.Getenv("PORT")
  if port == "" {
    log.Fatal("$PORT must be set")}
    http.HandleFunc("/login", LoginHandler)
    if err:= http.ListenAndServe(":"+port,nil);err!= nil {
      log.Fatal(err)
    }
  }

