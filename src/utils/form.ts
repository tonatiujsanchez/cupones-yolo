import { ICategory, ISection, ISelectOption } from "@/interfaces"

export const includesOptionSelect = ( option:ISelectOption, options:ISelectOption[] ):boolean => {
    return options.some( opt => opt.value === option.value )
}

export const getOptionsOfSections = ( sections:ISection[] ):ISelectOption[] => {
    return sections.map( section => ({ value: section.slug, label: section.title }) )
}

export const getOptionsOfCategories = ( categories:ICategory[] ):ISelectOption[] => {
    return categories.map( category => ({ value: category.slug, label: category.title }) )
}