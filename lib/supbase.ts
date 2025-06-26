import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = async () => {


    const token = await (await auth()).getToken({template: "supabase"}); // dùng template phù hợp nếu có

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
    );
};
