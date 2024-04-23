export interface ISideLink {
    icon     : JSX.Element
    label    : string
    path     : string
    subLinks?: ISideLink[]
}