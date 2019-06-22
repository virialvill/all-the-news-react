# All the News - React

- [All the News - React](#All-the-News---React)
  - [1: Create the Header Component](#1-Create-the-Header-Component)
  - [2: Create the Nav Component](#2-Create-the-Nav-Component)
  - [3: Create the Stories Component](#3-Create-the-Stories-Component)
  - [4: Lift State Up to App](#4-Lift-State-Up-to-App)
  - [5: Categories](#5-Categories)
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
function App() {
  return (
    <>
      <Header />
    </>
  );
}
```

## 2: Create the Nav Component

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
    <div className="App">
      <Header />
      <Nav navList={navItems} />
    </div>
  );
}

export default App;
```

Nav.js:

```js
import React from 'react';

const Nav = props => {
  return (
    <nav>
      <ul>
        {props.navList.map(navItem => (
          <li key={navItem.link}>
            <a href={navItem.link}>{navItem.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

```

Externalize the data.

`components/navItems.js`

```js
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

export default navItems;
```

App.js:

```js
import React from 'react';
import navItems from './components/navItems';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav navList={navItems} />
    </div>
  );
}

export default App;

```

<!-- ## 3: Create the Stories Component

https://upmostly.com/tutorials/react-ajax-requests-fetch-data/


```js
import React, { useState, useEffect } from 'react';

const Stories = () => {
  const [topStories, setStories] = useState([]);

  useEffect(() => {
    getStories();
  }, []);

  async function getStories() {
    const response = await fetch(
      'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0',
    );
    const topStories = await response.json();
    setStories(topStories.results);
    console.log(topStories.results);
  }

  return (
    <div className="site-wrap">
      {topStories.map(story => (
        <div className="entry" key={story.title}>
          <img
            src={
              story.multimedia.length > 0
                ? story.multimedia[0].url
                : '/img/no-image.png'
            }
            alt="images"
          />
          <div>
            <h3>
              <a href={story.short_url}>{story.title}</a>
            </h3>
            <p>{story.abstract}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;

``` -->

## 3: Create the Stories Component

```js
import React from 'react';

const nytapi = 'uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0';
const section = 'arts';

class Stories extends React.Component {
  state = {
    stories: [],
  };

  componentWillMount() {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`,
    )
      .then(response => response.json())
      .then(data => {
        let stories = data.results.map(story => {
          return (
            <div className="entry" key={story.title}>
              <img
                src={
                  story.multimedia.length > 0
                    ? story.multimedia[0].url
                    : '/img/no-image.png'
                }
                alt="images"
              />
              <div>
                <h3>
                  <a href={story.short_url}>{story.title}</a>
                </h3>
                <p>{story.abstract}</p>
              </div>
            </div>
          );
        });
        this.setState({ stories: stories });
      });
  }

  render() {
    return (
      <div className="site-wrap">
        {/* <pre>
          <code>{JSON.stringify(this.state.stories, null, 2)}</code>
        </pre> */}

        {this.state.stories}
      </div>
    );
  }
}

export default Stories;

```

Import it into App.js:

```js
import React from 'react';
import navItems from './components/navItems';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav navList={navItems} />
      <Stories />
    </div>
  );
}

export default App;
```

## 4: Lift State Up to App

```js
import React from 'react';
import navItems from './components/navItems';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';

class App extends React.Component {
  state = {
    navItems: navItems,
    stories: null,
    isLoading: true,
  };

  componentDidMount(section = 'arts') {
    this.getStories(section);
  }

  getStories = link => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${link}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data, isLoading: false }))
      .catch(error => console.log(error));
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <Header />
        <Nav navList={navItems} getStories={this.getStories} />

        {!isLoading ? (
          <Stories stories={this.state.stories} />
        ) : (
          <h3>Loading...</h3>
        )}
      </>
    );
  }
}

export default App;

```

```js
import React from 'react';

class Stories extends React.Component {
  render() {
    const results = this.props.stories.results;
    console.log('results ', this.props.stories.results);
    return (
      <div className="site-wrap">
        {results.map(story => (
          <div className="entry">
            <img
              src={
                story.multimedia[0] === undefined ? '' : story.multimedia[0].url
              }
              alt="images"
            />

            <div>
              <h3>
                <a href="{story.short_url}" alt={story.title}>
                  {story.title}
                </a>
              </h3>
              <p>{story.abstract}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Stories;

```

NavItem

```js
import React, { Component } from 'react';

class NavItem extends Component {
  render() {
    return (
      <li>
        <a href={this.props.link} onClick={this.props.buildStories}>
          {this.props.label}
        </a>
      </li>
    );
  }
}
export default NavItem;
```

Nav

```js
import React from 'react';
import NavItem from './NavItem';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          {this.props.navList.map(navItem =>
            <NavItem
              key={navItem.link}
              link={navItem.link}
              label={navItem.label}
              buildStories={this.props.buildStories}
            />,
          )}
        </ul>
      </nav>
    );
  }
}

export default Nav;

```

## 5: Categories

Nav.js

```js
import React from 'react';
import NavItem from './NavItem';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          {this.props.navList.map(navItem => (
            <NavItem
              key={navItem.link}
              link={navItem.link}
              label={navItem.label}
              getStories={this.props.getStories}
            />
          ))}
        </ul>
      </nav>
    );
  }
}

export default Nav;

```

NavItem.js

```js
import React, { Component } from 'react';

class NavItem extends Component {
  sendSection = () => {
    this.props.getStories(this.props.label);
  };

  render() {
    return (
      <li>
        <a href={this.props.link} onClick={this.sendSection}>
          {this.props.label}
        </a>
      </li>
    );
  }
}
export default NavItem;
```

App.js

```js
import React from 'react';
import navItems from './components/navItems';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';

class App extends React.Component {
  state = {
    navItems: navItems,
    stories: null,
  };

  componentDidMount() {
    this.getStories('arts');
  }

  getStories = link => {
    console.log(link);
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${link}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data }));
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Nav navList={navItems} getStories={this.getStories} />
        {this.state.stories ? (
          <Stories stories={this.state.stories} />
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
}

export default App;

```

Stories

```js
import React from 'react';

class Stories extends React.Component {
  render() {
    const results = this.props.stories.results;
    console.log('results ', this.props.stories.results);
    return (
      <div className="site-wrap">
        {results.map(story => (
          <div className="entry">
            <img
              src={
                story.multimedia[0] === undefined ? '' : story.multimedia[0].url
              }
              alt="images"
            />

            <div>
              <h3>
                <a href="{story.short_url}" alt={story.title}>
                  {story.title}
                </a>
              </h3>
              <p>{story.abstract}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Stories;
```

## 6: Fixed Nav

```js
import React from 'react';

import NavItem from './NavItem';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li className="logo">
            <a href="#top">
              <img src="img/logo.svg" alt="logo" />
            </a>
          </li>
          {this.props.navList.map(navItem => (
            <NavItem
              key={navItem.link}
              link={navItem.link}
              label={navItem.label}
              getStories={this.props.getStories}
            />
          ))}
        </ul>
      </nav>
    );
  }
}

export default Nav;
```

```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';

// import './NavItems.js';

const navItemsObject = [
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

class App extends React.Component {
  state = {
    navItems: navItemsObject,
    stories: null,
    isLoading: true,
  };

  componentDidMount(section = 'arts') {
    this.getStories(section);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  getStories = link => {
    this.setState({ isLoading: true });
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${link}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  };

  render() {
    const { isLoading, error } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav navList={navItemsObject} getStories={this.getStories} />
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          <Stories stories={this.state.stories} />
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default App;

```

## 6: Active State

activeLink

`activeLink: navItemsObject[0].label,`

`this.setState({ activeLink: link });`

`<Nav ... activeLink={this.state.activeLink}`


```js
import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Stories from './components/Stories';

// import './NavItems.js';

const navItemsObject = [
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

class App extends React.Component {
  state = {
    navItems: navItemsObject,
    stories: null,
    isLoading: true,
    activeLink: navItemsObject[0].label,
  };

  componentDidMount(section = 'arts') {
    this.getStories(section);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  getStories = link => {
    this.setState({ activeLink: link });
    this.setState({ isLoading: true });
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${link}.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0`,
    )
      .then(response => response.json())
      .then(data => this.setState({ stories: data, isLoading: false }))
      .catch(error => console.log(error));
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="App">
        <Header />
        <Nav
          navList={navItemsObject}
          getStories={this.getStories}
          activeLink={this.state.activeLink}
        />
        {!isLoading ? (
          <Stories stories={this.state.stories} />
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default App;

```

Nav.js

```js
import React from 'react';

import NavItem from './NavItem';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li className="logo">
            <a href="#top">
              <img src="img/logo.svg" alt="logo" />
            </a>
          </li>
          {this.props.navList.map(navItem => (
            <NavItem
              key={navItem.link}
              link={navItem.link}
              label={navItem.label}
              getStories={this.props.getStories}
              activeLink={this.props.activeLink}
            />
          ))}
        </ul>
      </nav>
    );
  }
}

export default Nav;

```

```css
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