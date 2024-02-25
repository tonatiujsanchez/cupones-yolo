import { yolostyleApi } from "@/apis"
import { ISection } from "@/interfaces"


interface AddNewSectionParams {
    section: ISection
}
export const addNewSection = async({ section }:AddNewSectionParams ):Promise<ISection> => {

    const { data } = await yolostyleApi.post('/admin/sections', section )
    return data
}