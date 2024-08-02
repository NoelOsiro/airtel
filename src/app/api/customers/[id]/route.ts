import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
    const supabase = createClient();
    const id = req.nextUrl.searchParams.get('id');
    const { data: customer, error } = await supabase.from('customers').select('*').eq('id', id).single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(customer);
}

export async function POST(req: NextRequest) {
    const supabase = createClient();
    const id = req.nextUrl.searchParams.get('id');
    const { name, location, alternate_no, activation_date, county, payment_note, package: pkg, email, router_id } = await req.json();

    // Prepare the update payload
    const updatePayload = {
        'name':name,
        'location':location,
        'alternate_no':alternate_no,
        'activation_date':activation_date,
        'county':county,
        'payment_note':payment_note,
        'package':pkg,
        'email':email,
        'router_id':router_id
    };

    const { data, error: updateError } = await supabase.from('customers').update(updatePayload).eq('id', id);
    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
    const supabase = createClient();
    const id = req.nextUrl.searchParams.get('id');
    const { data: deletedData, error: deleteError } = await supabase.from('customers').delete().eq('id', id);
    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }
    return NextResponse.json(deletedData, { status: 204 });
}
