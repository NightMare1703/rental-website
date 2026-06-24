<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    /** @use HasFactory<\Database\Factories\UserDetailFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'avatar',
        'phone_number',
        'address',
        'identity_card_photo',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}