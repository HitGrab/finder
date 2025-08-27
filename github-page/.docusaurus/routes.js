import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '1b3'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'e8c'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '5bb'),
            routes: [
              {
                path: '/docs/api/config',
                component: ComponentCreator('/docs/api/config', '03b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/finder-core',
                component: ComponentCreator('/docs/api/finder-core', 'c71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/events-and-hooks/',
                component: ComponentCreator('/docs/events-and-hooks/', 'd24'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/events-and-hooks/effects',
                component: ComponentCreator('/docs/events-and-hooks/effects', '09c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/events-and-hooks/events',
                component: ComponentCreator('/docs/events-and-hooks/events', 'c06'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/events-and-hooks/events-vs-hooks',
                component: ComponentCreator('/docs/events-and-hooks/events-vs-hooks', '723'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/',
                component: ComponentCreator('/docs/mixins/', '452'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/filters-mixin',
                component: ComponentCreator('/docs/mixins/filters-mixin', '29c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/group-by-mixin',
                component: ComponentCreator('/docs/mixins/group-by-mixin', '1d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/matches-mixin',
                component: ComponentCreator('/docs/mixins/matches-mixin', 'f8b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/pagination-mixin',
                component: ComponentCreator('/docs/mixins/pagination-mixin', 'a68'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/search-mixin',
                component: ComponentCreator('/docs/mixins/search-mixin', '6c6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/mixins/sort-by-mixin',
                component: ComponentCreator('/docs/mixins/sort-by-mixin', '395'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/react/finder',
                component: ComponentCreator('/docs/react/finder', '201'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/react/finder-content',
                component: ComponentCreator('/docs/react/finder-content', '860'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/react/finder-search-term',
                component: ComponentCreator('/docs/react/finder-search-term', '0cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/',
                component: ComponentCreator('/docs/rules/', 'ce3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/filter-rule',
                component: ComponentCreator('/docs/rules/filter-rule', '33c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/group-by-rule',
                component: ComponentCreator('/docs/rules/group-by-rule', 'bfd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/ruleset',
                component: ComponentCreator('/docs/rules/ruleset', 'ce6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/search-rule',
                component: ComponentCreator('/docs/rules/search-rule', 'fbf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/rules/sort-by-rule',
                component: ComponentCreator('/docs/rules/sort-by-rule', '5a5'),
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
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
