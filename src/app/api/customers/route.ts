import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';


export async function GET() {
  const supabase = createClient();
    const { data: customers, error } = await supabase.from('customers').select('*');
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(customers);
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
    const body = await req.json();
    const { data, error: insertError } = await supabase.from('customers').insert(body);
    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
}
