package main

import (
  "log"
  "net/http"
)

func main(){
  http.HandleFunc("/login", LoginHandler)
  if err:= http.ListenAndServe(":8080",nil);err!= nil {
    log.Fatal(err)
  }
}

