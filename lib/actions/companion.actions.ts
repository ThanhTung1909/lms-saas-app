'use server'

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supbase";

export const createCompanion = async (formData: CreateCompanion) => {
    const {userId: author} = await auth()
    const supbase = await createSupabaseClient()

    const {data, error} = await supbase
        .from('companions')
        .insert({...formData, author})
        .select()

    if (error || !data) throw new Error(error?.message || 'Failed to create a companion')

    return data[0]
}