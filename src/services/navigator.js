import { NavigationActions } from 'react-navigation'

let navigator

export function setNavigator(nav) {
  navigator = nav
}

export function getNavigator(nav) {
  return nav
}

export function navigate(routeName, params) {
  if (navigator) {
    navigator.dispatch(NavigationActions.navigate({routeName, params}))
  }
}

export function reset(routeName, params) {
  if (navigator) {
    navigator.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName, params})]
    }))
  }
}

export function goBack() {
  if (navigator) {
    navigator.dispatch(NavigationActions.back())
  }
}
