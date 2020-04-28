import { h } from "preact";
// import { AuthContext } from "../context/authContext";
// import { Link } from "wouter/preact";
import Loader from "./loader";
import "../scss/card.scss";
import { useQuery } from "graphql-hooks";

const FRIENDS_QUERY = `
query {
  friends {
    personsFriend {
      username
    }
  }
}
`;

export default function FriendsList() {
  const { loading, error, data } = useQuery(FRIENDS_QUERY);
  if (loading) return <div><Loader /></div>;
  if (error) return "Darn!";
  return <div>{JSON.stringify(data)}</div>;
}
