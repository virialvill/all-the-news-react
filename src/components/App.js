import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];
const nytapi = "c2LaD4C3SEx9M57a3ZOnw814aKg7Pf6m";
// const section = "arts";

function App() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [section, setSection] = React.useState("arts");

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

    // if (loading){
    //   return <h2>Loading...</h2>;
    // }

    return (
      <>
        <Header siteTitle="All the News that Fits We Print" />
        <Nav navItems={navItems} setSection={setSection} />
        {loading || stories.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          <Stories stories={stories} />
        )}
      </>
    );
  }


export default App;
