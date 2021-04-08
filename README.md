# All the News - React

## Reading

Read the React documentation for [Hooks](https://reactjs.org/docs/hooks-intro.html). Pay special attention to the [useState](https://reactjs.org/docs/hooks-state.html) and [useEffect](https://reactjs.org/docs/hooks-effect.html) hooks.

## Homework

Create a Loading component:

```js
import React from "react";

const Loading = () => {
  return (
    <div className="loading">
      <div />
    </div>
  );
};

export default Loading;
```

That takes this CSS:

```css
.loading {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading div {
  width: 90px;
  height: 90px;
  overflow: hidden;
  background: url("../img/spinner.svg") 50% 50% no-repeat;
  background-size: cover;
}
```

And displays this [SVG file](https://codepen.io/aurer/pen/jEGbA) while loading is occuring:

```svg
<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#007eb6" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#007eb6" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.5s"
      repeatCount="indefinite"/>
    </path>
  </svg>
```

## Exercise

In the first session we created a [single page app](https://react-pirates.netlify.app/) using vanilla js. In this class we will use React.

The [final result](https://react-all-the-news.netlify.app/) will behave a bit differently. Instead of scrolling to different sections, it will load new data when the user navigates.

`cd` into this repo, install the required npm modules using `$ npm install` and `$ npm start` the application.

Examine the application structure. To minimize the number of imports, the CSS and images are in the public folder.

## Create the Header Component

Begin by creating a simple functional component in the components folder:

`components/Header.js`

```js
import React from "react";

const Header = (props) => {
  return (
    <header>
      <h1>{props.siteTitle}</h1>
    </header>
  );
};

export default Header;
```

App.js:

```js
import React from "react";
import Header from "./Header";

function App() {
  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
    </>
  );
}

export default App;
```

## The Nav Component

Create Nav.js in the components folder:

```js
import React from "react";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li>Nav component</li>
      </ul>
    </nav>
  );
};

export default Nav;
```

Import into App.js and compose it:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";

function App() {
  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav />
    </>
  );
}

export default App;
```

In App.js add our nav items:

```js
const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];
```

And send them, via props, to the Nav component:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];

function App() {
  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
    </>
  );
}

export default App;
```

Use the React developer tool to inspect the Nav component and ensure the navItems props exists.

Now we can build out the nav items using props:

```js
import React from "react";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem) => (
          <li key={navItem}>
            <a href={`#${navItem}`}>{navItem}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Note the use of a template string above to add the hash.

Note that when calling `.map` we are not using curly `{ ... }` but rounded braces `( ... )`. We are using an implicit return.

## The Stories Component

Create a Stories component:.

```js
import React from "react";

const Stories = (props) => {
  return (
    <div className="site-wrap">
      <pre>
        <code>{JSON.stringify(props.stories, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Stories;
```

`JSON.stringify(props.stories, null, 2)` will take our stories data and display it. We've added `<pre>` and `<code>` tags to make it readable. This is a very common technique used when you prefer to examine the data in the UI instead of the console.

And import / compose it in App.js:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];

function App() {
  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      <Stories />
    </>
  );
}

export default App;
```

## Demo: State

We could add the fetching capability in the Stories component as follows:

```js
import React from "react";

const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";

const Stories = () => {
  const [stories, setStories] = React.useState([]);

  React.useState(() => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${nytapi}`
    )
      .then((response) => response.json())
      .then((data) => setStories({ stories: data }));
  });

  return (
    <div className="site-wrap">
      <pre>
        <code>{JSON.stringify(stories, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Stories;
```

But recall from the previous sessions, it is usually better to locate your data at the highest level of the React tree.

<!-- END DEMO -->

## State in App

We want to store the stories data in App.js.

Let's begin by creating two pieces of state in App.js:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];

function App() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      <Stories />
    </>
  );
}

export default App;
```

We initialize stories as an empty array and add a bit of state to track whether the data is loading.

Now we add variables for the api key and default section and use the `useEffect` hook to fetch the data and then we pass it to the Stories component as a prop. We also pass the stories state to the Stories component.

App.js:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];
const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";
const section = "arts";

function App() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`
    )
      .then((response) => response.json())
      .then((data) => setStories(data.results));
  }, []);

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      <Stories stories={stories} />
    </>
  );
}

export default App;
```

## useEffect

In computer science, a function or expression is said to have a side effect if it modifies some state outside its scope or has an observable interaction with its calling functions or the outside world besides returning a value. An effect is anything outside your application and includes things like cookies and fetching API data.

The useEffect Hook lets you perform side effects in function components. By using this Hook, you tell React that your component needs to do something after it renders. By default, it runs both after the first render and after every update but we'll be customizing it to run only when the section (arts,,, music etc.) changes. For now, we are only using one section - arts.

```js
React.useEffect(callbackFunction, []);
```

Note the empty array that is the second argument in useEffect. An empty array causes the effect to run once after the component renders and again when the component unmounts or just before it is removed. `[]` tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.

## The Story Component

Rather than rendering everything in the stories component we'll pass that duty off to a component called Story (singluar).

Create Story.js:

```js
import React from "react";

const Story = (props) => {
  return (
    <div className="entry">
      <p>Story component</p>
    </div>
  );
};

export default Story;
```

We will render multiple story components from Stories.js with a key set to the story's index.

Stories.js:

```js
import React from "react";
import Story from "./Story";

const Stories = (props) => {
  return (
    <div className="site-wrap">
      {props.stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
    </div>
  );
};

export default Stories;
```

Now, in Story.js, begin building out the content.

First the images:

```js
import React from "react";

const Story = (props) => {
  return (
    <div className="entry">
      <img
        src={
          props.story.multimedia
            ? props.story.multimedia[1].url
            : "/img/no-image.png"
        }
        alt="images"
      />
    </div>
  );
};

export default Story;
```

And then the content:

```js
import React from "react";

const Story = (props) => {
  return (
    <div className="entry">
      <img
        src={
          props.story.multimedia
            ? props.story.multimedia[1].url
            : "/img/no-image.png"
        }
        alt="images"
      />
      <div>
        <h3>
          <a href={props.story.short_url}>{props.story.title}</a>
        </h3>
        <p>{props.story.abstract}</p>
      </div>
    </div>
  );
};

export default Story;
```

## Multiple Sections

Currently our app only renders the arts section. We need to code the navbar tabs to communicate with App in order to call fetch for additional sections.

But first, it is important that we allow that data to be fetched before we try to render the rest of the application.

Let's switch the isLoading piece of state to true while the fetch operation is under way and set it to false once the operation has completed.

Set isLoading to false by default in the initial declaration, then set it to true before the fetch operation, and finally set it back to false afterwards.

We'll also add an if statment that shows "Loading" while the data is loading.

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];
const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";
const section = "arts";

function App() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`
    )
      .then((response) => response.json())
      .then((data) => setStories(data.results))
      .then(setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      <Stories stories={stories} />
    </>
  );
}

export default App;
```

If you leave the loading state as true after the fetch you should see the message.

We are currently hiding everything on load. Let's only hide the content area:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];
const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";
const section = "arts";

function App() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`
    )
      .then((response) => response.json())
      .then((data) => setStories(data.results))
      .then(setLoading(true));
  }, []);

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      {loading || stories.length === 0 ? (
        <h2>Loading...</h2>
      ) : (
        <Stories stories={stories} />
      )}
    </>
  );
}

export default App;
```

(We can also see the effect by slowing down the loading in the Network tab of the developer tools.)

Next we'll create a piece of state for the sections:

```js
const [section, setSection] = React.useState("arts");
```

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];
const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";

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
      .then(setLoading(false));
  }, []);

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />
      {loading || stories.length === 0 ? (
        <h2>Loading...</h2>
      ) : (
        <Stories stories={stories} />
      )}
    </>
  );
}

export default App;
```

Since clicking on the nav is what changes the section we'll pass `setSection` into the Nav in App.js:

```js
<Nav navItems={navItems} setSection={setSection} />
```

We'll use a new component in Nav to display each of the nav elements.

Create NavItem.js:

```js
import React from "react";

const NavItem = (props) => {
  return (
    <li>
      <a href={`#${props.navItem}`}>{props.navItem}</a>
    </li>
  );
};
export default NavItem;
```

Import it and compose it in Nav.js:

```js
import React from "react";
import NavItem from "./NavItem";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem, index) => (
          <NavItem key={index} navItem={navItem} />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Now we need to pass the setSection function to NavItem from Nav.js:

```js
import React from "react";
import NavItem from "./NavItem";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem, index) => (
          <NavItem
            key={index}
            navItem={navItem}
            setSection={props.setSection}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Once in NavItems we will create a local function `sendSection` and run it on an onClick event:

```js
import React from "react";

const NavItem = (props) => {
  const sendSection = (section) => {
    props.setSection(section);
  };

  return (
    <li>
      <a href={`#${props.navItem}`} onClick={() => sendSection(props.navItem)}>
        {props.navItem}
      </a>
    </li>
  );
};
export default NavItem;
```

The click event now communicates with the setSection function in App.js however our useState hook needs to run again when the section changes:

```js
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
```

Note we've added `section` to the previously empty array. The array allows you to determine when the effect will run. THe empty array caused the effect to run once after the component rendered. When we add a piece of state or a prop to the array the effect will run whenever that state or prop changes.

`.catch` has also been added at the end of the promise chain to log any errors that might occur.

Test it in the browser.

## Touch Ups

Add the logo list item to Nav.js:

```js
import React from "react";
import NavItem from "./NavItem";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li className="logo">
          <a href="#top">
            <img src="img/logo.svg" alt="logo" />
          </a>
        </li>
        {props.navItems.map((navItem, index) => (
          <NavItem
            key={index}
            navItem={navItem}
            setSection={props.setSection}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

We'll also add a header to the top of the article list.

In App.js:

```js
<Stories stories={stories} section={section} />
```

In Stories.js:

```js
import React from "react";
import Story from "./Story";

const Stories = (props) => {
  return (
    <div className="site-wrap">
      <h2 className="section-head">{props.section}</h2>
      {props.stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
    </div>
  );
};

export default Stories;
```

## Active State

Add a highlight to the current nav item to indicate the section we are viewing.

We can use the section state to set the activeLink property.

In App.js:

```js
<Nav navItems={navItems} setSection={setSection} section={section} />
```

And then forward the property to the NavItem component:

```js
import React from "react";
import NavItem from "./NavItem";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li className="logo">
          <a href="#top">
            <img src="img/logo.svg" alt="logo" />
          </a>
        </li>
        {props.navItems.map((navItem, index) => (
          <NavItem
            key={index}
            navItem={navItem}
            setSection={props.setSection}
            section={props.section}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Use the section in a ternary expression to set the class name:

```js
import React from "react";

const NavItem = (props) => {
  const sendSection = (section) => {
    props.setSection(section);
  };

  return (
    <li>
      <a
        className={props.navItem === props.section ? "active" : ""}
        href={`#${props.navItem}`}
        onClick={() => sendSection(props.navItem)}
      >
        {props.navItem}
      </a>
    </li>
  );
};
export default NavItem;
```

Note the supporting CSS for this in the public folder:

```css
nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

nav a {
  text-decoration: none;
  display: inline-block;
  color: white;
  text-transform: capitalize;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
}

nav a.active {
  box-shadow: inset 0 0 0 2px white;
  border-radius: 6px;
}

nav a:not(.active):hover {
  box-shadow: inset 0 0 0 2px white;
  border-radius: 6px;
  background-color: #00aeef;
}
```

## DEMO Cookies

Currently if a use refreshes the page the section is reset to default. We can store the current section in a cookie to prevent this.

```js
import React from "react";
import Header from "./header";
import Nav from "./nav";
import Stories from "./stories";
import Loader from "./loader";

import "./app.css";

const navItems = ["arts", "books", "fashion", "food", "movies", "travel"];
const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";

const getExpirationDate = (time) => {
  return new Date(+new Date() + time).toUTCString();
};

const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const cookieVal = getCookie("section");

if (cookieVal) {
  console.log("  ", cookieVal);
}

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
```

## URL Parameters

A better method might be to use the URL hashes in the browser's location. Cookies are set on the user's browser, but what would happen if our user copied the url from the browser and sent it to another person? (Answer: the default "arts" section would be displayed. Not good.)

First, [get the URL](https://gomakethings.com/getting-values-from-a-url-with-vanilla-js/) and convert the URL string into a URL object using the new URL() constructor.

```js
const url = new URL(window.location.href);
const hash = url.hash.slice(1);
```

Do this within a `useEffect` hook in App.js:

```js
React.useEffect(() => {
  const url = new URL(window.location.href);
  const hash = url.hash.slice(1);
  if (hash !== "undefined") {
    console.log(" hash ", hash);
    setSection(hash);
  } else {
    setSection("arts");
  }
}, []);
```

## Styled Components

Examine:

- the New York Times website in the dev tool's elements panel.
- the Sign Up button on [Good Reads](https://www.goodreads.com/).

We will use [Styled Components](https://styled-components.com/) to refactor our CSS.

`$ npm i styled-components`

We'll start on the lower level components and work our way up beginning with the Story component.

```js
import React from "react";
import styled from "styled-components";

const Entry = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr;
  grid-column-gap: 1rem;
  margin-bottom: 1rem;
  grid-area: "entry";
  border-bottom: 1px dotted #00000033;
  a {
    color: #007eb6;
    text-decoration: none;
  }
  h3 + p {
    margin-top: 0;
  }
  img {
  }
`;

const Story = (props) => {
  return (
    <Entry>
      <img
        src={
          props.story.multimedia
            ? props.story.multimedia[1].url
            : "/img/no-image.png"
        }
        alt="images"
      />
      <div>
        <h3>
          <a href={props.story.short_url}>{props.story.title}</a>
        </h3>
        <p>{props.story.abstract}</p>
      </div>
    </Entry>
  );
};

export default Story;
```

To make things interesting we are going to add a link around the entire component to make the whole entry clickable.

```js
import React from "react";
import styled from "styled-components";

const Wrapper = styled.a`
  text-decoration: none;
  border-bottom: 1px dotted #00000033;
`;

const Entry = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;
  margin-bottom: 1rem;
  grid-area: "entry";
`;

const StoryTitle = styled.h3`
  color: #007eb6;
  text-decoration: none;
`;

const StoryImg = styled.img`
  width: 100%;
`;

const StoryPara = styled.p`
  margin-top: 0;
  color: #111;
`;

const Story = (props) => {
  return (
    <Wrapper href={props.story.short_url}>
      <Entry>
        <StoryImg
          src={
            props.story.multimedia
              ? props.story.multimedia[2].url
              : "/img/no-image.png"
          }
          alt="images"
        />
        <div>
          <StoryTitle>{props.story.title}</StoryTitle>

          <StoryPara>{props.story.abstract}</StoryPara>
        </div>
      </Entry>
    </Wrapper>
  );
};

export default Story;
```

## Project Structure

Create a story directory in components and move Story.js into it.

Create a separate styles.js file in the directory and move the styled components into it:

```js
import styled from "styled-components";

export const Wrapper = styled.a`
  text-decoration: none;
  border-bottom: 1px dotted #00000033;
`;

export const Entry = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;
  margin-bottom: 1rem;
  grid-area: "entry";
`;

export const StoryTitle = styled.h3`
  color: #007eb6;
  text-decoration: none;
`;

export const StoryImg = styled.img`
  width: 100%;
`;

export const StoryPara = styled.p`
  margin-top: 0;
  color: #111;
`;
```

Import the named exports into the Story component and destructure the props:

```js
import React from "react";
import { Wrapper, Entry, StoryImg, StoryTitle, StoryPara } from "./styles";

const Story = ({ story: { short_url, multimedia, title, abstract } }) => {
  return (
    <Wrapper href={short_url}>
      <Entry>
        <StoryImg
          src={multimedia ? multimedia[2].url : "/img/no-image.png"}
          alt="images"
        />
        <div>
          <StoryTitle>{title}</StoryTitle>

          <StoryPara>{abstract}</StoryPara>
        </div>
      </Entry>
    </Wrapper>
  );
};

export default Story;
```

Rename Story.js to index.js and check the import statement in Stories.js:

```js
import Story from "./story";
```

Stories:

```js
import React from "react";
import Story from "../story";

import { Wrapper, PageHeader } from "./styles";

const Stories = ({ section, stories }) => {
  return (
    <Wrapper>
      <PageHeader>{section}</PageHeader>
      {stories.map((story, index) => (
        <Story key={index} story={story} />
      ))}
    </Wrapper>
  );
};

export default Stories;
```

styles.js:

```js
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 94vw;
  max-width: 960px;
  margin: 24px auto;
  background: white;
  padding: 1rem;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);

  display: grid;
  grid-template-columns: repeat(1fr 1fr);
  grid-template-rows: repeat(1fr 1fr);
  grid-gap: 1rem;
  grid-template-areas:
    "sectionhead sectionhead"
    "entry entry";
`;

export const PageHeader = styled.h2`
  font-family: Lobster;
  color: var(--blue);
  font-size: 2.5rem;
  text-transform: capitalize;
  padding-bottom: 0.25rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #007eb677;
  grid-area: sectionhead;
`;
```

For the remaining components see the `local` branch of this repo.

## Instructor Notes
