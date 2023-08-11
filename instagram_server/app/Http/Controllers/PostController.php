<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\DB;


class PostController extends Controller
{
    public function getPosts()
    {
        $currentUserId = Auth::id();
        $followingIds = Auth::user()->following->pluck('id');
    
        $userIds = $followingIds->push($currentUserId);
        $posts = Post::whereIn('posts.user_id', $userIds)
                     ->with('user:id,username,profile_picture')
                     ->withCount(['likedUsers as likes_count' => function ($query) {
                         $query->where('is_liked', true);
                     }])
                     ->leftJoin('likes', function ($join) use ($currentUserId) {
                         $join->on('posts.id', '=', 'likes.post_id')
                              ->where('likes.user_id', '=', $currentUserId);
                     })
                     ->addSelect(['is_liked' => DB::raw('is_liked')])
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
            'post_image' => 'required|string',
            'caption' => 'nullable|string',
        ]);
        $user = Auth::user();    
        DB::beginTransaction();
        try {
            $post = new Post();
            $post->user_id = $user->id;
            $post->caption = $request->caption;
            $post->post_image = $request->post_image;
            $post->save();
            DB::commit();
    
            return response()->json([
                'status' => 'Success',
                'data' => $post,
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'status' => 'Error',
                'message' => 'Post creation failed',
            ], 500);
        }
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
        $currentUser = $request->user();
        $currentUser->followings()->attach($userToFollow->id);
    
        return response()->json([
            'status' => 'Success',
            'message' => 'You are now following user with id ' . $userId,
        ]);
    }
    
    public function likePost(Request $request)
    {
        $post = Post::findOrFail($request->post_id);
        $userId = $request->user_id;
    
        $existingLike = DB::table('likes')
                          ->where('user_id', $userId)
                          ->where('post_id', $post->id)
                          ->first();
    
        if ($existingLike) {
            DB::table('likes')
                ->where('user_id', $userId)
                ->where('post_id', $post->id)
                ->update(['is_liked' => !$existingLike->is_liked]);
        } else {
            DB::table('likes')->insert([
                'user_id' => $userId,
                'post_id' => $post->id,
                'is_liked' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    
        $likesCount = DB::table('likes')
                        ->where('post_id', $post->id)
                        ->where('is_liked', true)
                        ->count();
    
        return response()->json([
            'status' => 'Success',
            'message' => 'Post liked/unliked successfully',
            'likes' => $likesCount,
        ]);
    }
    
}        
