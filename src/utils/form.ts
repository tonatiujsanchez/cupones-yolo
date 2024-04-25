import { IBrand, ICategory, ISection, ISelectOption, ISize } from '@/interfaces'

export const includesOptionSelect = ( option:ISelectOption, options:ISelectOption[] ):boolean => {
    return options.some( opt => opt.value === option.value )
}

export const getOptionsOfSections = ( sections:ISection[] ):ISelectOption[] => {
    return sections.map( section => ({ value: section.slug, label: section.title }) )
}

export const getOptionsOfCategories = ( categories:ICategory[] ):ISelectOption[] => {
    return categories.map( category => ({ value: category.slug, label: category.title }) )
}

export const getOptionsOfBrands = ( brands: IBrand[] ):ISelectOption[] => {
    return brands.map(brand => ({ value: brand.slug, label: brand.title }))
}

export const getOptionsOfSizes = ( sizes:ISize[] ):ISelectOption[] => {
    return sizes.map( size => ({ value: size.value, label: size.label }) )
}

export const arrayFilesToFileList = (array: File[]): FileList => {
    const dataTransfer = new DataTransfer()
    array.forEach(file => {
        dataTransfer.items.add(file)
    })
    return dataTransfer.files
}
