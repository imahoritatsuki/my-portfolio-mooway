import { createSupbaseServerClientReadOnly } from ".";


export async function readUserSession() {
	const supabase = await createSupbaseServerClientReadOnly();

	return supabase.auth.getSession();
}