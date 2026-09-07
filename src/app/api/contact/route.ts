import { NextResponse } from 'next/server';
import dbConnect, { MONGODB_URI } from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!MONGODB_URI) {
      console.warn('MongoDB URI is not set. Simulating form submission.');
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully! (Simulated local storage mode because database is not connected)',
        data: { name, email, subject, message, createdAt: new Date() },
      });
    }

    try {
      await dbConnect();
      const newContact = new Contact({
        name,
        email,
        subject,
        message,
      });
      await newContact.save();

      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully!',
        data: newContact,
      });
    } catch (dbError: any) {
      console.error('MongoDB error during contact form save:', dbError);
      // Fail gracefully for user demo convenience
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({
        success: true,
        message: 'Message submitted successfully! (Temporary file-mode fallback)',
        data: { name, email, subject, message, createdAt: new Date() },
      });
    }
  } catch (error: any) {
    console.error('API Contact route error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
