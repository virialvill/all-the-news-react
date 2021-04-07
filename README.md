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

In the first session we created a [single page app](http://oit2.scps.nyu.edu/~devereld/intermediate/session1/) using vanilla js. In this class we will retrofit it to use React.

The [final result](http://oit2.scps.nyu.edu/~devereld/intermediate/all-the-news-react/) will behave a bit differently. Instead of scrolling to different sections, it will load new data when the user navigates.

`cd` into this repo, install the required modules using `$ npm install` and `$ npm start` the application.

Examine the application structure.

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

In App.js add our nav items from the vanilla JS version and send it, via props, to the Nav component:

<!-- <<<<< HUH??? >>>>> -->

Create a data folder in src and within create a file `navItems.js`:

```js
export const navItems = [
  {
    label: "arts",
    link: "#arts",
  },
  {
    label: "books",
    link: "#books",
  },
  {
    label: "fashion",
    link: "#fashion",
  },
  {
    label: "food",
    link: "#food",
  },
  {
    label: "movies",
    link: "#movies",
  },
  {
    label: "travel",
    link: "#travel",
  },
];
```

Note the lower case - this is not a React component.

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";

import { navItems } from "./data/navItems";

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

NOte: navItems is a named export.

Use the React developer tool to inspect the Nav component and ensure the navItems props exists.

Now we can build out the nav items using props:

```js
import React from "react";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem) => (
          <li>
            <a href={navItem.link}>{navItem.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Note the error: "Each child in a list should have a unique "key" prop."

```js
import React from "react";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem) => (
          <li key={navItem.label}>
            <a href={navItem.link}>{navItem.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
```

Note that when calling `.map` we are not using curly `{ ... }` but rounded braces `( ... )`. We are using an implicit return.

## Importing and Exporting

```js
export const navItems = [
  "arts",
  "books",
  "fashion",
  "food",
  "movies",
  "travel",
];
```

We are now using a simple array. Since the links and labels are almost identical we have simplified things a bit here.

Note that our app just broke because the data is not in the format expected by Nav.js.

Edit Nav.js:

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

### Named vs Default Exports

There are two ways of exporting in JavaScript: default and named.

```js
export const navItems = [
  "arts",
  "books",
  "fashion",
  "food",
  "movies",
  "travel",
];
```

`navItems` above is a named export and would be imported using `import { navItems } from './components/navItems';`

You will often see people using named imports when working with React components:

```js
import React, { useState } from 'react';
...
const [data, setData] = useState([])
...
```

Instead of:

```js
import React from 'react';
...
const [data, setData] = React.useState([])
...
```

## The Stories Component

Create the stories component with a single category to start.

`components/Stories.js`:

```js
import React from "react";

const Stories = (props) => {
  return (
    <div className="site-wrap">
      {props.stories ? (
        <pre>
          <code>{JSON.stringify(props.stories, null, 2)}</code>
        </pre>
      ) : (
        "Stories"
      )}
    </div>
  );
};

export default Stories;
```

Note the ternary expression - if `props.stories` exists then output the [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), otherwise output the string Stories.

And import / compose it in App.js:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";
import { navItems } from "./data/navItems";

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

We could proceed to add the fetching capability in this component as follows:

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

## UseState

<!-- React’s ES6 class components have [lifecycle methods](https://reactjs.org/docs/react-component.html). When the `componentDidMount()` method runs, the component will have already been rendered once with the render() method, but it will render again when the fetched data is stored in the local state of the component with `setState()`. `setState()` always forces React to re-render just those portions of the DOM which need updating.

But locating this in the stories component will eventually lead to issues. When we hook up our navbar it will need to access a fetching mechanism in order to bring the new content into the app. THerefore it is a better idea to keep this functionality at the top level of our application. -->

## State in App

We want to store data in App.js.

We begin by creating state in App.js:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";
import { navItems } from "./data/navItems";

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

We instantiate stories as an empty array and a bit of state to track whether the data is loading.

Now we use the `useEffect` to fetch the data and then we pass it to the Stories component as a prop.

App.js:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";
import { navItems } from "./data/navItems";

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

## The Story Component

Rather than rendering everything in the stories component we pass that duty off to a component called Story (singluar).

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

Note: this div takes a class of entry so we can use the CSS from the non-react version of this project.

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

Now, in Story.js, begin building out the content following the structure of the html in the non React version of this project.\

First the images:

```js
import React from "react";

const Story = (props) => {
  return (
    <div className="entry">
      <img
        src={
          props.story.multimedia
            ? props.story.multimedia[0].url
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
            ? props.story.multimedia[0].url
            : "/img/no-image.png"
        }
        alt="images"
      />
      <div>
        <h3>
          <a href={props.story.short_url} alt={props.story.title}>
            {props.story.title}
          </a>
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

In App.js, restructure the lifecycle to separate out the fetch action into its own function:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";
import { navItems } from "./data/navItems";

const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";
const section = "arts";

function App() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`
    )
      .then((response) => response.json())
      .then((data) => setStories(data.results));
  };

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

Let's switch the isLoading piece of state to true while the fetch operation is under way and set it to false once the operation has completed.

Set isLoading to false by default in the initial declaration:

```js
const [loading, setLoading] = React.useState(false);
```

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";
import { navItems } from "./data/navItems";

const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";
const section = "arts";

function App() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    setLoading(true);
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`
    )
      .then((response) => response.json())
      .then((data) => setStories(data.results))
      .then(setLoading(true));
  };

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

We can now use this piece of state in the return as follows:

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";
import { navItems } from "./data/navItems";

const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";
const section = "arts";

function App() {
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    setLoading(true);
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`
    )
      .then((response) => response.json())
      .then((data) => setStories(data.results))
      .then(setLoading(true));
  };

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
      <Nav navItems={navItems} />

      {loading || stories.length === 0 ? (
        "Loading..."
      ) : (
        <Stories stories={stories} />
      )}

      {/* <Stories stories={stories} /> */}
    </>
  );
}

export default App;
```

We can also see the effect by slowing down the loading in the Network tab of the developer tools.

```js
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Stories from "./Stories";
import { navItems } from "./data/navItems";

const nytapi = "IBOst14SeT5OXhGNk8ZQOPhVBhj9ED0h";
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
      .then(setLoading(false));
  }, [section]);

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
```

Pass setSection into the Nav in App.js:

```js
<Nav navItems={navItems} setSection={setSection} />
```

Create NavItem.js

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

The click event now communicates with the setSection function in App.js.

Test it in the browser.

## Fixed Nav

In the original project the navbar became fixed to the top of the screen when the header was scrolled off.

```css
nav {
  background: #007eb6;
  width: 100%;
  transition: all 0.5s;
  position: sticky;
  top: 0;
}
```

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

## Header

App.js:

```js
<Stories stories={stories} section={section} />
```

Storeis.js:

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

It would be nice to have a visual indicator of which section we are viewing. Let's add a highlight to the appropriate nav item for this purpose.

We can use the section variable to set the activeLink property:

```js
<Nav navItems={navItems} setSection={setSection} section={section} />
```

And then send the property to the NavItem component:

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

Since we didn't have this feature in the original project we need to add/edit a bit of css in the public folder:

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

## Instructor Notes
