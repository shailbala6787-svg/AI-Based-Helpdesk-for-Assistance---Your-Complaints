import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';
import crypto from 'crypto';
const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
export async function uploadImage(buffer, originalName, mimeType) {
    const ext = originalName.split('.').pop() || 'jpg';
    const filename = `${crypto.randomUUID()}.${ext}`;
    const filePath = `complaints/${filename}`;
    const { error } = await supabase.storage
        .from(config.supabaseStorageBucket)
        .upload(filePath, buffer, {
        contentType: mimeType,
        upsert: false,
    });
    if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }
    const { data } = supabase.storage
        .from(config.supabaseStorageBucket)
        .getPublicUrl(filePath);
    return data.publicUrl;
}
//# sourceMappingURL=supabase.js.map