import { createContext } from "react";

export const managementContext = createContext(null)


const ManagementContextProvider = (props) => {
    const url = 'http://localhost:9000'

    const contextValue={
        url
    }

    return(
        <managementContext.Provider value={contextValue}>
            {props.children}
        </managementContext.Provider>
    )
}


export default ManagementContextProvider