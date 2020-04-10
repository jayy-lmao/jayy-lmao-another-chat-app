package main

import (
  "io"
  "io/ioutil"
  "fmt"
  "log"
  "net/http"
  "encoding/json"
  "time"
  "github.com/dgrijalva/jwt-go"
)

type HasuraClaims struct {
  Roles string `json:"x-hasura-allowed-roles"`
  UserId int `json:"x-hasura-user-id"`
  DefaultRole string `json:"x-hasura-default-role"`
  Role string `json:"x-hasura-role"`
}

type LoginDetails struct {
  Username string `json:"username"`
  Password string `json:"password"`
}

const (
  APP_KEY = "auth"
)

func main(){
  http.HandleFunc("/login", LoginHandler)
  if err:= http.ListenAndServe(":8080",nil);err!= nil {
    log.Fatal(err)
  }
}

func LoginHandler(w http.ResponseWriter, r *http.Request){
  var loginDetails LoginDetails
  w.Header().Add("Content-Type", "application/json")

  reqBody, err := ioutil.ReadAll(r.Body)

  if err != nil {
    fmt.Fprintf(w, "Please enter a username and password")
  }
  json.Unmarshal(reqBody, &loginDetails)

  userId := 5;




  // Where we should do the database lookup
  if loginDetails.Username != "myusername" || loginDetails.Password != "mypassword" {
    w.WriteHeader(http.StatusUnauthorized)
    io.WriteString(w, `{"error" : "invalid_credentials"}`)
    return
  }

  hasuraClaims := &HasuraClaims{
    Role: "user",
    UserId: userId,
    DefaultRole: "user",
    Roles: `["mine","user"]`,
  }

  token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "user": loginDetails.Username,
    "exp": time.Now().Add(time.Hour * time.Duration(1)).Unix(),
    "iat": time.Now().Unix(),
    "https://hasura.io/jwt/claims": hasuraClaims,
  })

  tokenString, err := token.SignedString([]byte(APP_KEY))

  if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    io.WriteString(w, `{"error":"token_gen_failed"}`)
    return
  }
  io.WriteString(w,`{"token":"`+tokenString+`"}`)
  return
}
