import SUPABASE from "@/clients/profiles";
import { Profile } from "@/schemas/profiles";

class ProfilesService {
    async getAll() {
        const { data, error } = await SUPABASE.from("profiles").select();
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

