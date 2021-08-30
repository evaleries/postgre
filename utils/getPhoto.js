import { supabase } from "./supabase"

export const getPhoto = async function(path) {
    return await (await supabase.storage.from("postgre").createSignedUrl(path, 60)).signedURL;
};