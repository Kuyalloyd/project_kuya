<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Signup extends Model
{
    use HasFactory;

    // ✅ match your migration
    protected $table = 'signup';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];
}
