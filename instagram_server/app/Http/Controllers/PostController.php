<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function getPosts()
    {
        $currentUserId = Auth::id();

        $followingIds = Auth::user()->following->pluck('id');

        $userIds = $followingIds->push($currentUserId);

        $posts = Post::whereIn('user_id', $userIds)
                     ->with('user:id,username,profile_picture')
                     ->latest()
                     ->get();

        return response()->json([
            'status' => 'Success',
            'data' => $posts,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'caption' => 'nullable|string',
        ]);

        $user = $request->user();
        $imagePath = $request->file('image_url')->store('posts', 'public');

        $post = $user->posts()->create([
            'image_url' => $imagePath,
            'caption' => $request->caption,
            'likes' => 0,
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => $post,
        ]);
    }

    public function searchUser(Request $request, $username)
    {
        $user = User::where('username', $username)->firstOrFail();
        
        return response()->json([
            'status' => 'Success',
            'data' => $user,
        ]);
    }

    public function followUser(Request $request, $userId)
    {
        $userToFollow = User::findOrFail($userId);
    
        $currentUser = Auth::user();
        $currentUser->followings()->attach($userToFollow->id);
    
        return response()->json([
            'status' => 'Success',
            'message' => 'You are now following user with id ' . $userId,
        ]);
    }
    
    public function likePost(Request $request, $postId)
    {
        $post = Post::findOrFail($postId);

        $liked = Auth::user()->likedPosts()->toggle($post->id);

        $likesCount = $post->likes;

        if ($liked->contains($post->id)) {
            $likesCount++;
        } else {
            $likesCount--;
        }

        $post->update(['likes' => $likesCount]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Post liked/unliked successfully',
            'likes' => $likesCount,
        ]);
    }
}