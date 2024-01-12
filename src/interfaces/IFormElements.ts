export interface ISelectOption {
    value: string
    label: string
    icon?: JSX.Element
}

export interface IDropdownOption {
    label     : string
    action    : ()=> void
    icon?     : JSX.Element
    className?: string
}

export type ButtonType = 'button' | 'submit'