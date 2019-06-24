# All the News - React

- [All the News - React](#All-the-News---React)
  - [1: Create the Header Component](#1-Create-the-Header-Component)
  - [2: Create the Nav Component](#2-Create-the-Nav-Component)
  - [Importing and Exporting](#Importing-and-Exporting)
  - [3: Create the Stories Component](#3-Create-the-Stories-Component)
  - [Demo: State](#Demo-State)
  - [4: Lift State Up to App](#4-Lift-State-Up-to-App)
  - [The Story COmponent](#The-Story-COmponent)
  - [Multiple Sections](#Multiple-Sections)
  - [6: Fixed Nav](#6-Fixed-Nav)
  - [6: Active State](#6-Active-State)

Install the required modules using `npm install` and `npm start` the application.

Examine the application structure.

## 1: Create the Header Component

`components/Header.js`

```js
import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>All the News That Fits We Print!</h1>
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

## 2: Create the Nav Component

Nav.js:

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

Import and compose it:

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

In App.js add our navList from the vanilla JS version and send it, via props, to the Nav component:

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

Note that when calling `.map` we do not use curly `{ ... }` but rounded braces `( ... )`. 

The right hand side of the arrow function needs to be an expression. 

## Importing and Exporting

Externalize the data.

Create `components/navItems.js` (note the lower case - this is not a React component).

```js
const navItems = ['arts', 'books', 'fashion', 'food', 'movies', 'travel'];

export default navItems;

```

We are now using a simple array. Since the links and labels are almost identical we have simplified things a bit here.

Remove it from App.js and import the external file:

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

Note that the data is not in the format expected by Nav.js.

Nav.js

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

## 3: Create the Stories Component

Create the stories component with a single category to start.

`components/Stories.js`:

```js
import React from 'react';

class Stories extends React.Component {
  render() {
    return <div className="site-wrap">Stories</div>;
  }
}

export default Stories;
```

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
    nytapi: 'uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0',
    section: 'arts',
    stories: [],
  };

  componentWillMount() {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${
        this.state.section
      }.json?api-key=${this.state.nytapi}`,
    )
      .then(response => response.json())
      .then(
        data => this.setState({ stories: data })
      )
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

## 4: Lift State Up to App

Roll back Stories.js to:

```js
import React from 'react';

class Stories extends React.Component {
  render() {
    return (
      <div className="site-wrap">
        <pre>
          <code>{JSON.stringify(this.props.stories, null, 2)}</code>
        </pre>
      </div>
    );
  }
}

export default Stories;
```

Note: `this.props.stories`. 

Since we want to store data in App.js we need to use a class component.

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

We instantiate stories as an empty array and create a bit of state to track whether the data is loading. 

Note that the Nav component is now being sent state: `<Nav navItems={this.state.navItems} />`.

Now we use a component lifecycle event to fetch the data and pass it to the Stories component as a prop.

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

Note `componentWillMount(section = 'arts')` - a default variable.

## The Story COmponent

Rather than rendering everything in the stories component we pass that duty off to a small chunk - a component called Story (singluar).

Create Story.js:

```js
import React from 'react';

const Story = props => {
  return (
    <div>
      <p>Story component</p>
    </div>
  );
};

export default Story;

```

We will render multiple stoy components from Stories with a key set to the story's index.

Stories.js:

```js
import React from 'react';
import Story from './Story';

class Stories extends React.Component {
  render() {
    return (
      <div className="site-wrap">
        {this.props.stories.map((story, index) => (
          <Story key={index} story={story} />
        ))}
      </div>
    );
  }
}

export default Stories;

```

Now, in Story.js, begin building out the content following the structure of the html in the non React version of this project:

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

And continue:

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

Currently our app only renders the arts section. We need to code the navbar tabs to communicate with App in order to fetch other sections.

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

We switch the isLoading piece of state to true while the fetch operation is under way and set it to false once the operation has completed.

isLoading will be set to false by default in the initial declaration and is toggled to true at the beginning of the fatch operation. When the data is ready we set it to false. 

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

Use it in Nav.js:

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

Now we need to pass the getStories function to NavItem from Nav.js:

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

Once in NavItems we will create a local function sendSection on attach it to the link using onClick:

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

## 6: Fixed Nav

In the original project the navbar became fixed to the top of the screen when the header was scrolled off.

We can perfom the same effect by editing App.js

```js
  componentWillMount(section = 'arts') {
    this.getStories(section);
    window.addEventListener('scroll', this.handleScroll);
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

E.g.:

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
    isLoading: false,
  };

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

  componentWillMount(section = 'arts') {
    this.getStories(section);
    window.addEventListener('scroll', this.handleScroll);
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

  render() {
    return (
      <>
        <Header siteTitle="All the News that Fits We Print" />
        <Nav navItems={navItems} getStories={this.getStories} />
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

The log can be added to Nav.js:

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

## 6: Active State

It would be nice to have an idicator of which section we are viewing. Let's add a highlighted nav item for this purpose.

Initialize the application with a new peice of state - `activeLink` in App.js:

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
        <Header />
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

Since we didn't have this feature in the original project we need to add a bit of css:

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