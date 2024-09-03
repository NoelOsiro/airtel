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

class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

export async function GET(req: NextRequest) {
  const supabase = createClient();

  try {
    // Insert the new router data
    const { data, error: getError } = await supabase.from('staff').select('*');
    if (getError) {
      throw new InternalServerError('Failed to fetch staff');
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
