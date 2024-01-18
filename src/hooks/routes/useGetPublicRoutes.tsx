import { PUBLIC_ROUTES_QUERY_KEY } from "@/constants/routes"
import { routesActions } from "@/services"
import { useQuery } from "@tanstack/react-query"

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
