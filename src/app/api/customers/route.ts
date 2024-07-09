import { createClient } from "@/utils/supabase/sever";
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('Customers').select(`
      id,
      created_at,
      updated_at,
      name,
      phone_no,
      email,
      address,
      package,
      subscription_date,
      expiry_date,
      Routers(*)
    `);
    
    if (error) {
      throw new Error('Failed to fetch data from database');
    }
    
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch customers' }, { status: 500 });
  }
};


export const POST = async (request: NextRequest) => {
  const supabase = createClient();
  const data = await request.json();

  try {
    const { data: customerData, error } = await supabase.from('customers').insert(data);

    if (error) {
      throw new Error('Failed to insert data into database');
    }

    return NextResponse.json({ customerData }, { status: 200 }); // Return data object
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch customers' }, { status: 500 });
  }
};
