import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'f4d'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'f4a'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'a31'),
            routes: [
              {
                path: '/events-and-effects/',
                component: ComponentCreator('/events-and-effects/', '939'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/events-and-effects/effects',
                component: ComponentCreator('/events-and-effects/effects', 'baf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/events-and-effects/events',
                component: ComponentCreator('/events-and-effects/events', '4ae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mixins/',
                component: ComponentCreator('/mixins/', '9a3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mixins/filters-mixin',
                component: ComponentCreator('/mixins/filters-mixin', '0bf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mixins/group-by-mixin',
                component: ComponentCreator('/mixins/group-by-mixin', '874'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mixins/matches-mixin',
                component: ComponentCreator('/mixins/matches-mixin', 'a56'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mixins/pagination-mixin',
                component: ComponentCreator('/mixins/pagination-mixin', '69a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mixins/search-mixin',
                component: ComponentCreator('/mixins/search-mixin', '604'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/mixins/sort-by-mixin',
                component: ComponentCreator('/mixins/sort-by-mixin', '9dc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/react/',
                component: ComponentCreator('/react/', '023'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/react/finder',
                component: ComponentCreator('/react/finder', 'e7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/react/finder-content',
                component: ComponentCreator('/react/finder-content', '67e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/react/finder-search-term',
                component: ComponentCreator('/react/finder-search-term', '166'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/react/use-finder',
                component: ComponentCreator('/react/use-finder', 'c5c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/rules/',
                component: ComponentCreator('/rules/', '1a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/rules/filter-rule',
                component: ComponentCreator('/rules/filter-rule', '7ec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/rules/group-by-rule',
                component: ComponentCreator('/rules/group-by-rule', 'd59'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/rules/ruleset',
                component: ComponentCreator('/rules/ruleset', '8e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/rules/search-rule',
                component: ComponentCreator('/rules/search-rule', 'c44'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/rules/sort-by-rule',
                component: ComponentCreator('/rules/sort-by-rule', 'b2d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'efb'),
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
