import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from('Customers').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const body = await req.json();
    const { id, ...rest } = body;

    if (id) {
      const { data, error } = await supabase
        .from('Customers')
        .update({
          name: rest.name,
          phone: rest.phone,
          location: rest.location,
          payment: rest.payment,
          activation_date: rest.activation_date,
        })
        .eq( 'id',id )
        .select('*');

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
