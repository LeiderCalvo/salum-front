
import { useEffect, useState } from "react"

import ProfilesService from "../../services/profiles/profiles"
import { DashboardView } from "./Dashboard.view"

export const Dashboard = () => {
    const [profiles, setProfiles] = useState([])

    const getAllProfiles = async () => {
        const data = await ProfilesService.getAll();
        setProfiles(data.sort((a, b) => a.first_surname.localeCompare(b.first_surname)))
    }

    useEffect(() => {
        getAllProfiles()
    }, [])

    return <DashboardView profiles={profiles} />
}