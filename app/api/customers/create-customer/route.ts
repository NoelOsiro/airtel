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
    const {
      name,
      email,
      phone,
      county,
      city,
      account,
      activationDate,
      packageName
    } = await req.json();

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !county ||
      !city ||
      !account ||
      !activationDate ||
      !packageName
    ) {
      throw new BadRequestError('Missing required fields');
    }

    // Check if the Account already exists
    const { data: existingAccount, error: checkError } = await supabase
      .from('customers')
      .select('*')
      .eq('account', account)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        // No existing router found, continue
      } else {
        throw new InternalServerError('Error checking existing IMEI');
      }
    }

    if (existingAccount) {
      throw new ConflictError('Account Number already exists');
    }

    const { data, error: getError } = await supabase
      .from('customers')
      .insert({
        name,
        email,
        phone,
        county,
        city,
        account,
        activationDate,
        package: packageName
      })
      .select();

    if (getError) {
      throw new InternalServerError('Failed to add customer data');
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
