import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

function useIsPhoneExists(phoneQuery:string|undefined)
{
    function checkPhone()
    {
        return apiClient.get(`Users/IsUserexistsByPhoneNumber/${phoneQuery}`)
        .then(res=>res.data);
    }

    return useQuery({
        queryKey:["isPhoneExists",phoneQuery,"phones"],
        queryFn:checkPhone,
        enabled:!!phoneQuery
    });
}

export default useIsPhoneExists;