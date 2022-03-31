# Changelog

## [0.5.2] - 2022-03-31

- fix: `useRemoveLocation` should accept ID string instead of object (but still allows object)

## [0.5.1] - 2022-03-30

- fix: remove `@hyperobjekt/mapgl` and `@hyperobjekt/scales` from build output

## [0.5.0] - 2022-03-30

- feat: allow callback function to be provided to `<Dashboard />` via `onLoad` prop
- feat: allow optional routing with `enableRouter` prop on `<Dashboard />`
- fix: do not throw errors if no `extent_data` is provided for scales

## [0.4.4] - 2022-03-29

- fix: use proper value ranges for choropleth layers when start is 0

## [0.4.3] - 2022-03-29

- fix: drop hovered + selected location hooks (not working as intended)

## [0.4.2] - 2022-03-28

- chore: update function signatures and module docs

## [0.4.1] - 2022-03-28

- chore: add API docs for location module
- fix: add alias hooks for hovered and selected location

## [0.4.0] - 2022-03-24

- feat: `useLocationData` and `useLocationFeature` now allow a number as an argument to limit the number of locations

## [0.3.1] - 2022-03-22

- fix: do not return lang key for missing entries

## [0.3.0] - 2022-03-22

- feat: add hooks for locations

## [0.2.1] - 2022-03-21

- fix: return proper formatter for large numbers

## [0.2.0] - 2022-03-20

- feat: add hooks for getting bubble and choropleth metric

## [0.1.1] - 2022-03-18

- fix: add bubble and choropleth layer hooks to exports

## [0.1.0] - 2022-03-15

- initial release
