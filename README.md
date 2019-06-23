# All the News - React

- [All the News - React](#All-the-News---React)
  - [1: Create the Header Component](#1-Create-the-Header-Component)
  - [2: Create the Nav Component](#2-Create-the-Nav-Component)
  - [3: Create the Stories Component](#3-Create-the-Stories-Component)
  - [4: Lift State Up to App](#4-Lift-State-Up-to-App)
  - [Multiple Sections](#Multiple-Sections)
  - [6: Fixed Nav](#6-Fixed-Nav)
  - [6: Active State](#6-Active-State)

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
      <Header />
    </>
  );
}

export default App;
```

## 2: Create the Nav Component

Nav.js:

```js
import React from 'react';

const Nav = props => {
  return (
    <nav>
      <ul>
        {props.navItems.map(index => (
          <p>{index}</p>
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
        {props.navItems.map(index => (
          <p key={index}>{index}</p>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

```

Nav.js - rendering content:

```js
import React from 'react';

const Nav = props => {
  return (
    <nav>
      <ul>
        {props.navItems.map((navItem, index) => (
          <li key={index}>
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

The right hand side of the arrow function needs to be an expression. An expression is any valid unit of code that resolves to a value.

App.js:

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
      <Header />
      <Nav navItems={navItems} />
    </>
  );
}

export default App;
```

Externalize the data.

`components/navItems.js`

```js
const navItems = ['arts', 'books', 'fashion', 'food', 'movies', 'travel'];

export default navItems;

```

App.js:

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import navItems from './components/navItems';

function App() {
  return (
    <>
      <Header />
      <Nav navItems={navItems} />
    </>
  );
}

export default App;
```

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

Note the use of a template string.

## 3: Create the Stories Component

Create the stories component with a single category to start.

Stories.js

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

Import it into App.js:

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import navItems from './components/navItems';
import Stories from './components/Stories';

function App() {
  return (
    <>
      <Header />
      <Nav navItems={navItems} />
      <Stories />
    </>
  );
}

export default App;

```

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

Note: `this.props.stories`

Since we want to store data in App.js we need to use a class component.

App.js:

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import navItems from './components/navItems';
import Stories from './components/Stories';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Nav navItems={navItems} />
        <Stories />
      </>
    );
  }
}

export default App;

```

Note that we've imported and composed Stories as well.

App.js:

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
        <Header />
        <Nav navItems={navItems} />
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

Note `componentWillMount(section = 'arts')` - a default variable.

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

Render them from Stories with a key set to the story's index:

```js
import React from 'react';
import Story from './Story';

const Stories = props => {
  console.log(props);
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

Currently our app only render the arts section. We need to code the navbar tabs to communicate with App in order to fetch other sections.

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

Pass getStories into the Nav:

`<Nav navItems={navItems} getStories={this.getStories} />`

NavItem

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

Once in NavItems we will create a local function:

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

## 6: Fixed Nav

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
    isLoading: true,
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
        <Header />
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

## 6: Active State

activeLink

In state:

`activeLink: navItems[0].label,`

`this.setState({ activeLink: link });`

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

Nav.js

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

NavItem.js:

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
}

```