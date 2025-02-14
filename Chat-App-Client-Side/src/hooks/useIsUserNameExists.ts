import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

function useIsUserNameExists(userNameQuery:string|undefined)
{
    function checkUserName()
    {
        return apiClient.get(`/Users/IsUserExistsByUserName/${userNameQuery}`)
        .then(res=>res.data)
    }

    return useQuery({
        queryKey:["isUserNameExists",userNameQuery,"username"],
        queryFn:checkUserName,
        staleTime:0,
        enabled: !!userNameQuery 
    });
}

export default useIsUserNameExists;