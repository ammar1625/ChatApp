import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { userToFetch } from "./useLogIn";


export function useUsersList(query:string|null)
{
    function getFiltredUsersList()
    {
        return apiClient.get<userToFetch[]>(`/Users/UserFilter/${query}`)
        .then(res=>res.data);
    }

    return useQuery({
        queryKey:["usersList",query],
        queryFn:getFiltredUsersList,
        enabled:!!query
    });
}