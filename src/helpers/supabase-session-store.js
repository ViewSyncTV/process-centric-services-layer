const { Store } = require("express-session")

class SupabaseSessionStore extends Store {
    constructor(supabase, sessionExpirationSeconds) {
        super()
        this.supabase = supabase
        this.sessionExpirationSeconds = sessionExpirationSeconds
    }

    async get(sid, callback) {
        try {
            const { data } = await this.supabase
                .from("session")
                .select("session_data, expiration_time")
                .eq("sid", sid)
                .single()

            if (data) {
                const expirationTime = new Date(data.expiration_time).getTime()
                if (expirationTime > Date.now()) {
                    callback(null, data.session_data)
                } else {
                    // Session expired, delete from the database
                    await this.destroy(sid, () => {})
                    callback()
                }
            } else {
                callback()
            }
        } catch (error) {
            callback(error)
        }
    }

    async set(sid, session, callback) {
        try {
            const expirationTime = new Date(Date.now() + this.sessionExpirationSeconds * 1000)
            await this.supabase
                .from("session")
                .upsert([{ sid, session_data: session, expiration_time: expirationTime }], {
                    onConflict: ["sid"],
                })
            callback()
        } catch (error) {
            callback(error)
        }
    }

    async destroy(sid, callback) {
        try {
            await this.supabase.from("session").delete().eq("sid", sid)
            callback()
        } catch (error) {
            callback(error)
        }
    }
}

module.exports = SupabaseSessionStore
