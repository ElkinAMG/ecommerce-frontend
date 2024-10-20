import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";

export async function load(): Promise<{ redirect?: string | undefined; props?: any }> {
	const { data: { session } } = await supabase.auth.getSession();

	if (!session) {
		redirect(302, '/login');
	}

	// Fetch data for the authenticated user
	const { data: { user } } = await supabase.auth.getUser();

	return {
		props: {
			user,
		},
	};
}