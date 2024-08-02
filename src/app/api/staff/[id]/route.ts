import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const supabase = createClient();
    const id = req.nextUrl.searchParams.get('id');
    const { data: staff, error } = await supabase.from('staff').select('*').eq('id', id).single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(staff);
}

export async function PUT(req: NextRequest) {
    const supabase = createClient();
    const id = req.nextUrl.searchParams.get('id');
    const body = await req.json();
    const { data, error: updateError } = await supabase.from('staff').update(body).eq('id', id);
    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
    const supabase = createClient();
    const id = req.nextUrl.searchParams.get('id');
    const { data: deletedData, error: deleteError } = await supabase.from('staff').delete().eq('id', id);
    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }
    return NextResponse.json(deletedData, { status: 204 });
}
