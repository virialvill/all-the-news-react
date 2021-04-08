import React from "react";
import Header from "./header";
import Nav from "./nav";
import Stories from "./stories";
import Loader from "./loader";

import "./app.css";
import { getExpirationDate, getCookie } from "../utils/utils";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];
const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";

const cookieVal = getCookie("section");

function App() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [section, setSection] = React.useState(cookieVal || "arts");

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`
    )
      .then((response) => response.json())
      .then((data) => setStories(data.results))
      .then(setLoading(false))
      .catch((error) => {
        console.log(error);
      });
  }, [section]);

  React.useEffect(() => {
    document.cookie = `section=${section}; expires=${getExpirationDate(
      1000 * 60 * 60 * 24 * 7
    )}`;
  }, [section]);

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} setSection={setSection} section={section} />
      {loading || stories.length === 0 ? (
        <Loader />
      ) : (
        <Stories stories={stories} section={section} />
      )}
    </>
  );
}

export default App;
