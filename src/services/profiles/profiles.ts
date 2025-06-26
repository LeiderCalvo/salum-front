import SUPABASE from "@/clients/profiles";
import { Profile } from "@/schemas/profiles";

localStorage.clear()

class ProfilesService {
    async getAll() {
        const saved = localStorage.getItem("@PROFILES_CACHE")
        if(saved) return JSON.parse(saved)

        const { data, error } = await SUPABASE.from("profiles").select();
        localStorage.setItem("@PROFILES_CACHE", JSON.stringify(data))
        if (error) {
            console.error(error.message, error);
            return [];
        }

        return data
    };

    async post(profile: Profile) {
        const { data, error } = await SUPABASE.from("profiles").insert(profile)

        if (error) {
            console.error(error.message, error);
            return false;
        }

        console.info(data)
        return true
    }
}

export default new ProfilesService()

