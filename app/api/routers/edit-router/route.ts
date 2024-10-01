import { createClient } from '@/uitls/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

// Define custom error classes for better error management
class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    // Parse the incoming request body
    const { name, imei, dateInStore, sold } = await req.json();

    // Validate required fields
    // Validate required fields
    if (!name || !imei || !dateInStore) {
      throw new BadRequestError('Missing required fields');
    }

    const { data, error: getError } = await supabase
      .from('routers')
      .update({
        name,
        imei,
        dateInStore,
        sold
      })
      .eq('id', id)
      .select();

    if (getError) {
      throw new InternalServerError('Failed to update data');
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    // Handle different types of errors
    if (error instanceof CustomError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    } else {
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}