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

class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}

class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    // Parse the incoming request body
    const { name, email, phone, position, department, city, gender } =
      await req.json();

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !position ||
      !department ||
      !city ||
      !gender
    ) {
      throw new BadRequestError('Missing required fields');
    }

    // Check if the IMEI already exists
    const { data: existingRouter, error: checkError } = await supabase
      .from('staff')
      .select('*')
      .eq('name', name)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        // No existing router found, continue
      } else {
        throw new InternalServerError('Error checking existing Staff');
      }
    }

    if (existingRouter) {
      throw new ConflictError('Staff already exists');
    }

    // Insert the new router data
    const { data, error: insertError } = await supabase
      .from('staff')
      .insert({
        name,
        email,
        phone,
        position,
        department,
        city,
        gender
      })
      .select();

    if (insertError) {
      throw new InternalServerError('Failed to insert new staff');
    }

    // Respond with the inserted data
    return NextResponse.json(data, { status: 201 });
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
