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
    component: ComponentCreator('/finder/', 'bcd'),
    routes: [
      {
        path: '/finder/',
        component: ComponentCreator('/finder/', 'fce'),
        routes: [
          {
            path: '/finder/',
            component: ComponentCreator('/finder/', 'b6e'),
            routes: [
              {
                path: '/finder/events-and-effects/',
                component: ComponentCreator('/finder/events-and-effects/', 'f98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/events-and-effects/effects',
                component: ComponentCreator('/finder/events-and-effects/effects', 'e81'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/events-and-effects/events',
                component: ComponentCreator('/finder/events-and-effects/events', '458'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/mixins/',
                component: ComponentCreator('/finder/mixins/', '546'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/mixins/filters-mixin',
                component: ComponentCreator('/finder/mixins/filters-mixin', 'ccb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/mixins/group-by-mixin',
                component: ComponentCreator('/finder/mixins/group-by-mixin', '8b6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/mixins/matches-mixin',
                component: ComponentCreator('/finder/mixins/matches-mixin', '032'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/mixins/pagination-mixin',
                component: ComponentCreator('/finder/mixins/pagination-mixin', '674'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/mixins/search-mixin',
                component: ComponentCreator('/finder/mixins/search-mixin', 'c76'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/mixins/sort-by-mixin',
                component: ComponentCreator('/finder/mixins/sort-by-mixin', 'b66'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/react/',
                component: ComponentCreator('/finder/react/', '314'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/react/finder',
                component: ComponentCreator('/finder/react/finder', 'f8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/react/finder-content',
                component: ComponentCreator('/finder/react/finder-content', 'a4b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/react/finder-search-term',
                component: ComponentCreator('/finder/react/finder-search-term', 'd6e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/react/use-finder',
                component: ComponentCreator('/finder/react/use-finder', 'fcc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/',
                component: ComponentCreator('/finder/rules/', '280'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/filter-rule',
                component: ComponentCreator('/finder/rules/filter-rule', '171'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/group-by-rule',
                component: ComponentCreator('/finder/rules/group-by-rule', 'ac9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/ruleset',
                component: ComponentCreator('/finder/rules/ruleset', '89a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/search-rule',
                component: ComponentCreator('/finder/rules/search-rule', 'ef7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/finder/rules/sort-by-rule',
                component: ComponentCreator('/finder/rules/sort-by-rule', '614'),
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
