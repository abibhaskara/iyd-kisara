const MAX_NAME_LEN = 100;
const MAX_MSG_LEN = 500;

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

function errorResponse(message, status = 500) {
    return Response.json({ success: false, error: message }, { status, headers: CORS_HEADERS });
}

async function handleWishes(request, env) {
    const { method } = request;

    if (method === 'OPTIONS') {
        return new Response(null, { headers: CORS_HEADERS });
    }

    try {
        // ⚠️ Ganti "DB" sesuai dengan nama binding database Anda di wrangler.json (jika ada perubahan)
        const db = env.DB;

        if (!db) {
            console.error('Database binding not found. Check wrangler.json binding name.');
            return errorResponse('Database binding not found', 500);
        }

        await db.prepare(`
            CREATE TABLE IF NOT EXISTS wishes (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                name       TEXT    NOT NULL,
                message    TEXT    NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        if (method === 'GET') {
            const { results } = await db
                .prepare('SELECT id, name, message, created_at FROM wishes ORDER BY id DESC')
                .all();
            return Response.json({ success: true, data: results }, { headers: CORS_HEADERS });
        }

        if (method === 'POST') {
            const body = await request.json();
            const name = typeof body.name === 'string' ? body.name.trim() : '';
            const message = typeof body.message === 'string' ? body.message.trim() : '';

            if (!name || !message) {
                return errorResponse('Name and message are required', 400);
            }

            const safeName = name.slice(0, MAX_NAME_LEN);
            const safeMessage = message.slice(0, MAX_MSG_LEN);

            const result = await db
                .prepare('INSERT INTO wishes (name, message) VALUES (?, ?)')
                .bind(safeName, safeMessage)
                .run();

            return Response.json(
                { success: true, data: { id: result.meta.last_row_id, name: safeName, message: safeMessage } },
                { status: 201, headers: CORS_HEADERS }
            );
        }

        if (method === 'DELETE') {
            const id = Number(new URL(request.url).searchParams.get('id'));
            if (!Number.isInteger(id) || id <= 0) {
                return errorResponse('Invalid id', 400);
            }
            await db.prepare('DELETE FROM wishes WHERE id = ?').bind(id).run();
            return Response.json({ success: true, message: 'Wish deleted' }, { headers: CORS_HEADERS });
        }

        return errorResponse('Method not allowed', 405);

    } catch (error) {
        console.error('Worker Error:', error);
        return errorResponse(error.message || 'Internal server error', 500);
    }
}

async function handleRsvp(request, env) {
    const { method } = request;

    if (method === 'OPTIONS') {
        return new Response(null, { headers: CORS_HEADERS });
    }

    try {
        const db = env.DB;

        if (!db) {
            console.error('Database binding not found. Check wrangler.json binding name.');
            return errorResponse('Database binding not found', 500);
        }

        await db.prepare(`
            CREATE TABLE IF NOT EXISTS rsvps (
                id                  INTEGER PRIMARY KEY AUTOINCREMENT,
                email               TEXT    NOT NULL,
                representative_name TEXT    NOT NULL,
                organization_name   TEXT    NOT NULL,
                attendee_count      TEXT    NOT NULL,
                whatsapp            TEXT    NOT NULL,
                created_at          DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        if (method === 'GET') {
            const { results } = await db
                .prepare('SELECT id, email, representative_name, organization_name, attendee_count, whatsapp, created_at FROM rsvps ORDER BY id DESC')
                .all();
            return Response.json({ success: true, data: results }, { headers: CORS_HEADERS });
        }

        if (method === 'POST') {
            const body = await request.json();
            const email = typeof body.email === 'string' ? body.email.trim() : '';
            const representativeName = typeof body.representativeName === 'string' ? body.representativeName.trim() : '';
            const organizationName = typeof body.organizationName === 'string' ? body.organizationName.trim() : '';
            const attendeeCount = typeof body.attendeeCount === 'string' ? body.attendeeCount.trim() : '';
            const whatsapp = typeof body.whatsapp === 'string' ? body.whatsapp.trim() : '';

            if (!email || !representativeName || !organizationName || !attendeeCount || !whatsapp) {
                return errorResponse('Semua field wajib diisi', 400);
            }

            const result = await db
                .prepare('INSERT INTO rsvps (email, representative_name, organization_name, attendee_count, whatsapp) VALUES (?, ?, ?, ?, ?)')
                .bind(email, representativeName, organizationName, attendeeCount, whatsapp)
                .run();

            return Response.json(
                {
                    success: true,
                    data: {
                        id: result.meta.last_row_id,
                        email,
                        representativeName,
                        organizationName,
                        attendeeCount,
                        whatsapp
                    }
                },
                { status: 201, headers: CORS_HEADERS }
            );
        }

        if (method === 'DELETE') {
            const id = Number(new URL(request.url).searchParams.get('id'));
            if (!Number.isInteger(id) || id <= 0) {
                return errorResponse('Invalid id', 400);
            }
            await db.prepare('DELETE FROM rsvps WHERE id = ?').bind(id).run();
            return Response.json({ success: true, message: 'RSVP berhasil dihapus' }, { headers: CORS_HEADERS });
        }

        return errorResponse('Method not allowed', 405);
    } catch (error) {
        console.error('RSVP Worker Error:', error);
        return errorResponse(error.message || 'Internal server error', 500);
    }
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === '/api/wishes') {
            return handleWishes(request, env);
        }

        if (url.pathname === '/api/rsvp' || url.pathname === '/api/rsvps') {
            return handleRsvp(request, env);
        }

        const response = await env.ASSETS.fetch(request);
        if (response.status === 404 && !url.pathname.startsWith('/api/')) {
            const indexUrl = new URL('/', request.url);
            return env.ASSETS.fetch(new Request(indexUrl, request));
        }
        return response;
    },
};
