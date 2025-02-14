import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

function useIsEmailExists(emailQuery:string|undefined)
{
    function checkEmail()
    {
        return apiClient.get(`/Users/IsUserExistsByEmail/${emailQuery}`)
        .then(res=>res.data)
    }

    return useQuery({
        queryKey:["isEmailExists",emailQuery,"email"],
        queryFn:checkEmail,
        enabled : !!emailQuery
    })
}

export default useIsEmailExists;