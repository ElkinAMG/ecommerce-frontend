import { getUser } from "$lib/services/users.svelte";
import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        const dbUser = await getUser(String(user?.id));
        return {
            props: {
                user: dbUser
            }
        };
    }
    return {
        user: null
    }
}