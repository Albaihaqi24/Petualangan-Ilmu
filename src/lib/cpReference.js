import reference from '../../content/cp-sd-2025.json' with { type: 'json' }

export const cpReference = reference
export const findCpScope = (id) => reference.scopes.find((scope) => scope.id === id)
export const findCpElement = (id) =>
  reference.scopes.flatMap((scope) => scope.elements).find((element) => element.id === id)
export const scopesForApp = (subject, phase) =>
  reference.scopes.filter((scope) => scope.app_subject === subject && scope.phase === phase)
