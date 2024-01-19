import { useQuery } from "@tanstack/react-query"
import { routesActions } from "@/services"
import { PUBLIC_ROUTES_QUERY_KEY } from "@/constants"

export const useGetPublicRoutes = () => {
    
    const routesQuery = useQuery({
        queryKey: [PUBLIC_ROUTES_QUERY_KEY],
        queryFn: routesActions.getPublicRoutes,
        staleTime: 60 * 60 * 60 * 24
    })
    return {
        routesQuery
    }
}
