import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Get the user from the session using Supabase auth
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Create a Supabase client with the user's JWT token
    const userSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    // Verify the user is authenticated
    const { data: { user }, error: authError } = await userSupabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get posts with user information
    const { data: posts, error: postsError } = await userSupabase
      .from('posts')
      .select(`
        *,
        user_profiles (
          display_name,
          avatar_url,
          user_id
        )
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (postsError) {
      console.error('Posts fetch error:', postsError);
      // Return empty array if posts table doesn't exist yet
      if (postsError.code === 'PGRST116') {
        return NextResponse.json({ posts: [] });
      }
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    // Get user's likes for these posts
    const postIds = posts?.map(post => post.id) || [];
    const { data: userLikes, error: likesError } = await userSupabase
      .from('post_likes')
      .select('post_id')
      .eq('user_id', user.id)
      .in('post_id', postIds);

    const likedPostIds = new Set(userLikes?.map(like => like.post_id) || []);

    // Get user's bookmarks for these posts
    const { data: userBookmarks, error: bookmarksError } = await userSupabase
      .from('user_bookmarks')
      .select('post_id')
      .eq('user_id', user.id)
      .in('post_id', postIds);

    const bookmarkedPostIds = new Set(userBookmarks?.map(bookmark => bookmark.post_id) || []);

    // Format posts for frontend
    const formattedPosts = posts?.map(post => ({
      id: post.id,
      content: post.content,
      imageUrl: post.image_url,
      imageHint: post.image_hint,
      videoUrl: post.video_url,
      likes: post.likes || 0,
      comments: post.comments || 0,
      timestamp: new Date(post.created_at).toLocaleString('ja-JP'),
      isLiked: likedPostIds.has(post.id),
      isBookmarked: bookmarkedPostIds.has(post.id),
      author: {
        name: post.user_profiles?.display_name || 'Unknown User',
        username: post.user_id,
        avatarUrl: post.user_profiles?.avatar_url || "https://picsum.photos/seed/user1/100/100"
      }
    })) || [];

    return NextResponse.json({ posts: formattedPosts });

  } catch (error) {
    console.error('Posts API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the user from the session using Supabase auth
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Create a Supabase client with the user's JWT token
    const userSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    // Verify the user is authenticated
    const { data: { user }, error: authError } = await userSupabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse request body
    const { content, imageUrl, imageHint, videoUrl } = await request.json();

    if (!content && !imageUrl && !videoUrl) {
      return NextResponse.json(
        { error: 'Post content is required' },
        { status: 400 }
      );
    }

    // Create new post
    const { data: newPost, error: insertError } = await userSupabase
      .from('posts')
      .insert({
        user_id: user.id,
        content,
        image_url: imageUrl,
        image_hint: imageHint,
        video_url: videoUrl,
        likes: 0,
        comments: 0
      })
      .select()
      .single();

    if (insertError) {
      console.error('Post creation error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      );
    }

    // Get user profile for response
    const { data: profile } = await userSupabase
      .from('user_profiles')
      .select('display_name, avatar_url')
      .eq('user_id', user.id)
      .single();

    // Format response
    const formattedPost = {
      id: newPost.id,
      content: newPost.content,
      imageUrl: newPost.image_url,
      imageHint: newPost.image_hint,
      videoUrl: newPost.video_url,
      likes: newPost.likes,
      comments: newPost.comments,
      timestamp: new Date(newPost.created_at).toLocaleString('ja-JP'),
      isLiked: false, // User just created it, so they haven't liked it yet
      isBookmarked: false, // User just created it, so they haven't bookmarked it yet
      author: {
        name: profile?.display_name || user.email?.split('@')[0] || 'ユーザー',
        username: user.email?.split('@')[0] || 'user',
        avatarUrl: profile?.avatar_url || "https://picsum.photos/seed/user1/100/100"
      }
    };

    return NextResponse.json({
      success: true,
      post: formattedPost,
      message: '投稿が正常に作成されました'
    });

  } catch (error) {
    console.error('Post creation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
