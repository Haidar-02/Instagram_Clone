<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'caption', 'image'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function likedUsers()
    {
        return $this->belongsToMany(User::class, 'likes', 'post_id', 'user_id')
                    ->withPivot('liked')
                    ->withTimestamps();
    }
}
