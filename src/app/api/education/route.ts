/** @format */

import { db } from '@/config/db';
import myschema from '@/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all personal information from the database
    const response = await db.select().from(myschema.Education);

    // Return a success response with the retrieved data
    return NextResponse.json(
      {
        status: true,
        message: 'Data retrieved successfully.',
        educations: response, // Use a 'data' field for better API structure
      },
      { status: 200 }
    ); // Explicitly set the status code
  } catch (error: any) {
    // Log the error for debugging (optional)
    console.error('Error fetching data:', error);

    // Return an error response with a clear message
    return NextResponse.json(
      {
        status: 'error',
        message: 'An error occurred while retrieving data.',
        error: error.message || 'Internal Server Error', // Provide error message
      },
      { status: 500 }
    ); // Internal Server Error for unexpected errors
  }
}

export async function POST(request: NextRequest) {
  try {
    // Extract the JSON data from the request body
    const {
      institution_name,
      degree,
      field_of_study,
      start_date,
      end_date,
      imageURL,
      personal_info_id,
    } = await request.json();

    // Validate that required parameters are provided
    const missingFields: string[] = [];

    if (!institution_name) missingFields.push('institution_name');
    if (!degree) missingFields.push('degree'); // Check for subtitle
    if (!field_of_study) missingFields.push('field_of_study');
    if (!start_date) missingFields.push('start_date');
    if (!end_date) missingFields.push('end_date');
    if (!imageURL) missingFields.push('imageURL');
    if (!personal_info_id) missingFields.push('personal_info_id');

    // If there are missing fields, return an error response
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Missing required fields: ' + missingFields.join(', '),
        },
        { status: 400 } // Bad Request for missing parameters
      );
    }

    // Insert the data into the database
    const response = await db
      .insert(myschema.Education)
      .values({
        institution_name,
        degree,
        field_of_study,
        start_date,
        end_date,
        imageURL,
        personal_info_id,
      })
      .returning({
        id: myschema.Education.id,
      });

    // If the response is successful, return success message
    return NextResponse.json(
      {
        status: 'success',
        message: 'education histroy inserted successfully.',
        data: response,
      },
      { status: 201 } // Use 201 status code for resource creation
    );
  } catch (error: any) {
    // Handle different types of errors with specific messages
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Invalid JSON format.',
        },
        { status: 400 } // Bad Request for invalid JSON
      );
    }

    // Log the error for debugging (optional)
    console.error('Error inserting data:', error);

    // Return a generic error response
    return NextResponse.json(
      {
        status: 'error',
        message: 'An error occurred while processing your request.',
        error: error?.message || 'Internal Server Error',
      },
      { status: 500 } // Internal Server Error for unexpected errors
    );
  }
}
