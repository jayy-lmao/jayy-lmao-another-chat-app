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

func SignupHandler(w http.ResponseWriter, r *http.Request){
  log.Printf("%s %s %s\n", r.RemoteAddr, r.Method, r.URL)

  JWT_SECRET := os.Getenv("JWT_SECRET")

  var signupDetails SignupDetails

  w.Header().Add("Content-Type", "application/json")
  reqBody, err := ioutil.ReadAll(r.Body)

  if err != nil {
    fmt.Fprintf(w, "Please enter a username and password")
  }

  json.Unmarshal(reqBody, &signupDetails)

  user := UserInput{
    Username: signupDetails.Username,
    Password: signupDetails.Password,
    Displayname: signupDetails.Displayname,
  }

  unique := db.NewRecord(user)
  if !unique {
    w.WriteHeader(http.StatusBadRequest)
    io.WriteString(w, `{"error" : "user_exists"}`)
    return
  }
  db.Create(&user)

  var createdUser User;

  db.First(&createdUser, "username = ?", user.Username)

  log.Printf("Created user %d\n", createdUser.Id);


  hasuraClaims := &HasuraClaims{
    Role: "user",
    UserId: createdUser.Id,
    DefaultRole: "user",
    Roles: `["mine","user"]`,
  }

  token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "user": signupDetails.Username,
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
