import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (!data.session) {
      return NextResponse.json(
        { error: 'No session returned' },
        { status: 401 }
      );
    }

    // Get complete user data including profile and associated tables
    const [profile, pointsData, avatarState] = await Promise.all([
      // User profile
      supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single()
        .then(result => ({ data: result.data, error: result.error })),
      
      // User points summary
      supabase
        .from('points_ledger')
        .select('amount, type, created_at')
        .eq('user_id', data.user.id)
        .order('created_at', { ascending: false })
        .limit(10)
        .then(result => ({ data: result.data, error: result.error })),
      
      // AI avatar state
      supabase
        .from('ai_avatar_state')
        .select('state')
        .eq('user_id', data.user.id)
        .single()
        .then(result => ({ data: result.data, error: result.error }))
    ]);

    // Calculate total points
    const totalPoints = pointsData.data?.reduce((sum, entry) => sum + entry.amount, 0) || 0;

    // Handle profile errors gracefully
    if (profile.error && profile.error.code !== 'PGRST116') {
      console.error('Profile fetch error:', profile.error);
    }

    // Handle points errors gracefully
    if (pointsData.error) {
      console.error('Points fetch error:', pointsData.error);
    }

    // Handle avatar state errors gracefully
    if (avatarState.error && avatarState.error.code !== 'PGRST116') {
      console.error('Avatar state fetch error:', avatarState.error);
    }

    return NextResponse.json({
      message: 'Login successful',
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
        user: {
          id: data.user.id,
          email: data.user.email,
          profile: profile.data || null,
          points: {
            total: totalPoints,
            history: pointsData.data || []
          },
          avatarState: avatarState.data?.state || null
        }
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
