# All the News - React

- [All the News - React](#All-the-News---React)
  - [Reading](#Reading)
  - [Homework](#Homework)
  - [Exercise](#Exercise)
  - [Create the Header Component](#Create-the-Header-Component)
  - [The Nav Component](#The-Nav-Component)
  - [Importing and Exporting](#Importing-and-Exporting)
    - [Named vs Default Exports](#Named-vs-Default-Exports)
  - [The Stories Component](#The-Stories-Component)
  - [Demo: State](#Demo-State)
  - [State in App](#State-in-App)
  - [The Story Component](#The-Story-Component)
  - [Multiple Sections](#Multiple-Sections)
  - [Fixed Nav](#Fixed-Nav)
  - [Active State](#Active-State)
  - [Notes](#Notes)

## Reading

R. Wieruch [How to Fetch Data in React](https://www.robinwieruch.de/react-fetching-data/)

## Homework

Create a Loading component:

```js
import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <h3 />
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

.loading h3 {
  width: 40px;
  height: 40px;
  overflow: hidden;
  background: url('../img/spinner.svg') 50% 50% no-repeat;
}
```

And displays this [SVG file](https://codepen.io/aurer/pen/jEGbA) while loading is occuring:

```svg
<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#ff6700" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#ff6700" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
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

The vanilla js version of this project is available [here](https://github.com/front-end-summer19/all-the-news-vanillajs).

`cd` into this repo, install the required modules using `$ npm install` and `$ npm start` the application.

Examine the application structure.

## Create the Header Component

Begin by creating a simple functional component in the components folder:

`components/Header.js`

```js
import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>Header Component</h1>
    </header>
  );
};

export default Header;
```

App.js:

```js
import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header siteTitle="All the News that Fits We Print" />
    </>
  );
}

export default App;
```

Use the prop in Header.js:

```js
import React from 'react';

const Header = (props) => {
  return (
    <header>
      <h1>{props.siteTitle}</h1>
    </header>
  );
};

export default Header;
```

## The Nav Component

Create Nav.js in the components folder:

```js
import React from 'react';

const Nav = props => {
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
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';

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

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  const navItems = [
    {
      label: 'arts',
      link: '#arts',
    },
    {
      label: 'books',
      link: '#books',
    },
    {
      label: 'fashion',
      link: '#fashion',
    },
    {
      label: 'food',
      link: '#food',
    },
    {
      label: 'movies',
      link: '#movies',
    },
    {
      label: 'travel',
      link: '#travel',
    },
  ];
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
import React from 'react';

const Nav = props => {
  return (
    <nav>
      <ul>
        {props.navItems.map(navItem => (
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
import React from 'react';

const Nav = props => {
  return (
    <nav>
      <ul>
        {props.navItems.map(navItem => (
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

Note that when calling `.map` we do not use curly `{ ... }` in the callback function but rounded braces `( ... )`.

## Importing and Exporting

Externalize the data.

Create `components/navItems.js` (note the lower case - this is not a React component).

```js
const navItems = ['arts', 'books', 'fashion', 'food', 'movies', 'travel'];

export default navItems;

```

We are now using a simple array. Since the links and labels are almost identical we have simplified things a bit here.

Remove the data from App.js and import the external file:

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import navItems from './components/navItems';

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

Note that our app just broke because the data is not in the format expected by Nav.js.

Edit Nav.js:

```js
import React from 'react';

const Nav = props => {
  return (
    <nav>
      <ul>
        {props.navItems.map(navItem => (
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

`export { navItems };` is a named export and would be imported using `import { navItems } from './components/navItems';`

You will often see people using named imports when creating React components:

```js
import React, { Component } from 'react';

class Stories extends Component {
  ...
}
```

Instead of:

```js
import React from 'react';

class Stories extends React.Component {
  ...
}
```

## The Stories Component

Create the stories component with a single category to start.

`components/Stories.js`:

```js
import React from 'react';

const Stories = props => {
  return (
    <div className="site-wrap">
      {props.stories ? (
        <pre>
          <code>{JSON.stringify(props.stories, null, 2)}</code>
        </pre>
      ) : (
        'Stories'
      )}
    </div>
  );
};

export default Stories;

```

Note the ternary expression - if `props.stories` exists then output the [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), otherwise output the string Stories.

And import / compose it in App.js:

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';
import navItems from './components/navItems';

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
import React from 'react';

class Stories extends React.Component {

  state = {
    stories: [],
  };

  componentWillMount() {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data }));
  }

  render() {
    return (
      <div className="site-wrap">
        <pre>
          <code>{JSON.stringify(this.state.stories.results, null, 2)}</code>
        </pre>
      </div>
    );
  }
}

export default Stories;

```

React’s ES6 class components have [lifecycle methods](https://reactjs.org/docs/react-component.html). When the `componentDidMount()` method runs, the component will have already been rendered once with the render() method, but it will render again when the fetched data is stored in the local state of the component with `setState()`. `setState()` always forces React to re-render just those portions of the DOM which need updating.

But locating this in the stories component will eventually lead to issues. When we hook up our navbar it will need to access a fetching mechanism in order to bring the new content into the app. THerefore it is a better idea to keep this functionality at the top level of our application.

## State in App

Since we want to store data in App.js we need to convert App.js to a class component.

App.js:

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';
import navItems from './components/navItems';

class App extends React.Component {
  render() {
    return (
      <>
        <Header siteTitle="All the News that Fits We Print" />
        <Nav navItems={navItems} />
        <Stories />
      </>
    );
  }
}

export default App;

```

We begin by creating state in App.js:

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';
import navItems from './components/navItems';

class App extends React.Component {
  state = {
    navItems: navItems,
    stories: [],
    isLoading: true,
  };
  render() {
    return (
      <>
        <Header siteTitle="All the News that Fits We Print" />
        <Nav navItems={this.state.navItems} />
        <Stories />
      </>
    );
  }
}

export default App;
```

We instantiate stories as an empty array and optionally create a bit of state to track whether the data is loading. 

Note that the Nav component is now being sent state: `<Nav navItems={this.state.navItems} />`.

Now we use the component lifecycle event `componentWillMount` to fetch the data and then we pass it to the Stories component as a prop.

App.js:

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';
import navItems from './components/navItems';

class App extends React.Component {
  state = {
    navItems: navItems,
    stories: [],
    isLoading: true,
  };

  componentWillMount(section = 'arts') {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data.results, isLoading: false }));
  }

  render() {
    return (
      <>
        <Header siteTitle="All the News that Fits We Print" />
        <Nav navItems={this.state.navItems} />
        <Stories stories={this.state.stories} />
      </>
    );
  }
}

export default App;


```

Note `componentWillMount(section = 'arts')` - a default parameter for section.

## The Story Component

Rather than rendering everything in the stories component we pass that duty off to a small chunk - a component called Story (singluar).

Create Story.js:

```js
import React from 'react';

const Story = props => {
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
import React from 'react';
import Story from './Story';

const Stories = props => {
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
import React from 'react';

const Story = props => {
  return (
    <div className="entry">
      <img
        src={
          props.story.multimedia.length > 0
            ? props.story.multimedia[0].url
            : '/img/no-image.png'
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
import React from 'react';

const Story = props => {
  return (
    <div className="entry">
      <img
        src={
          props.story.multimedia.length > 0
            ? props.story.multimedia[0].url
            : '/img/no-image.png'
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
  componentWillMount(section = 'arts') {
    this.getStories(section);
  }

  getStories = section => {
    this.setState({ isLoading: true });
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data.results, isLoading: false }))
      .catch(error => console.log(error));
  };
```

Note: we switch the isLoading piece of state to true while the fetch operation is under way and set it to false once the operation has completed.

Set isLoading to false by default in the initial declaration:

`isLoading: false,`

We can now use this piece of state in the return as follows:

```js
render() {
    return (
      <>
        <Header siteTitle="All the News that Fits We Print" />
        <Nav navItems={this.state.navItems} />
        {this.state.isLoading ? (
          'Loading...'
        ) : (
          <Stories stories={this.state.stories} />
        )}
      </>
    );
  }
```

It may be difficult to see the effect unless we slow down the loading in the Network tab of the developer tools.

Again, the Loading functionality is not strictly required for the app to work and is being used here as an example of how to use state changes to optionally trigger content.

Pass getStories into the Nav in App.js:

`<Nav navItems={navItems} getStories={this.getStories} />`

Create NavItem.js

```js
import React from 'react';

const NavItem = props => {
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
import React from 'react';
import NavItem from './NavItem';

const Nav = props => {
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

Now we need to pass the getStories function to NavItem from Nav.js with `getStories={props.getStories}`:

```js
import React from 'react';
import NavItem from './NavItem';

const Nav = props => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem, index) => (
          <NavItem
            key={index}
            navItem={navItem}
            getStories={props.getStories}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

```

Once in NavItems we will create a local function `sendSection` and attach it to the link using `onClick={sendSection}`:

```js
import React from 'react';

const NavItem = props => {
  const sendSection = () => {
    props.getStories(props.navItem);
  };

  return (
    <li>
      <a href={`#${props.navItem}`} onClick={sendSection}>
        {props.navItem}
      </a>
    </li>
  );
};
export default NavItem;

```

The click event now communicates with the getStories function in App.js. 

Test it in the browser.

## Fixed Nav

In the original project the navbar became fixed to the top of the screen when the header was scrolled off.

We can perfom the same effect by adding an event listener (we will use the `componentWillMount` lifecycle method) and then creating a function which is identical to the one we used in the non-react version of the project.

In App.js

```js
  componentWillMount(section = 'arts') {
    this.getStories(section);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > document.querySelector('header').offsetHeight) {
      document.body.style.paddingTop =
        document.querySelector('nav').offsetHeight + 'px';
      document.body.classList.add('fixed-nav');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('fixed-nav');
    }
  };
```

E.g.:

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';
import { navItems } from './components/navItems';

class App extends React.Component {
  state = {
    navItems: navItems,
    stories: [],
    isLoading: false,
  };

  componentWillMount(section = 'arts') {
    this.getStories(section);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > document.querySelector('header').offsetHeight) {
      document.body.style.paddingTop =
        document.querySelector('nav').offsetHeight + 'px';
      document.body.classList.add('fixed-nav');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('fixed-nav');
    }
  };

  getStories = section => {
    this.setState({ isLoading: true });
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data.results, isLoading: false }))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <>
        <Header siteTitle="All the News that Fits We Print" />
        <Nav navItems={this.state.navItems} getStories={this.getStories} />
        {this.state.isLoading ? (
          'Loading...'
        ) : (
          <Stories stories={this.state.stories} />
        )}
      </>
    );
  }
}

export default App;

```

Add the logo list item to Nav.js:

```js
const Nav = props => {
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
            getStories={props.getStories}
          />
        ))}
      </ul>
    </nav>
  );
};
```

## Active State

It would be nice to have an indicator of which section we are viewing. Let's add a highlight to  the appropriate nav item for this purpose.

Initialize the application with a new piece of state - `activeLink` in App.js:

`activeLink: navItems[0],`

```js
  state = {
    navItems: navItems,
    stories: [],
    isLoading: false,
    activeLink: navItems[0],
  };
```

We can use the section variable to set the activeLink property when we run getStories:

`this.setState({ activeLink: section });`

```js
  getStories = section => {
    this.setState({ isLoading: true });
    this.setState({ activeLink: section });
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data.results, isLoading: false }))
      .catch(error => console.log(error));
  }
```

And then send the activeLink as a property to the Nav component:

`<Nav ... activeLink={this.state.activeLink}`


```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import navItems from './components/navItems';
import Stories from './components/Stories';

class App extends React.Component {
  state = {
    navItems: navItems,
    stories: [],
    isLoading: false,
    activeLink: navItems[0],
  };

  componentWillMount(section = 'arts') {
    this.getStories(section);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > document.querySelector('header').offsetHeight) {
      document.body.style.paddingTop =
        document.querySelector('nav').offsetHeight + 'px';
      document.body.classList.add('fixed-nav');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('fixed-nav');
    }
  };

  getStories = section => {
    this.setState({ activeLink: section });
    this.setState({ isLoading: true });
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data.results, isLoading: false }))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <>
        <Header siteTitle="All the News that Fits We Print" />
        <Nav
          navItems={navItems}
          getStories={this.getStories}
          activeLink={this.state.activeLink}
        />
        {this.state.isLoading ? (
          'Loading...'
        ) : (
          <Stories stories={this.state.stories} />
        )}
      </>
    );
  }
}

export default App;

```

Forward to from Nav.js to NavItem:

```js
import React from 'react';
import NavItem from './NavItem';

const Nav = props => {
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
            getStories={props.getStories}
            activeLink={props.activeLink}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

```

Finally use a ternary NavItem.js to toggle the class name:

```js
import React from 'react';

const NavItem = props => {
  const sendSection = () => {
    props.getStories(props.navItem);
  };
  return (
    <li className={props.activeLink === props.navItem ? 'active' : ''}>
      <a href={`#${props.navItem}`} onClick={sendSection}>
        {props.navItem}
      </a>
    </li>
  );
};
export default NavItem;

```

Since we didn't have this feature in the original project we need to add/edit a bit of css in the public folder:

```css
nav li.active {
  background-color: #00aeef;
}

nav a {
  text-decoration: none;
  display: inline-block;
  color: white;
  text-transform: capitalize;
  font-weight: 700;
  min-height: 2.5rem;
  line-height: 2.5rem;
  width: 100%;
}

nav a:hover {
  background-color: #00aeef;
}
```

## Notes

The Stories component is not strictly necessary. We can import Story and compose it instead.

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Story from './components/Story';
import { navItems } from './components/navItems';

class App extends React.Component {
  state = {
    navItems: navItems,
    stories: [],
    isLoading: false,
    activeLink: navItems[0],
  };

  componentWillMount(section = 'arts') {
    this.getStories(section);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > document.querySelector('header').offsetHeight) {
      document.body.style.paddingTop =
        document.querySelector('nav').offsetHeight + 'px';
      document.body.classList.add('fixed-nav');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('fixed-nav');
    }
  };

  getStories = section => {
    this.setState({ isLoading: true });
    this.setState({ activeLink: section });
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data.results, isLoading: false }))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <>
        <Header siteTitle="All the News that Fits We Print" />
        <Nav
          navItems={navItems}
          getStories={this.getStories}
          activeLink={this.state.activeLink}
        />
        {this.state.isLoading ? (
          'Loading...'
        ) : (
          <div className="site-wrap">
            {this.state.stories.map((story, index) => (
              <Story key={index} story={story} />
            ))}
          </div>
        )}
      </>
    );
  }
}
export default App;

```