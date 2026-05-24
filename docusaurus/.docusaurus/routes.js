import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/finder/markdown-page',
    component: ComponentCreator('/finder/markdown-page', 'c0b'),
    exact: true
  },
  {
    path: '/finder/',
    component: ComponentCreator('/finder/', '559'),
    routes: [
      {
        path: '/finder/',
        component: ComponentCreator('/finder/', 'd72'),
        routes: [
          {
            path: '/finder/',
            component: ComponentCreator('/finder/', '010'),
            routes: [
              {
                path: '/finder/Core Concepts',
                component: ComponentCreator('/finder/Core Concepts', '325'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/examples/Kicking Rad Shoes',
                component: ComponentCreator('/finder/examples/Kicking Rad Shoes', '828'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/examples/Pixel Armory',
                component: ComponentCreator('/finder/examples/Pixel Armory', '3d7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/guides/context/',
                component: ComponentCreator('/finder/guides/context/', 'de3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/guides/context/context-rules',
                component: ComponentCreator('/finder/guides/context/context-rules', '87f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/guides/context/injecting-context',
                component: ComponentCreator('/finder/guides/context/injecting-context', '473'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/api/',
                component: ComponentCreator('/finder/reference/api/', 'e1e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/api/events-api',
                component: ComponentCreator('/finder/reference/api/events-api', '186'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/api/filter-api',
                component: ComponentCreator('/finder/reference/api/filter-api', '2f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/api/group-by-api',
                component: ComponentCreator('/finder/reference/api/group-by-api', 'ac4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/api/matches-api',
                component: ComponentCreator('/finder/reference/api/matches-api', '7b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/api/pagination-api',
                component: ComponentCreator('/finder/reference/api/pagination-api', '760'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/api/search-api',
                component: ComponentCreator('/finder/reference/api/search-api', '9ff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/api/sort-by-api',
                component: ComponentCreator('/finder/reference/api/sort-by-api', '709'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/api/test-api',
                component: ComponentCreator('/finder/reference/api/test-api', '98e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/react-components/',
                component: ComponentCreator('/finder/reference/react-components/', '922'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/react-components/finder',
                component: ComponentCreator('/finder/reference/react-components/finder', '449'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/react-components/finder-content',
                component: ComponentCreator('/finder/reference/react-components/finder-content', 'c11'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/react-components/finder-search-term-haystack',
                component: ComponentCreator('/finder/reference/react-components/finder-search-term-haystack', '170'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/react-components/string-match',
                component: ComponentCreator('/finder/reference/react-components/string-match', '8e3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/react-components/use-finder',
                component: ComponentCreator('/finder/reference/react-components/use-finder', 'd37'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/rules/',
                component: ComponentCreator('/finder/reference/rules/', '924'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/rules/effects/',
                component: ComponentCreator('/finder/reference/rules/effects/', '85c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/rules/effects/rule-effects',
                component: ComponentCreator('/finder/reference/rules/effects/rule-effects', 'e15'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/rules/effects/search-effects',
                component: ComponentCreator('/finder/reference/rules/effects/search-effects', '3db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/rules/filter-rule',
                component: ComponentCreator('/finder/reference/rules/filter-rule', '66d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/rules/group-by-rule',
                component: ComponentCreator('/finder/reference/rules/group-by-rule', '98c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/rules/ruleset',
                component: ComponentCreator('/finder/reference/rules/ruleset', '3f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/rules/search-rule',
                component: ComponentCreator('/finder/reference/rules/search-rule', '5d5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/rules/sort-by-rule',
                component: ComponentCreator('/finder/reference/rules/sort-by-rule', 'c0f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/reference/types/',
                component: ComponentCreator('/finder/reference/types/', '65c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/complete',
                component: ComponentCreator('/finder/tutorial/complete', '96b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/controls',
                component: ComponentCreator('/finder/tutorial/controls', '6a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/filters',
                component: ComponentCreator('/finder/tutorial/filters', 'b92'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/quick-start',
                component: ComponentCreator('/finder/tutorial/quick-start', '67c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/react',
                component: ComponentCreator('/finder/tutorial/react', 'ced'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/review',
                component: ComponentCreator('/finder/tutorial/review', 'e5d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/search',
                component: ComponentCreator('/finder/tutorial/search', '71d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/tutorial/sort-by',
                component: ComponentCreator('/finder/tutorial/sort-by', '11e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/',
                component: ComponentCreator('/finder/', '8bd'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
