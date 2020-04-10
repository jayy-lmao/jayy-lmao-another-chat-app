package main 

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
