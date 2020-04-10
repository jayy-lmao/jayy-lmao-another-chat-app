package main

import (
  "encoding/json"
  "fmt"
  "github.com/dgrijalva/jwt-go"
  "io"
  "io/ioutil"
  "net/http"
  "time"
  "log"
  "os"
)

func LoginHandler(w http.ResponseWriter, r *http.Request){
  log.Printf("%s %s %s\n", r.RemoteAddr, r.Method, r.URL)

  JWT_SECRET := os.Getenv("JWT_SECRET")

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

  tokenString, err := token.SignedString([]byte(JWT_SECRET))

  if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    io.WriteString(w, `{"error":"token_gen_failed"}`)
    return
  }
  io.WriteString(w,`{"token":"`+tokenString+`"}`)
  return
}
