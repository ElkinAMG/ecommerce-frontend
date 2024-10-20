import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        return {
            props: {
                user
            }
        };
    }

    return {
        user: null
    }
}