# All the News - React

- [All the News - React](#All-the-News---React)
  - [Create the Header Component](#Create-the-Header-Component)
  - [The Nav Component](#The-Nav-Component)
  - [Importing and Exporting](#Importing-and-Exporting)
  - [Import and Export](#Import-and-Export)
  - [The Stories Component](#The-Stories-Component)
  - [Demo: State](#Demo-State)
  - [State in App](#State-in-App)
  - [The Story Component](#The-Story-Component)
  - [Multiple Sections](#Multiple-Sections)
  - [Fixed Nav](#Fixed-Nav)
  - [Active State](#Active-State)

We will retrofit the single page app developed in session one to use React.

The [final result](http://oit2.scps.nyu.edu/~devereld/intermediate/all-the-news-react/) will behave a bit differently.

Install the required modules using `npm install` and `npm start` the application.

Examine the application structure.

## Create the Header Component

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
          <a href={navItem.link}>{navItem.label}</a>
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

## Import and Export

There are two ways of exporting in JavaScript: default and named.

`export { navItems };` is a named export and would be imported using `import { navItems } from './components/navItems';`

You will often see people using named inports when creating React components:

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

Note the ternary expression - if `props.stories` exists then output the JSON, otherwise output the string Stories.

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

But that would eventually lead to issues. When we hook up our navbar it will need to access a fetching mechanism in order to bring the new content into the app. THerefore it is a much better idea to keep this functionality at the top level of our application.

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