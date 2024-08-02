import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const supabase = createClient();
    const id  = req.nextUrl.searchParams.get('id');
    const { data: router, error } = await supabase.from('routers').select('*').eq('id', id).single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(router);
}

export async function POST(req: NextRequest) {
    const supabase = createClient();
    const id  = req.nextUrl.searchParams.get('id');
    const body = await req.json();
    const { data, error: updateError } = await supabase.from('routers').update(body).eq('id', id);
    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
    const supabase = createClient();
    const id  = req.nextUrl.searchParams.get('id');
    const { data: deletedData, error: deleteError } = await supabase.from('routers').delete().eq('id', id);
    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }
    return NextResponse.json(deletedData, { status: 204 });
}
